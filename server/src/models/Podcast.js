import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Podcast title is required'],
      trim: true,
      maxLength: [150, 'Title cannot be more than 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Podcast description is required'],
      trim: true,
      maxLength: [2000, 'Description cannot be more than 2000 characters'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      match: [/^\d{1,2}:\d{2}$/, 'Duration must be in MM:SS format'],
    },
    audioUrl: {
      url: String,
      publicId: String,
      originalName: String,
    },
    coverImage: {
      url: String,
      publicId: String,
      originalName: String,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Health',
        'Nutrition',
        'Self-Development',
        'Mental Health',
        'Wellness',
        'Medicine',
        'Psychology',
      ],
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    transcript: {
      type: String,
      trim: true,
    },
    host: {
      type: String,
      default: 'Dr. Syed M Quadri',
      trim: true,
    },
    guests: [
      {
        name: {
          type: String,
          trim: true,
        },
        title: {
          type: String,
          trim: true,
        },
        bio: {
          type: String,
          trim: true,
        },
      },
    ],
    episodeNumber: {
      type: Number,
      min: 1,
    },
    season: {
      type: Number,
      min: 1,
      default: 1,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    downloads: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
podcastSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text',
  transcript: 'text',
});
podcastSchema.index({ category: 1 });
podcastSchema.index({ publishDate: -1 });
podcastSchema.index({ featured: -1 });
podcastSchema.index({ status: 1 });
podcastSchema.index({ 'rating.average': -1 });
podcastSchema.index({ views: -1 });

// Virtual for duration in seconds
podcastSchema.virtual('durationInSeconds').get(function () {
  const [minutes, seconds] = this.duration.split(':').map(Number);
  return minutes * 60 + seconds;
});

// Virtual for formatted publish date
podcastSchema.virtual('formattedDate').get(function () {
  return this.publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Pre-save middleware
podcastSchema.pre('save', function (next) {
  if (this.isNew && !this.episodeNumber) {
    // Auto-generate episode number based on season
    Podcast.countDocuments({ season: this.season })
      .then((count) => {
        this.episodeNumber = count + 1;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

// Static methods
podcastSchema.statics.getByCategory = function (category) {
  return this.find({
    category: new RegExp(category, 'i'),
    status: 'published',
  }).sort({ publishDate: -1 });
};

podcastSchema.statics.getFeatured = function (limit = 5) {
  return this.find({
    featured: true,
    status: 'published',
  })
    .sort({ publishDate: -1 })
    .limit(limit);
};

podcastSchema.statics.getTrending = function (limit = 10) {
  return this.find({ status: 'published' })
    .sort({ views: -1, likes: -1, publishDate: -1 })
    .limit(limit);
};

podcastSchema.statics.searchPodcasts = function (query) {
  return this.find({
    $text: { $search: query },
    status: 'published',
  }).sort({ score: { $meta: 'textScore' } });
};

podcastSchema.statics.getRecent = function (limit = 10) {
  return this.find({ status: 'published' })
    .sort({ publishDate: -1 })
    .limit(limit);
};

// Instance methods
podcastSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

podcastSchema.methods.incrementLikes = function () {
  this.likes += 1;
  return this.save();
};

podcastSchema.methods.incrementDownloads = function () {
  this.downloads += 1;
  return this.save();
};

const Podcast = mongoose.model('Podcast', podcastSchema);

export default Podcast;
