import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      maxLength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Book description is required'],
      trim: true,
      maxLength: [1000, 'Description cannot be more than 1000 characters'],
    },
    coverImage: {
      url: String,
      publicId: String,
      originalName: String,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Health & Wellness',
        'Self-Help',
        'Romance',
        'Health',
        'Nutrition',
        'Psychology',
      ],
      trim: true,
    },
    author: {
      type: String,
      default: 'Dr. Syed M Quadri',
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    pages: {
      type: Number,
      min: [1, 'Pages must be at least 1'],
    },
    language: {
      type: String,
      default: 'English',
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
    sales: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
bookSchema.index({ title: 'text', description: 'text', tags: 'text' });
bookSchema.index({ category: 1 });
bookSchema.index({ price: 1 });
bookSchema.index({ publishDate: -1 });
bookSchema.index({ 'rating.average': -1 });

// Virtual for formatted price
bookSchema.virtual('formattedPrice').get(function () {
  return `$${this.price.toFixed(2)}`;
});

// Pre-save middleware
bookSchema.pre('save', function (next) {
  if (this.isNew) {
    this.publishDate = this.publishDate || new Date();
  }
  next();
});

// Static methods
bookSchema.statics.getByCategory = function (category) {
  return this.find({
    category: new RegExp(category, 'i'),
    isAvailable: true,
  }).sort({ publishDate: -1 });
};

bookSchema.statics.getFeatured = function (limit = 5) {
  return this.find({ isAvailable: true })
    .sort({ 'rating.average': -1, sales: -1 })
    .limit(limit);
};

bookSchema.statics.searchBooks = function (query) {
  return this.find({
    $text: { $search: query },
    isAvailable: true,
  }).sort({ score: { $meta: 'textScore' } });
};

const Book = mongoose.model('Book', bookSchema);

export default Book;
