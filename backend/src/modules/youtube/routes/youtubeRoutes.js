import express from 'express';
import {
  getAllVideos,
  getVideoById,
  getVideoByVideoId,
  createVideo,
  updateVideo,
  deleteVideo,
  getFeaturedVideos,
  getTrendingVideos,
  getLatestVideos,
  getVideosByCategory,
  getVideoStats,
  seedDatabase
} from '../controllers/youtubeController.js';

const router = express.Router();

// Public routes
router.get('/', getAllVideos);
router.get('/featured', getFeaturedVideos);
router.get('/trending', getTrendingVideos);
router.get('/latest', getLatestVideos);
router.get('/stats', getVideoStats);
router.get('/category/:category', getVideosByCategory);
router.get('/video/:videoId', getVideoByVideoId);
router.get('/:id', getVideoById);

// Admin routes (you can add authentication middleware here)
router.post('/', createVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

// Utility routes
router.post('/seed', seedDatabase);

export default router;
