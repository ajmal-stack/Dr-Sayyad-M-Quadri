import express from 'express';

const router = express.Router();

// Import module routes
import bookRoutes from '../../modules/books/routes/bookRoutes.js';
import categoryRoutes from '../../modules/books/routes/categoryRoutes.js';
import podcastRoutes from '../../modules/podcasts/routes/podcastRoutes.js';
import youtubeRoutes from '../../modules/youtube/routes/youtubeRoutes.js';
import blogRoutes from '../../modules/blogs/routes/blogRoutes.js';
import treatmentRoutes from '../../modules/treatment/routes/treatmentRoutes.js';
// import authRoutes from '../../modules/auth/routes/authRoutes.js';
// import contactRoutes from '../../modules/contact/routes/contactRoutes.js';

// API v1 routes
router.get('/', (req, res) => {
  console.log('📍 API v1 root route hit');
  res.json({
    message: 'Dr. Syed M Quadri API',
    version: '1.0.0',
    endpoints: {
      // auth: '/auth',
      books: '/books',
      categories: '/categories',
      podcasts: '/podcasts',
      blogs: '/blogs',
      youtube: '/youtube',
      treatments: '/treatments',
      contact: '/contact',
      media: '/media',
      analytics: '/analytics',
    },
    status: 'active',
    timestamp: new Date().toISOString(),
  });
});

// Simple test route
router.get('/test', (req, res) => {
  console.log('📍 API v1 test route hit');
  res.json({
    message: 'API v1 test route working',
    timestamp: new Date().toISOString(),
  });
});

// Debug route to test if v1 router is working
router.get('/debug', (req, res) => {
  console.log('🐛 Debug route hit!');
  res.json({
    message: 'V1 Router is working!',
    timestamp: new Date().toISOString(),
  });
});

// Module routes with debugging
console.log('🔧 Loading books routes...');
router.use('/books', bookRoutes);
console.log('✅ Books routes loaded');

console.log('🔧 Loading category routes...');
router.use('/categories', categoryRoutes);
console.log('✅ Category routes loaded');

console.log('🔧 Loading podcast routes...');
router.use('/podcasts', podcastRoutes);
console.log('✅ Podcast routes loaded');

console.log('🔧 Loading YouTube routes...');
router.use('/youtube', youtubeRoutes);
console.log('✅ YouTube routes loaded');

console.log('🔧 Loading blog routes...');
router.use('/blogs', blogRoutes);
console.log('✅ Blog routes loaded');

console.log('🔧 Loading treatment routes...');
router.use('/treatments', treatmentRoutes);
console.log('✅ Treatment routes loaded');

// console.log('🔧 Loading auth routes...');
// router.use('/auth', authRoutes);
// router.use('/contact', contactRoutes);

export default router;
