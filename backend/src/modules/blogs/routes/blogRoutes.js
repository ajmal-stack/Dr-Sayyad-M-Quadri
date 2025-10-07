import express from 'express';
import blogController from '../controllers/blogController.js';
import { validateBlogQuery, validateBlogSearch, validateBlogIdentifier } from '../middleware/validation.js';

const router = express.Router();

/**
 * Blog Routes
 * All routes are prefixed with /api/v1/blogs
 */

// Public routes (no authentication required)

/**
 * @route   GET /api/v1/blogs
 * @desc    Get all blogs with filtering and pagination
 * @access  Public
 * @params  ?page=1&limit=10&category=Mental Health&author=Dr. Syed M Quadri&featured=true&search=anxiety
 */
router.get('/', validateBlogQuery, blogController.getAllBlogs);

/**
 * @route   GET /api/v1/blogs/featured
 * @desc    Get featured blog
 * @access  Public
 */
router.get('/featured', blogController.getFeaturedBlog);

/**
 * @route   GET /api/v1/blogs/latest
 * @desc    Get latest blogs
 * @access  Public
 * @params  ?limit=10
 */
router.get('/latest', blogController.getLatestBlogs);

/**
 * @route   GET /api/v1/blogs/trending
 * @desc    Get trending blogs
 * @access  Public
 * @params  ?limit=10&days=7
 */
router.get('/trending', blogController.getTrendingBlogs);

/**
 * @route   GET /api/v1/blogs/categories
 * @desc    Get all blog categories with counts
 * @access  Public
 */
router.get('/categories', blogController.getCategories);

/**
 * @route   GET /api/v1/blogs/tags
 * @desc    Get all blog tags with counts
 * @access  Public
 * @params  ?limit=50
 */
router.get('/tags', blogController.getTags);

/**
 * @route   GET /api/v1/blogs/stats
 * @desc    Get blog statistics
 * @access  Public
 */
router.get('/stats', blogController.getBlogStats);

/**
 * @route   GET /api/v1/blogs/search
 * @desc    Search blogs by query
 * @access  Public
 * @params  ?q=mental health&category=Psychology&author=Dr. Syed M Quadri
 */
router.get('/search', validateBlogSearch, blogController.searchBlogs);

/**
 * @route   GET /api/v1/blogs/category/:category
 * @desc    Get blogs by category
 * @access  Public
 * @params  category - Category name (e.g., "Mental Health", "Psychology")
 */
router.get('/category/:category', blogController.getBlogsByCategory);

/**
 * @route   GET /api/v1/blogs/author/:author
 * @desc    Get blogs by author
 * @access  Public
 * @params  author - Author name (e.g., "Dr. Syed M Quadri")
 */
router.get('/author/:author', blogController.getBlogsByAuthor);

/**
 * @route   GET /api/v1/blogs/tag/:tag
 * @desc    Get blogs by tag
 * @access  Public
 * @params  tag - Tag name (e.g., "anxiety", "wellness")
 */
router.get('/tag/:tag', blogController.getBlogsByTag);

/**
 * @route   POST /api/v1/blogs/:identifier/track
 * @desc    Track blog engagement (view, like, share, read)
 * @access  Public
 * @params  identifier - Blog ID (ObjectId) or slug
 * @body    { action: 'view|like|share|read', progress?: number, userId?: string }
 */
router.post('/:identifier/track', validateBlogIdentifier, blogController.trackEngagement);

/**
 * @route   GET /api/v1/blogs/:identifier
 * @desc    Get single blog by ID or slug
 * @access  Public
 * @params  identifier - Blog ID (ObjectId) or slug
 */
router.get('/:identifier', validateBlogIdentifier, blogController.getBlog);

// Protected routes (authentication required) - Will be implemented later
// router.post('/', authenticate, authorize('admin'), blogController.createBlog);
// router.put('/:id', authenticate, authorize('admin'), blogController.updateBlog);
// router.delete('/:id', authenticate, authorize('admin'), blogController.deleteBlog);

export default router;
