import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters'],
      maxLength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minLength: [5, 'Subject must be at least 5 characters'],
      maxLength: [100, 'Subject cannot be more than 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minLength: [10, 'Message must be at least 10 characters'],
      maxLength: [1000, 'Message cannot be more than 1000 characters'],
    },
    category: {
      type: String,
      enum: [
        'General Inquiry',
        'Book Purchase',
        'Podcast Guest',
        'Speaking Engagement',
        'Medical Consultation',
        'Other',
      ],
      default: 'General Inquiry',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'resolved', 'archived'],
      default: 'new',
    },
    source: {
      type: String,
      enum: ['website', 'social_media', 'referral', 'direct'],
      default: 'website',
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    responseRequired: {
      type: Boolean,
      default: true,
    },
    respondedAt: {
      type: Date,
    },
    respondedBy: {
      type: String,
      trim: true,
    },
    notes: [
      {
        content: {
          type: String,
          required: true,
          trim: true,
        },
        addedBy: {
          type: String,
          required: true,
          trim: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    attachments: [
      {
        url: String,
        publicId: String,
        originalName: String,
        fileType: String,
        fileSize: Number,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ category: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ name: 'text', subject: 'text', message: 'text' });

// Virtual for days since submission
contactSchema.virtual('daysSinceSubmission').get(function () {
  const diffTime = Math.abs(new Date() - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for response time (if responded)
contactSchema.virtual('responseTime').get(function () {
  if (this.respondedAt) {
    const diffTime = Math.abs(this.respondedAt - this.createdAt);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return `${diffHours} hours`;
  }
  return null;
});

// Pre-save middleware
contactSchema.pre('save', function (next) {
  // Auto-set priority based on keywords
  if (this.isNew) {
    const urgentKeywords = ['urgent', 'emergency', 'asap', 'immediate'];
    const messageText = this.message.toLowerCase();

    if (urgentKeywords.some((keyword) => messageText.includes(keyword))) {
      this.priority = 'high';
    }
  }

  // Set respondedAt when status changes to replied
  if (
    this.isModified('status') &&
    this.status === 'replied' &&
    !this.respondedAt
  ) {
    this.respondedAt = new Date();
  }

  next();
});

// Static methods
contactSchema.statics.getByStatus = function (status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

contactSchema.statics.getUnread = function () {
  return this.find({ status: 'new' }).sort({ priority: -1, createdAt: -1 });
};

contactSchema.statics.getPendingResponse = function () {
  return this.find({
    status: { $in: ['new', 'read'] },
    responseRequired: true,
  }).sort({ priority: -1, createdAt: 1 });
};

contactSchema.statics.searchContacts = function (query) {
  return this.find({
    $text: { $search: query },
  }).sort({ score: { $meta: 'textScore' } });
};

contactSchema.statics.getStatistics = function () {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);
};

// Instance methods
contactSchema.methods.markAsRead = function (readBy = 'system') {
  this.status = 'read';
  return this.save();
};

contactSchema.methods.markAsReplied = function (repliedBy = 'Dr. Quadri') {
  this.status = 'replied';
  this.respondedAt = new Date();
  this.respondedBy = repliedBy;
  return this.save();
};

contactSchema.methods.addNote = function (content, addedBy = 'system') {
  this.notes.push({
    content,
    addedBy,
    addedAt: new Date(),
  });
  return this.save();
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
