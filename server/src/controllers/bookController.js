import Book from '../models/Book.js';

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let query = { isAvailable: true };

    // Add filters
    if (category) {
      query.category = new RegExp(category, 'i');
    }

    if (search) {
      query.$text = { $search: search };
    }

    let booksQuery = Book.find(query);

    // Apply sorting
    if (search) {
      booksQuery = booksQuery.sort({ score: { $meta: 'textScore' } });
    } else if (featured === 'true') {
      booksQuery = booksQuery.sort({ 'rating.average': -1, sales: -1 });
    } else {
      booksQuery = booksQuery.sort({ publishDate: -1 });
    }

    const books = await booksQuery.skip(skip).limit(limitNum);
    const total = await Book.countDocuments(query);

    res.json({
      success: true,
      count: books.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: books,
    });
  } catch (error) {
    console.error('Books fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch books',
    });
  }
};

// Get featured books
export const getFeaturedBooks = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const books = await Book.getFeatured(parseInt(limit));

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Featured books error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured books',
    });
  }
};

// Get books by category
export const getBooksByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const books = await Book.getByCategory(category);

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Books by category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch books by category',
    });
  }
};

// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found',
      });
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Book fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch book',
    });
  }
};

// Create new book
export const createBook = async (req, res) => {
  try {
    const bookData = req.body;

    // Add cover image if uploaded
    if (req.file) {
      bookData.coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
      };
    }

    const book = new Book(bookData);
    await book.save();

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    console.error('Book creation error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create book',
    });
  }
};

// Update book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Add cover image if uploaded
    if (req.file) {
      updateData.coverImage = {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
      };
    }

    const book = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found',
      });
    }

    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    console.error('Book update error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update book',
    });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found',
      });
    }

    res.json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error) {
    console.error('Book deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete book',
    });
  }
};

// Get public speaking book data
export const getPublicSpeakingBook = async (req, res) => {
  try {
    const bookData = {
      title: 'Public Speaking Mastery',
      subtitle: 'Overcome Anxiety and Speak with Confidence',
      author: 'Dr. Syed M Quadri',
      coverImage:
        '/books/Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg',
      description:
        'Transform your fear of public speaking into confident communication. This comprehensive guide combines psychological insights with practical techniques to help you become a compelling and confident speaker.',
      learningPoints: [
        'Understanding and overcoming speaking anxiety',
        'Building confidence through preparation',
        'Engaging your audience effectively',
        'Body language and vocal techniques',
        'Handling difficult questions and situations',
      ],
      details: {
        format: 'Paperback & Digital',
        pages: 256,
        language: 'English',
        category: 'Self-Help',
      },
    };

    res.json({
      success: true,
      data: bookData,
    });
  } catch (error) {
    console.error('Public speaking book fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch book data',
    });
  }
};
