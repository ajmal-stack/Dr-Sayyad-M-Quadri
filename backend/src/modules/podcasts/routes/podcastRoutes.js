import express from 'express';
import podcastController from '../controllers/podcastController.js';
import { validatePodcastQuery, validatePodcastSearch, validatePodcastIdentifier } from '../middleware/validation.js';
import { uploadPodcastFiles } from '../middleware/fileUpload.js';

const router = express.Router();

/**
 * Podcast Routes
 * All routes are prefixed with /api/v1/podcasts
 */

// Public routes (no authentication required)

/**
 * @route   GET /api/v1/podcasts
 * @desc    Get all podcasts with filtering and pagination
 * @access  Public
 * @params  ?page=1&limit=10&category=Mental Health&host=Dr. Syed M Quadri&featured=true&search=anxiety
 */
router.get('/', validatePodcastQuery, podcastController.getAllPodcasts);

/**
 * @route   GET /api/v1/podcasts/featured
 * @desc    Get featured podcasts
 * @access  Public
 * @params  ?limit=5
 */
router.get('/featured', podcastController.getFeaturedPodcasts);

/**
 * @route   GET /api/v1/podcasts/latest
 * @desc    Get latest podcasts
 * @access  Public
 * @params  ?limit=10
 */
router.get('/latest', podcastController.getLatestPodcasts);

/**
 * @route   GET /api/v1/podcasts/categories
 * @desc    Get all podcast categories with counts
 * @access  Public
 */
router.get('/categories', podcastController.getCategories);

/**
 * @route   GET /api/v1/podcasts/stats
 * @desc    Get podcast statistics
 * @access  Public
 */
router.get('/stats', podcastController.getPodcastStats);

/**
 * @route   GET /api/v1/podcasts/search
 * @desc    Search podcasts by query
 * @access  Public
 * @params  ?q=mental health&category=Psychology&host=Dr. Syed M Quadri
 */
router.get('/search', validatePodcastSearch, podcastController.searchPodcasts);

/**
 * @route   GET /api/v1/podcasts/category/:category
 * @desc    Get podcasts by category
 * @access  Public
 * @params  category - Category name (e.g., "Mental Health", "Psychology")
 */
router.get('/category/:category', podcastController.getPodcastsByCategory);

/**
 * @route   GET /api/v1/podcasts/host/:host
 * @desc    Get podcasts by host
 * @access  Public
 * @params  host - Host name (e.g., "Dr. Syed M Quadri")
 */
router.get('/host/:host', podcastController.getPodcastsByHost);

/**
 * @route   GET /api/v1/podcasts/:identifier/transcript
 * @desc    Get podcast transcript
 * @access  Public
 * @params  identifier - Podcast ID (ObjectId) or slug
 */
router.get('/:identifier/transcript', validatePodcastIdentifier, podcastController.getPodcastTranscript);

/**
 * @route   POST /api/v1/podcasts/:identifier/track
 * @desc    Track podcast engagement (play, like, download, listen)
 * @access  Public
 * @params  identifier - Podcast ID (ObjectId) or slug
 * @body    { action: 'play|like|download|listen', listenTime?: number, completed?: boolean }
 */
router.post('/:identifier/track', validatePodcastIdentifier, podcastController.trackEngagement);

/**
 * @route   GET /api/v1/podcasts/:identifier
 * @desc    Get single podcast by ID or slug
 * @access  Public
 * @params  identifier - Podcast ID (ObjectId) or slug
 */
router.get('/:identifier', validatePodcastIdentifier, podcastController.getPodcast);

// Protected routes (authentication required) - Temporarily without auth for testing
// TODO: Add authentication middleware when auth system is ready

/**
 * @route   POST /api/v1/podcasts
 * @desc    Create a new podcast with file uploads
 * @access  Admin (temporarily public for testing)
 */
router.post('/', uploadPodcastFiles, podcastController.createPodcast);

/**
 * @route   PUT /api/v1/podcasts/:id
 * @desc    Update podcast with optional file uploads
 * @access  Admin (temporarily public for testing)
 */
router.put('/:id', uploadPodcastFiles, podcastController.updatePodcast);

/**
 * @route   DELETE /api/v1/podcasts/:id
 * @desc    Delete podcast and associated files
 * @access  Admin (temporarily public for testing)
 */
router.delete('/:id', podcastController.deletePodcast);

// File management endpoints
/**
 * @route   POST /api/v1/podcasts/:id/files/audio
 * @desc    Upload or update audio file for existing podcast
 * @access  Admin
 */
router.post('/:id/files/audio', uploadPodcastFiles, podcastController.updatePodcast);

/**
 * @route   POST /api/v1/podcasts/:id/files/cover
 * @desc    Upload or update cover image for existing podcast
 * @access  Admin
 */
router.post('/:id/files/cover', uploadPodcastFiles, podcastController.updatePodcast);

/**
 * @route   DELETE /api/v1/podcasts/:id/files/audio
 * @desc    Remove audio file from podcast
 * @access  Admin
 */
router.delete('/:id/files/audio', podcastController.removeAudioFile);

/**
 * @route   DELETE /api/v1/podcasts/:id/files/cover
 * @desc    Remove cover image from podcast
 * @access  Admin
 */
router.delete('/:id/files/cover', podcastController.removeCoverImage);

export default router;
