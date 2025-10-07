import Blog from '../models/Blog.js';
import { asyncHandler, AppError } from '../../../shared/middleware/errorHandler.js';
import { config } from '../../../config/index.js';

/**
 * Blog Controller
 * Handles all blog-related operations
 */
class BlogController {
  /**
   * @desc    Get all blogs with filtering, sorting, and pagination
   * @route   GET /api/v1/blogs
   * @access  Public
   */
  getAllBlogs = asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = config.pagination.defaultLimit,
      category,
      author,
      featured,
      difficulty,
      format,
      minReadTime,
      maxReadTime,
      tags,
      search,
      sortBy = 'latest',
      status = 'published',
      isActive = true,
      isPublished = true,
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    if (status) filter.status = status;
    if (category) filter.category = new RegExp(category, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (featured !== undefined) filter.featured = featured === 'true';
    if (difficulty) filter.difficulty = difficulty;
    if (format) filter.format = format;
    if (minReadTime) filter.estimatedReadTime = { $gte: parseInt(minReadTime) };
    if (maxReadTime) {
      filter.estimatedReadTime = filter.estimatedReadTime || {};
      filter.estimatedReadTime.$lte = parseInt(maxReadTime);
    }
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',');
      filter.tags = { $in: tagArray.map(tag => tag.trim().toLowerCase()) };
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Sorting options
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
      case 'alphabetical':
        sortOptions = { title: 1 };
        break;
      case 'relevance':
      default:
        sortOptions = search 
          ? { score: { $meta: 'textScore' }, publishDate: -1 }
          : { publishDate: -1, views: -1 };
        break;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), config.pagination.maxLimit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .populate('relatedPosts', 'title slug excerpt image publishDate')
        .lean(),
      Blog.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalBlogs / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalBlogs,
        limit: limitNum,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? pageNum + 1 : null,
        prevPage: hasPrevPage ? pageNum - 1 : null,
      },
      filters: {
        category,
        author,
        featured,
        difficulty,
        format,
        minReadTime,
        maxReadTime,
        tags,
        search,
        sortBy,
      },
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get featured blog
   * @route   GET /api/v1/blogs/featured
   * @access  Public
   */
  getFeaturedBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findFeatured(1);

    if (!blog || blog.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'No featured blog found',
        },
        timestamp: new Date().toISOString(),
      });
    }

    res.status(200).json({
      success: true,
      data: blog[0],
      message: 'Featured blog retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get latest blogs
   * @route   GET /api/v1/blogs/latest
   * @access  Public
   */
  getLatestBlogs = asyncHandler(async (req, res) => {
    const { limit = 10 } = req.query;
    
    const blogs = await Blog.findLatest(parseInt(limit));

    res.status(200).json({
      success: true,
      data: blogs,
      count: blogs.length,
      message: 'Latest blogs retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get trending blogs
   * @route   GET /api/v1/blogs/trending
   * @access  Public
   */
  getTrendingBlogs = asyncHandler(async (req, res) => {
    const { limit = 10, days = 7 } = req.query;
    
    const blogs = await Blog.findTrending(parseInt(limit), parseInt(days));

    res.status(200).json({
      success: true,
      data: blogs,
      count: blogs.length,
      timeframe: `${days} days`,
      message: 'Trending blogs retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get blogs by category
   * @route   GET /api/v1/blogs/category/:category
   * @access  Public
   */
  getBlogsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [blogs, totalBlogs] = await Promise.all([
      Blog.findByCategory(category, limitNum).skip(skip),
      Blog.countDocuments({ 
        category: new RegExp(category, 'i'),
        isActive: true,
        isPublished: true,
        status: 'published'
      })
    ]);

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: `No blogs found in category: ${category}`,
        },
        timestamp: new Date().toISOString(),
      });
    }

    const totalPages = Math.ceil(totalBlogs / limitNum);

    res.status(200).json({
      success: true,
      data: blogs,
      category,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalBlogs,
        limit: limitNum,
      },
      message: `Blogs in category '${category}' retrieved successfully`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get blogs by author
   * @route   GET /api/v1/blogs/author/:author
   * @access  Public
   */
  getBlogsByAuthor = asyncHandler(async (req, res) => {
    const { author } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [blogs, totalBlogs] = await Promise.all([
      Blog.findByAuthor(author, limitNum).skip(skip),
      Blog.countDocuments({ 
        author: new RegExp(author, 'i'),
        isActive: true,
        isPublished: true,
        status: 'published'
      })
    ]);

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: `No blogs found by author: ${author}`,
        },
        timestamp: new Date().toISOString(),
      });
    }

    const totalPages = Math.ceil(totalBlogs / limitNum);

    res.status(200).json({
      success: true,
      data: blogs,
      author,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalBlogs,
        limit: limitNum,
      },
      message: `Blogs by author '${author}' retrieved successfully`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get blogs by tag
   * @route   GET /api/v1/blogs/tag/:tag
   * @access  Public
   */
  getBlogsByTag = asyncHandler(async (req, res) => {
    const { tag } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [blogs, totalBlogs] = await Promise.all([
      Blog.findByTag(tag, limitNum).skip(skip),
      Blog.countDocuments({ 
        tags: { $in: [tag.toLowerCase()] },
        isActive: true,
        isPublished: true,
        status: 'published'
      })
    ]);

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: `No blogs found with tag: ${tag}`,
        },
        timestamp: new Date().toISOString(),
      });
    }

    const totalPages = Math.ceil(totalBlogs / limitNum);

    res.status(200).json({
      success: true,
      data: blogs,
      tag,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalBlogs,
        limit: limitNum,
      },
      message: `Blogs with tag '${tag}' retrieved successfully`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get single blog by ID or slug
   * @route   GET /api/v1/blogs/:identifier
   * @access  Public
   */
  getBlog = asyncHandler(async (req, res) => {
    const { identifier } = req.params;
    
    // Try to find by ID first, then by slug
    let blog;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      // Valid ObjectId
      blog = await Blog.findById(identifier)
        .populate('relatedPosts', 'title slug excerpt image publishDate category');
    } else {
      // Assume it's a slug
      blog = await Blog.findOne({ slug: identifier })
        .populate('relatedPosts', 'title slug excerpt image publishDate category');
    }

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    if (!blog.isActive || !blog.isPublished || blog.status !== 'published') {
      throw new AppError('Blog is not available', 404);
    }

    // Increment views (fire and forget)
    blog.incrementViews().catch(err => 
      console.error('Error incrementing blog views:', err)
    );

    res.status(200).json({
      success: true,
      data: blog,
      message: 'Blog retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Search blogs
   * @route   GET /api/v1/blogs/search
   * @access  Public
   */
  searchBlogs = asyncHandler(async (req, res) => {
    const {
      q: query,
      category,
      author,
      tags,
      difficulty,
      format,
      minReadTime,
      maxReadTime,
      page = 1,
      limit = config.pagination.defaultLimit,
      sortBy = 'relevance'
    } = req.query;

    if (!query || query.trim().length < 2) {
      throw new AppError('Search query must be at least 2 characters long', 400);
    }

    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), config.pagination.maxLimit);
    const skip = (pageNum - 1) * limitNum;

    const searchOptions = {
      category,
      author,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',')) : undefined,
      difficulty,
      format,
      minReadTime: minReadTime ? parseInt(minReadTime) : undefined,
      maxReadTime: maxReadTime ? parseInt(maxReadTime) : undefined,
      limit: limitNum,
      skip,
      sortBy
    };

    const [blogs, totalBlogs] = await Promise.all([
      Blog.searchBlogs(query.trim(), searchOptions),
      Blog.countDocuments({
        $text: { $search: query.trim() },
        isActive: true,
        isPublished: true,
        status: 'published',
        ...(category && { category: new RegExp(category, 'i') }),
        ...(author && { author: new RegExp(author, 'i') }),
      })
    ]);

    const totalPages = Math.ceil(totalBlogs / limitNum);

    res.status(200).json({
      success: true,
      data: blogs,
      searchQuery: query,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalBlogs,
        limit: limitNum,
      },
      filters: searchOptions,
      message: `Search results for "${query}"`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get blog categories
   * @route   GET /api/v1/blogs/categories
   * @access  Public
   */
  getCategories = asyncHandler(async (req, res) => {
    const categories = await Blog.aggregate([
      {
        $match: { 
          isActive: true, 
          isPublished: true, 
          status: 'published' 
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgViews: { $avg: '$views' },
          avgReadTime: { $avg: '$estimatedReadTime' },
          latestPost: { $max: '$publishDate' },
          posts: { $push: { title: '$title', slug: '$slug', image: '$image' } }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          avgViews: { $round: ['$avgViews', 0] },
          avgReadTime: { $round: ['$avgReadTime', 0] },
          latestPost: 1,
          samplePosts: { $slice: ['$posts', 3] },
          _id: 0
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length,
      message: 'Blog categories retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get blog tags
   * @route   GET /api/v1/blogs/tags
   * @access  Public
   */
  getTags = asyncHandler(async (req, res) => {
    const { limit = 50 } = req.query;

    const tags = await Blog.aggregate([
      {
        $match: { 
          isActive: true, 
          isPublished: true, 
          status: 'published' 
        }
      },
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
          avgViews: { $avg: '$views' }
        }
      },
      {
        $project: {
          tag: '$_id',
          count: 1,
          avgViews: { $round: ['$avgViews', 0] },
          _id: 0
        }
      },
      { $sort: { count: -1, avgViews: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.status(200).json({
      success: true,
      data: tags,
      count: tags.length,
      message: 'Blog tags retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get blog statistics
   * @route   GET /api/v1/blogs/stats
   * @access  Public
   */
  getBlogStats = asyncHandler(async (req, res) => {
    const stats = await Blog.aggregate([
      {
        $match: { 
          isActive: true, 
          isPublished: true, 
          status: 'published' 
        }
      },
      {
        $group: {
          _id: null,
          totalBlogs: { $sum: 1 },
          featuredBlogs: { $sum: { $cond: ['$featured', 1, 0] } },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalShares: { $sum: '$shares' },
          totalComments: { $sum: '$comments' },
          avgViews: { $avg: '$views' },
          avgReadTime: { $avg: '$estimatedReadTime' },
          totalWordCount: { $sum: '$wordCount' },
          categories: { $addToSet: '$category' },
          authors: { $addToSet: '$author' },
          formats: { $addToSet: '$format' },
        }
      },
      {
        $project: {
          _id: 0,
          totalBlogs: 1,
          featuredBlogs: 1,
          totalViews: 1,
          totalLikes: 1,
          totalShares: 1,
          totalComments: 1,
          avgViews: { $round: ['$avgViews', 0] },
          avgReadTime: { $round: ['$avgReadTime', 0] },
          totalWordCount: 1,
          categoriesCount: { $size: '$categories' },
          authorsCount: { $size: '$authors' },
          formatsCount: { $size: '$formats' },
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalBlogs: 0,
        featuredBlogs: 0,
        totalViews: 0,
        totalLikes: 0,
        totalShares: 0,
        totalComments: 0,
        avgViews: 0,
        avgReadTime: 0,
        totalWordCount: 0,
        categoriesCount: 0,
        authorsCount: 0,
        formatsCount: 0,
      },
      message: 'Blog statistics retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Track blog engagement
   * @route   POST /api/v1/blogs/:identifier/track
   * @access  Public
   */
  trackEngagement = asyncHandler(async (req, res) => {
    const { identifier } = req.params;
    const { action, progress, userId } = req.body;

    let blog;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(identifier);
    } else {
      blog = await Blog.findOne({ slug: identifier });
    }

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    switch (action) {
      case 'view':
        await blog.incrementViews();
        break;
      case 'like':
        await blog.incrementLikes();
        break;
      case 'share':
        await blog.incrementShares();
        break;
      case 'read':
        if (progress && userId) {
          await blog.updateReadingProgress(userId, progress);
        }
        break;
      default:
        throw new AppError('Invalid action', 400);
    }

    res.status(200).json({
      success: true,
      message: `${action} tracked successfully`,
      timestamp: new Date().toISOString(),
    });
  });

  // Admin-only methods would go here (create, update, delete)
  // These will be implemented when we add authentication
}

export default new BlogController();
