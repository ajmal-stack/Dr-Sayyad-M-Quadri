import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';
import database from '../config/database.js';
import Book from '../modules/books/models/Book.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed Books Data
 * Migrates books from frontend JSON to MongoDB
 */

// Books data matching frontend books.json exactly
const sampleBooksData = {
  "featuredBooks": [
    {
      "title": "Understanding Mental Health: A Comprehensive Guide",
      "subtitle": "Evidence-Based Approaches to Psychological Wellness",
      "author": "Dr. Syed M Quadri",
      "description": "A comprehensive guide to understanding mental health, covering anxiety, depression, trauma, and recovery. This book provides practical tools and insights for both patients and families dealing with mental health challenges.",
      "category": "Mental Health",
      "type": "Books",
      "price": "$24.99",
      "originalPrice": "$34.99",
      "rating": 4.8,
      "reviews": 156,
      "pages": 320,
      "publishDate": "2024-01-15",
      "isbn": "978-0-123456-78-9",
      "format": ["Hardcover", "Paperback", "E-book"],
      "image": "/books/Black and White Modern Psychology Book Cover.jpg",
      "featured": true,
      "bestseller": true,
      "tags": ["mental-health", "psychology", "therapy", "wellness"]
    },
    {
      "title": "Mind Matters: Navigating Life's Emotional Challenges",
      "subtitle": "Practical Strategies for Emotional Intelligence",
      "author": "Dr. Syed M Quadri",
      "description": "Learn how to develop emotional intelligence and navigate life's challenges with resilience. This book offers practical strategies for managing stress, building relationships, and maintaining mental wellness.",
      "category": "Psychology",
      "type": "Books",
      "price": "$19.99",
      "originalPrice": "$29.99",
      "rating": 4.7,
      "reviews": 89,
      "duration": "6h 45m",
      "narrator": "Dr. Syed M Quadri",
      "publishDate": "2023-11-20",
      "isbn": "978-0-123456-79-6",
      "format": ["Audiobook", "Digital Download"],
      "image": "/books/Navy and Pink Illustrated Mind Matters Book Cover.jpg",
      "featured": true,
      "bestseller": false,
      "tags": ["emotional-intelligence", "psychology", "self-help", "relationships"]
    }
  ],
  "otherBooks": [
    {
      "title": "The Art of Public Speaking: Overcoming Social Anxiety",
      "subtitle": "Build Confidence and Communicate Effectively",
      "author": "Dr. Syed M Quadri",
      "description": "A practical guide to overcoming social anxiety and developing confident public speaking skills. Learn evidence-based techniques to manage anxiety and communicate effectively.",
      "category": "Self-Help",
      "type": "Books",
      "price": "$16.99",
      "originalPrice": "$24.99",
      "rating": 4.6,
      "reviews": 124,
      "pages": 240,
      "publishDate": "2023-09-10",
      "isbn": "978-0-123456-80-2",
      "format": ["Paperback", "E-book"],
      "image": "/books/Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg",
      "featured": false,
      "bestseller": false,
      "tags": ["public-speaking", "social-anxiety", "confidence", "communication"]
    },
    {
      "title": "Mindful Eating: A Guide to Healthy Relationship with Food",
      "subtitle": "Overcome Emotional Eating and Find Balance",
      "author": "Dr. Syed M Quadri",
      "description": "Discover how to develop a healthy relationship with food through mindfulness and psychological insights. Address emotional eating and build sustainable eating habits.",
      "category": "Wellness",
      "type": "Audiobook",
      "price": "$18.99",
      "originalPrice": "$26.99",
      "rating": 4.5,
      "reviews": 67,
      "duration": "4h 30m",
      "narrator": "Dr. Syed M Quadri",
      "publishDate": "2023-07-15",
      "isbn": "978-0-123456-81-9",
      "format": ["Audiobook", "Digital Download"],
      "image": "/books/Red Simple Food Journal Book Cover.jpg",
      "featured": false,
      "bestseller": false,
      "tags": ["mindful-eating", "wellness", "nutrition", "psychology"]
    },
    {
      "title": "Food Journal: Daily Nutrition and Mood Tracker",
      "subtitle": "Track Your Eating Habits and Emotional Patterns",
      "author": "Dr. Syed M Quadri",
      "description": "A comprehensive food and mood journal to help you understand the connection between nutrition and mental health. Includes guided prompts and tracking tools.",
      "category": "Journal",
      "type": "Books",
      "price": "$12.99",
      "originalPrice": "$19.99",
      "rating": 4.4,
      "reviews": 45,
      "pages": 180,
      "publishDate": "2023-06-01",
      "isbn": "978-0-123456-82-6",
      "format": ["Paperback"],
      "image": "/books/Red and Green Seamless Pattern Printable Daily Food Journal Cover.jpg",
      "featured": false,
      "bestseller": false,
      "tags": ["journal", "nutrition", "mood-tracking", "wellness"]
    },
    {
      "title": "Love and Healing: A Doctor's Journey Through Mental Health",
      "subtitle": "Personal Stories and Professional Insights",
      "author": "Dr. Syed M Quadri",
      "description": "A heartfelt memoir combining personal experiences with professional insights into mental health treatment. Stories of hope, healing, and the human connection in therapy.",
      "category": "Memoir",
      "type": "Audiobook",
      "price": "$21.99",
      "originalPrice": "$31.99",
      "rating": 4.9,
      "reviews": 78,
      "duration": "8h 15m",
      "narrator": "Dr. Syed M Quadri",
      "publishDate": "2023-05-12",
      "isbn": "978-0-123456-83-3",
      "format": ["Audiobook", "Digital Download", "E-book"],
      "image": "/books/Romantic Doctor Love Story Ebook Cover.png",
      "featured": false,
      "bestseller": true,
      "tags": ["memoir", "mental-health", "doctor-story", "healing"]
    }
  ]
};

/**
 * Transform book data to match our schema
 */
function transformBookData(book, index) {
  // Generate a unique slug
  const baseSlug = book.title ? book.title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-') : `book-${index}`;
  
  const slug = `${baseSlug}-${Date.now()}-${index}`; // Ensure uniqueness
  
  // Parse price values to numbers
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    if (typeof priceStr === 'number') return priceStr;
    // Remove currency symbols and parse as float
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  return {
    title: book.title,
    subtitle: book.subtitle,
    slug: slug,
    author: book.author,
    description: book.description,
    category: book.category,
    type: book.type,
    price: parsePrice(book.price),
    originalPrice: parsePrice(book.originalPrice),
    rating: book.rating || 0,
    reviews: book.reviews || 0,
    pages: book.pages,
    duration: book.duration,
    narrator: book.narrator,
    publishDate: book.publishDate ? new Date(book.publishDate) : new Date(),
    isbn: book.isbn,
    format: book.format || [],
    image: book.image,
    featured: book.featured || false,
    bestseller: book.bestseller || false,
    tags: book.tags || [],
    status: 'published',
    isActive: true,
    isPublished: true,
    views: Math.floor(Math.random() * 1000) + 100, // Random views for demo
    downloads: Math.floor(Math.random() * 500) + 50, // Random downloads for demo
  };
}

/**
 * Seed books from JSON data
 */
async function seedBooks() {
  try {
    console.log('🌱 Starting books seeding process...');

    // Connect to database
    await database.connect();

    // Clear existing books (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing books...');
    await Book.deleteMany({});

    // Prepare books data
    const allBooks = [
      ...sampleBooksData.featuredBooks,
      ...sampleBooksData.otherBooks
    ];

    console.log(`📚 Preparing to seed ${allBooks.length} books...`);

    // Transform and insert books
    const transformedBooks = allBooks.map((book, index) => transformBookData(book, index));
    
    const insertedBooks = await Book.insertMany(transformedBooks);
    
    console.log(`✅ Successfully seeded ${insertedBooks.length} books!`);

    // Display summary
    const stats = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          featuredBooks: { $sum: { $cond: ['$featured', 1, 0] } },
          bestsellerBooks: { $sum: { $cond: ['$bestseller', 1, 0] } },
          avgRating: { $avg: '$rating' },
          categories: { $addToSet: '$category' }
        }
      }
    ]);

    if (stats.length > 0) {
      const summary = stats[0];
      console.log('\n📊 Seeding Summary:');
      console.log(`   Total Books: ${summary.totalBooks}`);
      console.log(`   Featured Books: ${summary.featuredBooks}`);
      console.log(`   Bestseller Books: ${summary.bestsellerBooks}`);
      console.log(`   Average Rating: ${summary.avgRating.toFixed(2)}`);
      console.log(`   Categories: ${summary.categories.join(', ')}`);
    }

    console.log('\n🎉 Books seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding books:', error);
    throw error;
  }
}

/**
 * Load books from external JSON file (if exists)
 */
async function loadBooksFromFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      console.log(`📖 Loading books from ${filePath}...`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const booksData = JSON.parse(fileContent);
      
      // Handle different JSON structures
      let allBooks = [];
      
      if (booksData.featuredBooks && booksData.otherBooks) {
        allBooks = [...booksData.featuredBooks, ...booksData.otherBooks];
      } else if (booksData.featuredBooks && booksData.regularBooks) {
        allBooks = [...booksData.featuredBooks, ...booksData.regularBooks];
      } else if (booksData.featuredBooks) {
        allBooks = booksData.featuredBooks;
      } else if (Array.isArray(booksData)) {
        allBooks = booksData;
      } else {
        console.warn('⚠️  Unknown JSON structure, using sample data');
        return sampleBooksData;
      }
      
      return { books: allBooks };
    } else {
      console.log('📝 External books file not found, using sample data');
      return sampleBooksData;
    }
  } catch (error) {
    console.error('❌ Error loading books from file:', error);
    return sampleBooksData;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting Books Seeder...');
  
  try {
    // Check if .env file exists
    const envPath = path.join(__dirname, '../../.env');
    if (!fs.existsSync(envPath)) {
      console.error('❌ .env file not found. Please create one from .env.example');
      process.exit(1);
    }
    
    console.log('✅ Environment file found');
    
    // Try to load from frontend books.json file
    const frontendBooksPath = path.join(__dirname, '../../../client/src/data/books.json');
    console.log(`📂 Looking for books data at: ${frontendBooksPath}`);
    
    const booksData = await loadBooksFromFile(frontendBooksPath);
    
    // Update sample data if external file was loaded
    if (booksData.books) {
      console.log(`📚 Loaded ${booksData.books.length} books from external file`);
      sampleBooksData.featuredBooks = booksData.books.filter(book => book.featured);
      sampleBooksData.otherBooks = booksData.books.filter(book => !book.featured);
    } else {
      console.log('📝 Using built-in sample data');
    }
    
    await seedBooks();
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    // Close database connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
    process.exit(0);
  }
}

// Run the seeder
main();

export { seedBooks, transformBookData };
