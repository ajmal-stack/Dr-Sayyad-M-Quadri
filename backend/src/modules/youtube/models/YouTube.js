import mongoose from 'mongoose';

const youtubeSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  publishDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Mental Health', 'Anxiety', 'Emotional Health', 'Health']
  },
  tags: [{
    type: String,
    trim: true
  }],
  channelName: {
    type: String,
    default: 'Dr. Syed M Quadri'
  },
  isNew: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

// Indexes for better query performance
youtubeSchema.index({ category: 1 });
youtubeSchema.index({ featured: 1 });
youtubeSchema.index({ isTrending: 1 });
youtubeSchema.index({ isNew: 1 });
youtubeSchema.index({ publishDate: -1 });
youtubeSchema.index({ views: -1 });
youtubeSchema.index({ likes: -1 });

// Text index for search functionality
youtubeSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text'
});

// Virtual for YouTube URL
youtubeSchema.virtual('youtubeUrl').get(function() {
  return `https://www.youtube.com/watch?v=${this.videoId}`;
});

// Virtual for embed URL
youtubeSchema.virtual('embedUrl').get(function() {
  return `https://www.youtube.com/embed/${this.videoId}`;
});

// Ensure virtual fields are serialized
youtubeSchema.set('toJSON', { virtuals: true });

export default mongoose.model('YouTube', youtubeSchema);
