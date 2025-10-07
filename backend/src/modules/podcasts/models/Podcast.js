import mongoose from 'mongoose';
import slugify from 'slugify';

/**
 * Podcast Schema
 * Based on the frontend podcasts.json structure
 */
const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Podcast title is required'],
      trim: true,
      maxLength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Podcast description is required'],
      trim: true,
      maxLength: [5000, 'Description cannot be more than 5000 characters'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      match: [/^([0-9]{1,2}):([0-5][0-9])$/, 'Duration must be in format MM:SS or HH:MM'],
    },
    publishDate: {
      type: Date,
      required: [true, 'Publish date is required'],
      default: Date.now,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      validate: {
        validator: function(v) {
          // Allow common categories but be flexible for new ones
          const allowedCategories = [
            'Mental Health',
            'Psychology', 
            'Health & Wellness',
            'Health',
            'Wellness',
            'Self-Help',
            'Self-Development',
            'Medical',
            'Psychiatry',
            'Therapy',
            'Nutrition',
            'Lifestyle',
            'General Health',
            'Interviews',
            'Educational'
          ];
          
          // Check if it's in allowed list or if it's a reasonable category name
          return allowedCategories.includes(v) || 
                 (v.length >= 2 && v.length <= 50 && /^[a-zA-Z\s&-]+$/.test(v));
        },
        message: 'Category must be a valid category name (2-50 characters, letters, spaces, hyphens, and ampersands only)'
      }
    },
    audioUrl: {
      type: String,
      required: [true, 'Audio URL is required'],
      trim: true,
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+\.(mp3|wav|m4a|aac|ogg)(\?.*)?$/i.test(v);
        },
        message: 'Please provide a valid audio file URL'
      }
    },
    // Audio file information from Cloudinary
    audioFile: {
      url: String,
      publicId: String,
      originalName: String,
      fileSize: Number,
      mimeType: String,
      duration: Number, // in seconds
      bitrate: String,
      sampleRate: String,
      format: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
      trim: true,
    },
    // Cover image information from Cloudinary
    coverImageCloudinary: {
      publicId: String,
      url: String,
      originalName: String,
      fileSize: Number,
      mimeType: String,
      width: Number,
      height: Number,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    },
    featured: {
      type: Boolean,
      default: false,
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
    host: {
      type: String,
      required: [true, 'Host is required'],
      default: 'Dr. Syed M Quadri',
      trim: true,
    },
    episodeNumber: {
      type: Number,
      required: [true, 'Episode number is required'],
      min: [1, 'Episode number must be at least 1'],
    },
    transcript: {
      type: String,
      trim: true,
      maxLength: [50000, 'Transcript cannot be more than 50000 characters'],
    },
    showNotes: [{
      type: String,
      trim: true,
    }],
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    // Audio metadata
    audioMetadata: {
      fileSize: {
        type: Number, // in bytes
        min: 0,
      },
      bitrate: {
        type: String, // e.g., "128kbps"
        trim: true,
      },
      format: {
        type: String,
        enum: ['mp3', 'wav', 'm4a', 'aac', 'ogg'],
        lowercase: true,
      },
      sampleRate: {
        type: String, // e.g., "44.1kHz"
        trim: true,
      },
    },
    // SEO fields
    seoTitle: {
      type: String,
      trim: true,
      maxLength: [60, 'SEO title cannot be more than 60 characters'],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxLength: [160, 'SEO description cannot be more than 160 characters'],
    },
    // Engagement metrics
    averageListenTime: {
      type: Number, // in seconds
      default: 0,
      min: 0,
    },
    completionRate: {
      type: Number, // percentage (0-100)
      default: 0,
      min: 0,
      max: 100,
    },
    // Related content
    relatedEpisodes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Podcast',
    }],
    // Timestamps for specific segments
    chapters: [{
      title: {
        type: String,
        required: true,
        trim: true,
      },
      startTime: {
        type: String, // in format "MM:SS"
        required: true,
        match: [/^([0-9]{1,2}):([0-5][0-9])$/, 'Start time must be in format MM:SS'],
      },
      description: {
        type: String,
        trim: true,
      },
    }],
    // Guest information (if applicable)
    guests: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      bio: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
      socialMedia: {
        twitter: String,
        linkedin: String,
        instagram: String,
      },
    }],
    // Podcast series information
    series: {
      name: {
        type: String,
        trim: true,
      },
      season: {
        type: Number,
        min: 1,
      },
      episodeInSeries: {
        type: Number,
        min: 1,
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
podcastSchema.index({ title: 'text', description: 'text', transcript: 'text', tags: 'text' });
podcastSchema.index({ category: 1 });
podcastSchema.index({ featured: 1 });
podcastSchema.index({ episodeNumber: -1 });
podcastSchema.index({ publishDate: -1 });
podcastSchema.index({ views: -1 });
podcastSchema.index({ likes: -1 });
podcastSchema.index({ isActive: 1, isPublished: 1 });
podcastSchema.index({ slug: 1 }, { unique: true, sparse: true });
podcastSchema.index({ host: 1 });

// Virtual for duration in seconds
podcastSchema.virtual('durationInSeconds').get(function () {
  if (!this.duration) return 0;
  
  const parts = this.duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return 0;
});

// Virtual for formatted file size
podcastSchema.virtual('formattedFileSize').get(function () {
  if (!this.audioMetadata?.fileSize) return null;
  
  const size = this.audioMetadata.fileSize;
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
});

// Virtual for estimated reading time of transcript
podcastSchema.virtual('transcriptReadingTime').get(function () {
  if (!this.transcript) return null;
  
  const wordsPerMinute = 200;
  const wordCount = this.transcript.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
});

// Virtual for engagement score
podcastSchema.virtual('engagementScore').get(function () {
  const viewsWeight = 0.3;
  const likesWeight = 0.4;
  const downloadsWeight = 0.2;
  const completionWeight = 0.1;
  
  return Math.round(
    (this.views * viewsWeight) +
    (this.likes * likesWeight) +
    (this.downloads * downloadsWeight) +
    (this.completionRate * completionWeight)
  );
});

// Pre-save middleware to generate slug
podcastSchema.pre('save', function (next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  
  // Generate SEO fields if not provided
  if (!this.seoTitle) {
    this.seoTitle = this.title.length > 60 ? this.title.substring(0, 57) + '...' : this.title;
  }
  
  if (!this.seoDescription && this.description) {
    this.seoDescription = this.description.length > 160 ? this.description.substring(0, 157) + '...' : this.description;
  }
  
  next();
});

// Static methods for common queries
podcastSchema.statics.findPublished = function (filter = {}) {
  return this.find({
    ...filter,
    isActive: true,
    isPublished: true,
  });
};

podcastSchema.statics.findFeatured = function (limit = 5) {
  return this.findPublished({ featured: true })
    .sort({ publishDate: -1, views: -1 })
    .limit(limit);
};

podcastSchema.statics.findLatest = function (limit = 10) {
  return this.findPublished()
    .sort({ publishDate: -1, episodeNumber: -1 })
    .limit(limit);
};

podcastSchema.statics.findByCategory = function (category, limit = 20) {
  return this.findPublished({ category: new RegExp(category, 'i') })
    .sort({ publishDate: -1 })
    .limit(limit);
};

podcastSchema.statics.findByHost = function (host, limit = 20) {
  return this.findPublished({ host: new RegExp(host, 'i') })
    .sort({ publishDate: -1 })
    .limit(limit);
};

podcastSchema.statics.searchPodcasts = function (query, options = {}) {
  const {
    category,
    host,
    minDuration,
    maxDuration,
    tags,
    limit = 20,
    skip = 0,
    sortBy = 'relevance'
  } = options;

  let searchFilter = {
    isActive: true,
    isPublished: true,
  };

  // Text search
  if (query) {
    searchFilter.$text = { $search: query };
  }

  // Category filter
  if (category) {
    searchFilter.category = new RegExp(category, 'i');
  }

  // Host filter
  if (host) {
    searchFilter.host = new RegExp(host, 'i');
  }

  // Duration filters (convert to seconds for comparison)
  if (minDuration || maxDuration) {
    // This would need custom aggregation for duration comparison
    // For now, we'll skip duration filtering in the static method
  }

  // Tags filter
  if (tags && tags.length > 0) {
    searchFilter.tags = { $in: tags };
  }

  let sortOptions = {};
  switch (sortBy) {
    case 'latest':
      sortOptions = { publishDate: -1, episodeNumber: -1 };
      break;
    case 'oldest':
      sortOptions = { publishDate: 1, episodeNumber: 1 };
      break;
    case 'popular':
      sortOptions = { views: -1, likes: -1 };
      break;
    case 'episode':
      sortOptions = { episodeNumber: -1 };
      break;
    case 'relevance':
    default:
      if (query) {
        sortOptions = { score: { $meta: 'textScore' } };
      } else {
        sortOptions = { publishDate: -1, views: -1 };
      }
      break;
  }

  return this.find(searchFilter)
    .sort(sortOptions)
    .skip(skip)
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

podcastSchema.methods.updateEngagement = function (listenTime, completed = false) {
  const durationSeconds = this.durationInSeconds;
  
  if (durationSeconds > 0) {
    // Update average listen time
    const currentTotal = this.averageListenTime * this.views;
    this.averageListenTime = (currentTotal + listenTime) / (this.views + 1);
    
    // Update completion rate
    if (completed) {
      const currentCompletions = Math.round((this.completionRate / 100) * this.views);
      this.completionRate = ((currentCompletions + 1) / (this.views + 1)) * 100;
    }
  }
  
  return this.save();
};

const Podcast = mongoose.model('Podcast', podcastSchema);

export default Podcast;
