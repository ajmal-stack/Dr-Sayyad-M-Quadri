import mongoose from 'mongoose';
import slugify from 'slugify';

/**
 * Blog Schema
 * Based on the frontend blogs.json structure
 */
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxLength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt is required'],
      trim: true,
      maxLength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      default: 'Dr. Syed M Quadri',
      trim: true,
    },
    authorBio: {
      type: String,
      trim: true,
      maxLength: [1000, 'Author bio cannot be more than 1000 characters'],
    },
    authorAvatar: {
      type: String,
      trim: true,
    },
    publishDate: {
      type: Date,
      required: [true, 'Publish date is required'],
      default: Date.now,
    },
    readTime: {
      type: String,
      trim: true,
      match: [/^\d+\s+(min|minute|minutes)\s+(read)?$/i, 'Read time must be in format "X min read" or "X minutes read"'],
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
            'Cardiovascular Health',
            'Preventive Care',
            'Research',
            'News'
          ];
          
          // Check if it's in allowed list or if it's a reasonable category name
          return allowedCategories.includes(v) || 
                 (v.length >= 2 && v.length <= 50 && /^[a-zA-Z\s&-]+$/.test(v));
        },
        message: 'Category must be a valid category name (2-50 characters, letters, spaces, hyphens, and ampersands only)'
      }
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    image: {
      type: String,
      required: [true, 'Blog image is required'],
      trim: true,
    },
    imageCloudinary: {
      publicId: String,
      url: String,
      originalName: String,
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
    shares: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
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
    seoKeywords: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    // Content metadata
    wordCount: {
      type: Number,
      min: 0,
    },
    estimatedReadTime: {
      type: Number, // in minutes
      min: 0,
    },
    // Engagement metrics
    averageReadTime: {
      type: Number, // in seconds
      default: 0,
      min: 0,
    },
    bounceRate: {
      type: Number, // percentage (0-100)
      default: 0,
      min: 0,
      max: 100,
    },
    // Content structure
    tableOfContents: [{
      heading: {
        type: String,
        required: true,
        trim: true,
      },
      level: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
      },
      anchor: {
        type: String,
        required: true,
        trim: true,
      },
    }],
    // Related content
    relatedPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }],
    // Social media
    socialMedia: {
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String,
    },
    // Publication status
    status: {
      type: String,
      enum: ['draft', 'published', 'archived', 'scheduled'],
      default: 'published',
    },
    scheduledDate: {
      type: Date,
    },
    // Content format
    format: {
      type: String,
      enum: ['article', 'listicle', 'how-to', 'interview', 'case-study', 'research', 'news', 'opinion'],
      default: 'article',
    },
    // Featured content
    featuredSection: {
      type: String,
      enum: ['hero', 'trending', 'recommended', 'latest'],
    },
    // Content difficulty
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner',
    },
    // Content language
    language: {
      type: String,
      default: 'en',
      trim: true,
    },
    // Reading progress tracking
    readingProgress: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      progress: {
        type: Number, // percentage (0-100)
        min: 0,
        max: 100,
      },
      lastReadAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });
blogSchema.index({ category: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ featured: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ publishDate: -1 });
blogSchema.index({ views: -1 });
blogSchema.index({ likes: -1 });
blogSchema.index({ isActive: 1, isPublished: 1 });
blogSchema.index({ slug: 1 }, { unique: true, sparse: true });
blogSchema.index({ tags: 1 });

// Virtual for formatted publish date
blogSchema.virtual('formattedPublishDate').get(function () {
  return this.publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for engagement score
blogSchema.virtual('engagementScore').get(function () {
  const viewsWeight = 0.3;
  const likesWeight = 0.4;
  const sharesWeight = 0.2;
  const commentsWeight = 0.1;
  
  return Math.round(
    (this.views * viewsWeight) +
    (this.likes * likesWeight) +
    (this.shares * sharesWeight) +
    (this.comments * commentsWeight)
  );
});

// Virtual for content summary
blogSchema.virtual('summary').get(function () {
  if (!this.content) return this.excerpt;
  
  // Extract first paragraph or first 200 characters
  const firstParagraph = this.content.split('\n\n')[0];
  if (firstParagraph.length <= 200) {
    return firstParagraph;
  }
  
  return this.content.substring(0, 200) + '...';
});

// Virtual for reading difficulty score
blogSchema.virtual('readabilityScore').get(function () {
  if (!this.content) return 0;
  
  // Simple readability calculation based on word and sentence count
  const words = this.content.split(/\s+/).length;
  const sentences = this.content.split(/[.!?]+/).length;
  const avgWordsPerSentence = words / sentences;
  
  // Flesch Reading Ease approximation (simplified)
  const score = 206.835 - (1.015 * avgWordsPerSentence);
  return Math.max(0, Math.min(100, Math.round(score)));
});

// Pre-save middleware to generate slug and calculate metadata
blogSchema.pre('save', function (next) {
  // Generate slug
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
  
  if (!this.seoDescription && this.excerpt) {
    this.seoDescription = this.excerpt.length > 160 ? this.excerpt.substring(0, 157) + '...' : this.excerpt;
  }
  
  // Calculate word count and estimated read time
  if (this.content) {
    this.wordCount = this.content.split(/\s+/).length;
    this.estimatedReadTime = Math.ceil(this.wordCount / 200); // 200 words per minute
    
    // Generate read time string if not provided
    if (!this.readTime) {
      this.readTime = `${this.estimatedReadTime} min read`;
    }
  }
  
  // Generate table of contents from content headings
  if (this.content && this.isModified('content')) {
    this.tableOfContents = this.generateTableOfContents();
  }
  
  next();
});

// Instance method to generate table of contents
blogSchema.methods.generateTableOfContents = function () {
  if (!this.content) return [];
  
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc = [];
  let match;
  
  while ((match = headingRegex.exec(this.content)) !== null) {
    const level = match[1].length;
    const heading = match[2].trim();
    const anchor = slugify(heading, { lower: true, strict: true });
    
    toc.push({
      heading,
      level,
      anchor,
    });
  }
  
  return toc;
};

// Static methods for common queries
blogSchema.statics.findPublished = function (filter = {}) {
  return this.find({
    ...filter,
    isActive: true,
    isPublished: true,
    status: 'published',
  });
};

blogSchema.statics.findFeatured = function (limit = 1) {
  return this.findPublished({ featured: true })
    .sort({ publishDate: -1, views: -1 })
    .limit(limit);
};

blogSchema.statics.findLatest = function (limit = 10) {
  return this.findPublished()
    .sort({ publishDate: -1 })
    .limit(limit);
};

blogSchema.statics.findTrending = function (limit = 10, days = 7) {
  const dateThreshold = new Date();
  dateThreshold.setDate(dateThreshold.getDate() - days);
  
  return this.findPublished({
    publishDate: { $gte: dateThreshold }
  })
    .sort({ views: -1, likes: -1, shares: -1 })
    .limit(limit);
};

blogSchema.statics.findByCategory = function (category, limit = 20) {
  return this.findPublished({ category: new RegExp(category, 'i') })
    .sort({ publishDate: -1 })
    .limit(limit);
};

blogSchema.statics.findByAuthor = function (author, limit = 20) {
  return this.findPublished({ author: new RegExp(author, 'i') })
    .sort({ publishDate: -1 })
    .limit(limit);
};

blogSchema.statics.findByTag = function (tag, limit = 20) {
  return this.findPublished({ tags: { $in: [tag.toLowerCase()] } })
    .sort({ publishDate: -1 })
    .limit(limit);
};

blogSchema.statics.searchBlogs = function (query, options = {}) {
  const {
    category,
    author,
    tags,
    difficulty,
    format,
    minReadTime,
    maxReadTime,
    limit = 20,
    skip = 0,
    sortBy = 'relevance'
  } = options;

  let searchFilter = {
    isActive: true,
    isPublished: true,
    status: 'published',
  };

  // Text search
  if (query) {
    searchFilter.$text = { $search: query };
  }

  // Additional filters
  if (category) searchFilter.category = new RegExp(category, 'i');
  if (author) searchFilter.author = new RegExp(author, 'i');
  if (tags && tags.length > 0) searchFilter.tags = { $in: tags.map(tag => tag.toLowerCase()) };
  if (difficulty) searchFilter.difficulty = difficulty;
  if (format) searchFilter.format = format;
  if (minReadTime) searchFilter.estimatedReadTime = { $gte: minReadTime };
  if (maxReadTime) {
    searchFilter.estimatedReadTime = searchFilter.estimatedReadTime || {};
    searchFilter.estimatedReadTime.$lte = maxReadTime;
  }

  let sortOptions = {};
  switch (sortBy) {
    case 'latest':
      sortOptions = { publishDate: -1 };
      break;
    case 'oldest':
      sortOptions = { publishDate: 1 };
      break;
    case 'popular':
      sortOptions = { views: -1, likes: -1 };
      break;
    case 'trending':
      sortOptions = { engagementScore: -1, publishDate: -1 };
      break;
    case 'readTime':
      sortOptions = { estimatedReadTime: 1 };
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
blogSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

blogSchema.methods.incrementLikes = function () {
  this.likes += 1;
  return this.save();
};

blogSchema.methods.incrementShares = function () {
  this.shares += 1;
  return this.save();
};

blogSchema.methods.updateReadingProgress = function (userId, progress) {
  const existingProgress = this.readingProgress.find(
    p => p.userId.toString() === userId.toString()
  );
  
  if (existingProgress) {
    existingProgress.progress = progress;
    existingProgress.lastReadAt = new Date();
  } else {
    this.readingProgress.push({
      userId,
      progress,
      lastReadAt: new Date(),
    });
  }
  
  return this.save();
};

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
