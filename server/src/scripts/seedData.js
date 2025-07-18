import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/Book.js';
import Podcast from '../models/Podcast.js';
import Contact from '../models/Contact.js';

// Load environment variables
dotenv.config();

const sampleBooks = [
  {
    title: 'Mind Matters',
    description:
      'A comprehensive guide to mental health and wellness, exploring the intricate connections between mind, body, and spirit.',
    coverImage: {
      url: '/books/Navy and Pink Illustrated Mind Matters Book Cover.jpg',
      publicId: 'books/mind-matters-cover',
      originalName: 'Navy and Pink Illustrated Mind Matters Book Cover.jpg',
    },
    price: 19.99,
    category: 'Health & Wellness',
    pages: 250,
    isbn: '978-1234567890',
    tags: ['mental health', 'wellness', 'psychology', 'self-help'],
    rating: { average: 4.5, count: 28 },
    sales: 150,
  },
  {
    title: 'Public Speaking Mastery',
    description:
      'Learn the art of effective public speaking and overcome your fears to communicate with confidence and impact.',
    coverImage: {
      url: '/books/Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg',
      publicId: 'books/public-speaking-cover',
      originalName:
        'Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg',
    },
    price: 24.99,
    category: 'Self-Help',
    pages: 180,
    isbn: '978-1234567891',
    tags: ['public speaking', 'communication', 'confidence', 'presentation'],
    rating: { average: 4.7, count: 42 },
    sales: 220,
  },
  {
    title: 'Love & Healing',
    description:
      "A romantic doctor's journey through love and medicine, exploring the healing power of human connection.",
    coverImage: {
      url: '/books/Romantic Doctor Love Story Ebook Cover.png',
      publicId: 'books/love-healing-cover',
      originalName: 'Romantic Doctor Love Story Ebook Cover.png',
    },
    price: 16.99,
    category: 'Romance',
    pages: 320,
    isbn: '978-1234567892',
    tags: ['romance', 'medicine', 'healing', 'love story'],
    rating: { average: 4.2, count: 65 },
    sales: 380,
  },
  {
    title: 'Daily Food Journal',
    description:
      'Track your nutrition and wellness journey with this comprehensive guide to mindful eating and healthy living.',
    coverImage: {
      url: '/books/Red and Green Seamless Pattern Printable Daily Food Journal Cover.jpg',
      publicId: 'books/daily-food-journal-cover',
      originalName:
        'Red and Green Seamless Pattern Printable Daily Food Journal Cover.jpg',
    },
    price: 12.99,
    category: 'Health',
    pages: 120,
    isbn: '978-1234567893',
    tags: ['nutrition', 'health', 'journal', 'wellness'],
    rating: { average: 4.0, count: 19 },
    sales: 95,
  },
  {
    title: 'Simple Food Journal',
    description:
      'A minimalist approach to food tracking, designed for busy individuals who want to maintain healthy eating habits.',
    coverImage: {
      url: '/books/Red Simple Food Journal Book Cover.jpg',
      publicId: 'books/simple-food-journal-cover',
      originalName: 'Red Simple Food Journal Book Cover.jpg',
    },
    price: 9.99,
    category: 'Health',
    pages: 80,
    isbn: '978-1234567894',
    tags: ['nutrition', 'simple', 'tracking', 'minimalist'],
    rating: { average: 4.3, count: 33 },
    sales: 180,
  },
];

const samplePodcasts = [
  {
    title: 'Mental Health Awareness: Breaking the Stigma',
    description:
      'Understanding the importance of mental health in modern society and how to support those struggling with mental health challenges.',
    duration: '45:30',
    publishDate: new Date('2024-01-15'),
    category: 'Health',
    audioUrl: {
      url: '#',
      publicId: 'podcasts/mental-health-episode-1',
      originalName: 'mental-health-awareness.mp3',
    },
    featured: true,
    episodeNumber: 1,
    season: 1,
    tags: ['mental health', 'awareness', 'stigma', 'psychology'],
    views: 1250,
    likes: 89,
    downloads: 542,
    rating: { average: 4.8, count: 67 },
  },
  {
    title: 'Nutrition and Wellness: Building Healthy Habits',
    description:
      'How proper nutrition impacts your overall well-being and practical tips for maintaining a balanced diet in a busy lifestyle.',
    duration: '38:15',
    publishDate: new Date('2024-01-08'),
    category: 'Nutrition',
    audioUrl: {
      url: '#',
      publicId: 'podcasts/nutrition-wellness-episode-2',
      originalName: 'nutrition-wellness.mp3',
    },
    featured: false,
    episodeNumber: 2,
    season: 1,
    tags: ['nutrition', 'wellness', 'healthy habits', 'diet'],
    views: 890,
    likes: 62,
    downloads: 341,
    rating: { average: 4.5, count: 43 },
  },
  {
    title: 'Public Speaking Tips: From Fear to Confidence',
    description:
      'Overcoming fear and becoming an effective speaker with practical techniques and real-world examples.',
    duration: '52:20',
    publishDate: new Date('2024-01-01'),
    category: 'Self-Development',
    audioUrl: {
      url: '#',
      publicId: 'podcasts/public-speaking-episode-3',
      originalName: 'public-speaking-tips.mp3',
    },
    featured: true,
    episodeNumber: 3,
    season: 1,
    tags: ['public speaking', 'confidence', 'communication', 'fear'],
    views: 1580,
    likes: 124,
    downloads: 723,
    rating: { average: 4.9, count: 98 },
  },
  {
    title: 'The Science of Love: Psychology of Relationships',
    description:
      'Exploring the psychological and neurological aspects of love and how to build lasting, meaningful relationships.',
    duration: '41:45',
    publishDate: new Date('2023-12-25'),
    category: 'Psychology',
    audioUrl: {
      url: '#',
      publicId: 'podcasts/science-love-episode-4',
      originalName: 'science-of-love.mp3',
    },
    featured: false,
    episodeNumber: 4,
    season: 1,
    tags: ['love', 'psychology', 'relationships', 'neuroscience'],
    views: 720,
    likes: 55,
    downloads: 289,
    rating: { average: 4.3, count: 31 },
  },
];

const sampleContacts = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0123',
    subject: 'Book Collaboration Inquiry',
    message:
      "Hi Dr. Quadri, I'm a fellow author interested in collaborating on a mental health awareness book. I've read your work and would love to discuss potential partnership opportunities.",
    category: 'General Inquiry',
    status: 'new',
    priority: 'medium',
  },
  {
    name: 'Michael Chen',
    email: 'mchen@university.edu',
    phone: '+1-555-0124',
    subject: 'Speaking Engagement Request',
    message:
      "We would like to invite you to speak at our university's wellness week. The event is scheduled for March 2024, and we believe your expertise would be invaluable to our students.",
    category: 'Speaking Engagement',
    status: 'read',
    priority: 'high',
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    subject: 'Podcast Guest Interest',
    message:
      'I host a wellness podcast with 50k+ listeners and would love to have you as a guest to discuss mental health awareness. The interview would be about 45 minutes.',
    category: 'Podcast Guest',
    status: 'replied',
    priority: 'medium',
    respondedAt: new Date(),
    respondedBy: 'Dr. Quadri',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    await Podcast.deleteMany({});
    await Contact.deleteMany({});
    console.log('Cleared existing data');

    // Seed Books
    await Book.insertMany(sampleBooks);
    console.log(`✅ Seeded ${sampleBooks.length} books`);

    // Seed Podcasts
    await Podcast.insertMany(samplePodcasts);
    console.log(`✅ Seeded ${samplePodcasts.length} podcasts`);

    // Seed Contacts
    await Contact.insertMany(sampleContacts);
    console.log(`✅ Seeded ${sampleContacts.length} contacts`);

    console.log('\n🎉 Database seeding completed successfully!');

    // Display summary
    const bookCount = await Book.countDocuments();
    const podcastCount = await Podcast.countDocuments();
    const contactCount = await Contact.countDocuments();

    console.log('\n📊 Database Summary:');
    console.log(`Books: ${bookCount}`);
    console.log(`Podcasts: ${podcastCount}`);
    console.log(`Contacts: ${contactCount}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding script
seedDatabase();
