import mongoose from 'mongoose';
import slugify from 'slugify';

/**
 * Treatment Schema
 * Comprehensive schema for both Mental Health and General Health treatments
 */
const treatmentSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, 'Treatment name is required'],
      trim: true,
      maxLength: [200, 'Name cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxLength: [1000, 'Description cannot be more than 1000 characters'],
    },
    detailedDescription: {
      type: String,
      trim: true,
      maxLength: [500000, 'Detailed description cannot be more than 500000 characters'],
    },

    // Category and Classification
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Mental Health', 'General Health'],
    },
    subcategory: {
      type: String,
      trim: true,
    },

    // Visual Assets
    image: {
      type: String,
      trim: true,
    },
    imageCloudinary: {
      publicId: String,
      url: String,
      originalName: String,
      fileSize: Number,
      mimeType: String,
      width: Number,
      height: Number,
    },
    gradient: {
      type: String,
      trim: true,
      default: 'from-blue-500 to-indigo-600',
    },
    icon: {
      type: String,
      trim: true,
    },

    // Treatment Details
    duration: {
      type: String,
      trim: true,
      default: '8-12 sessions',
    },
    methods: [{
      type: String,
      trim: true,
    }],
    conditions: [{
      type: String,
      trim: true,
    }],

    // Content Sections
    sections: [{
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      content: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        default: 0,
      },
    }],

    // "On This Page" Navigation Items
    onThisPage: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      href: {
        type: String,
        required: true,
        trim: true,
      },
      order: {
        type: Number,
        default: 0,
      },
    }],

    // Information Cards (for learn more sections)
    informationCards: [{
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        trim: true,
      },
      bgColor: {
        type: String,
        default: 'bg-blue-500',
      },
      link: {
        type: String,
        trim: true,
      },
    }],

    // Key Points/Highlights
    keyPoints: [{
      type: String,
      trim: true,
    }],

    // Related Resources
    relatedResources: [{
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: String,
      url: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        enum: ['internal', 'external', 'pdf', 'video'],
        default: 'internal',
      },
    }],

    // SEO and Metadata
    metaTitle: {
      type: String,
      trim: true,
      maxLength: [60, 'Meta title cannot be more than 60 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxLength: [160, 'Meta description cannot be more than 160 characters'],
    },
    keywords: [{
      type: String,
      trim: true,
      lowercase: true,
    }],

    // Status and Visibility
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },

    // Engagement Metrics
    views: {
      type: Number,
      default: 0,
    },
    inquiries: {
      type: Number,
      default: 0,
    },
    bookings: {
      type: Number,
      default: 0,
    },

    // Additional Information
    faqs: [{
      question: {
        type: String,
        required: true,
        trim: true,
      },
      answer: {
        type: String,
        required: true,
      },
    }],

    // Pricing (optional)
    pricing: {
      sessionCost: {
        type: Number,
        min: 0,
      },
      packageCost: {
        type: Number,
        min: 0,
      },
      insuranceAccepted: {
        type: Boolean,
        default: true,
      },
      notes: {
        type: String,
        trim: true,
      },
    },

    // Availability
    availability: {
      inPerson: {
        type: Boolean,
        default: true,
      },
      telehealth: {
        type: Boolean,
        default: true,
      },
      emergency: {
        type: Boolean,
        default: false,
      },
    },

    // Contact and Booking
    contactInfo: {
      phone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      bookingUrl: {
        type: String,
        trim: true,
      },
    },

    // Timestamps and Audit
    publishedAt: {
      type: Date,
    },
    lastModifiedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
treatmentSchema.index({ slug: 1 });
treatmentSchema.index({ category: 1, status: 1 });
treatmentSchema.index({ name: 'text', description: 'text', keywords: 'text' });
treatmentSchema.index({ featured: 1, status: 1 });
treatmentSchema.index({ active: 1, status: 1 });

// Auto-generate slug from name before saving
treatmentSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Virtual for URL path
treatmentSchema.virtual('url').get(function() {
  return `/treatment/${this.slug}`;
});

// Virtual for formatted duration
treatmentSchema.virtual('formattedDuration').get(function() {
  return this.duration || 'Varies';
});

// Instance method to increment views
treatmentSchema.methods.incrementViews = async function() {
  this.views += 1;
  return await this.save();
};

// Instance method to increment inquiries
treatmentSchema.methods.incrementInquiries = async function() {
  this.inquiries += 1;
  return await this.save();
};

// Instance method to increment bookings
treatmentSchema.methods.incrementBookings = async function() {
  this.bookings += 1;
  return await this.save();
};

// Static method to get featured treatments
treatmentSchema.statics.getFeatured = function(category = null) {
  const query = { featured: true, status: 'published', active: true };
  if (category) {
    query.category = category;
  }
  return this.find(query).sort({ views: -1 }).limit(6);
};

// Static method to get by category
treatmentSchema.statics.getByCategory = function(category) {
  return this.find({ 
    category, 
    status: 'published', 
    active: true 
  }).sort({ name: 1 });
};

// Static method to search treatments
treatmentSchema.statics.searchTreatments = function(searchTerm) {
  return this.find(
    { 
      $text: { $search: searchTerm },
      status: 'published',
      active: true
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

const Treatment = mongoose.model('Treatment', treatmentSchema);

export default Treatment;
