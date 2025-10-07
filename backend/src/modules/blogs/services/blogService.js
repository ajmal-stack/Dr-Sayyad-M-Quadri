import Blog from '../models/Blog.js';
import { AppError } from '../../../shared/middleware/errorHandler.js';

/**
 * Blog Service
 * Contains business logic for blog operations
 */
class BlogService {
  /**
   * Get blogs with advanced filtering and aggregation
   */
  async getFilteredBlogs(filters, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'latest',
      includeInactive = false
    } = options;

    const pipeline = [];

    // Match stage
    const matchStage = {
      ...(includeInactive ? {} : { isActive: true, isPublished: true, status: 'published' }),
      ...filters
    };
    pipeline.push({ $match: matchStage });

    // Add computed fields
    pipeline.push({
      $addFields: {
        engagementScore: {
          $add: [
            { $multiply: ['$views', 0.3] },
            { $multiply: ['$likes', 0.4] },
            { $multiply: ['$shares', 0.2] },
            { $multiply: ['$comments', 0.1] }
          ]
        },
        recencyScore: {
          $divide: [
            { $subtract: ['$publishDate', new Date('2020-01-01')] },
            { $subtract: [new Date(), new Date('2020-01-01')] }
          ]
        }
      }
    });

    // Sort stage
    let sortStage = {};
    switch (sortBy) {
      case 'latest':
        sortStage = { publishDate: -1 };
        break;
      case 'oldest':
        sortStage = { publishDate: 1 };
        break;
      case 'popular':
        sortStage = { views: -1, likes: -1 };
        break;
      case 'trending':
        sortStage = { engagementScore: -1, recencyScore: -1 };
        break;
      case 'readTime':
        sortStage = { estimatedReadTime: 1 };
        break;
      case 'alphabetical':
        sortStage = { title: 1 };
        break;
      default:
        sortStage = { publishDate: -1, views: -1 };
        break;
    }
    pipeline.push({ $sort: sortStage });

    // Pagination
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Execute aggregation
    const blogs = await Blog.aggregate(pipeline);

    // Get total count for pagination
    const countPipeline = [
      { $match: matchStage },
      { $count: 'total' }
    ];
    const countResult = await Blog.aggregate(countPipeline);
    const totalBlogs = countResult.length > 0 ? countResult[0].total : 0;

    return {
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalBlogs / limit),
      hasPrevPage: page > 1
    };
  }

  /**
   * Get blog recommendations based on a blog
   */
  async getRecommendations(blogId, limit = 5) {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    // Find similar blogs based on category, tags, and author
    const recommendations = await Blog.aggregate([
      {
        $match: {
          _id: { $ne: blog._id },
          isActive: true,
          isPublished: true,
          status: 'published',
          $or: [
            { category: blog.category },
            { tags: { $in: blog.tags } },
            { author: blog.author }
          ]
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              { $cond: [{ $eq: ['$category', blog.category] }, 3, 0] },
              { $cond: [{ $eq: ['$author', blog.author] }, 2, 0] },
              { $size: { $setIntersection: ['$tags', blog.tags] } },
              { $multiply: ['$views', 0.001] } // Small weight for popularity
            ]
          }
        }
      },
      { $sort: { score: -1, views: -1, publishDate: -1 } },
      { $limit: limit },
      {
        $project: {
          title: 1,
          author: 1,
          category: 1,
          excerpt: 1,
          readTime: 1,
          views: 1,
          image: 1,
          slug: 1,
          publishDate: 1,
          score: 1
        }
      }
    ]);

    return recommendations;
  }

  /**
   * Get trending blogs based on recent engagement
   */
  async getTrendingBlogs(limit = 10, days = 7) {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const trendingBlogs = await Blog.aggregate([
      {
        $match: {
          isActive: true,
          isPublished: true,
          status: 'published',
          publishDate: { $gte: dateThreshold }
        }
      },
      {
        $addFields: {
          trendingScore: {
            $add: [
              { $multiply: ['$views', 0.4] },
              { $multiply: ['$likes', 3] },
              { $multiply: ['$shares', 5] },
              { $multiply: ['$comments', 2] },
              { $cond: ['$featured', 20, 0] },
              // Recency boost
              {
                $multiply: [
                  { $divide: [
                    { $subtract: ['$publishDate', dateThreshold] },
                    { $subtract: [new Date(), dateThreshold] }
                  ]},
                  10
                ]
              }
            ]
          }
        }
      },
      { $sort: { trendingScore: -1, publishDate: -1 } },
      { $limit: limit },
      {
        $project: {
          title: 1,
          author: 1,
          category: 1,
          excerpt: 1,
          readTime: 1,
          views: 1,
          likes: 1,
          shares: 1,
          image: 1,
          slug: 1,
          publishDate: 1,
          trendingScore: 1
        }
      }
    ]);

    return trendingBlogs;
  }

  /**
   * Get blogs by multiple categories
   */
  async getBlogsByCategories(categories, limit = 5) {
    const blogsByCategory = {};

    for (const category of categories) {
      const blogs = await Blog.findByCategory(category, limit);
      blogsByCategory[category] = blogs;
    }

    return blogsByCategory;
  }

  /**
   * Get detailed blog statistics for analytics
   */
  async getDetailedStats() {
    const stats = await Blog.aggregate([
      {
        $facet: {
          overview: [
            {
              $group: {
                _id: null,
                totalBlogs: { $sum: 1 },
                publishedBlogs: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } },
                draftBlogs: { $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] } },
                featuredBlogs: { $sum: { $cond: ['$featured', 1, 0] } },
                totalViews: { $sum: '$views' },
                totalLikes: { $sum: '$likes' },
                totalShares: { $sum: '$shares' },
                totalComments: { $sum: '$comments' },
                avgViews: { $avg: '$views' },
                avgReadTime: { $avg: '$estimatedReadTime' },
                totalWordCount: { $sum: '$wordCount' }
              }
            }
          ],
          byCategory: [
            {
              $match: { status: 'published', isActive: true, isPublished: true }
            },
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 },
                avgViews: { $avg: '$views' },
                totalViews: { $sum: '$views' },
                avgReadTime: { $avg: '$estimatedReadTime' }
              }
            },
            { $sort: { totalViews: -1 } }
          ],
          byAuthor: [
            {
              $match: { status: 'published', isActive: true, isPublished: true }
            },
            {
              $group: {
                _id: '$author',
                count: { $sum: 1 },
                avgViews: { $avg: '$views' },
                totalViews: { $sum: '$views' },
                totalLikes: { $sum: '$likes' }
              }
            },
            { $sort: { totalViews: -1 } },
            { $limit: 10 }
          ],
          byFormat: [
            {
              $match: { status: 'published', isActive: true, isPublished: true }
            },
            {
              $group: {
                _id: '$format',
                count: { $sum: 1 },
                avgViews: { $avg: '$views' },
                avgReadTime: { $avg: '$estimatedReadTime' }
              }
            },
            { $sort: { count: -1 } }
          ],
          engagementMetrics: [
            {
              $match: { status: 'published', isActive: true, isPublished: true }
            },
            {
              $group: {
                _id: null,
                avgEngagementScore: { $avg: {
                  $add: [
                    { $multiply: ['$views', 0.3] },
                    { $multiply: ['$likes', 0.4] },
                    { $multiply: ['$shares', 0.2] },
                    { $multiply: ['$comments', 0.1] }
                  ]
                }},
                totalEngagement: { $sum: {
                  $add: ['$views', '$likes', '$shares', '$comments']
                }}
              }
            }
          ],
          recentBlogs: [
            {
              $match: { status: 'published', isActive: true, isPublished: true }
            },
            { $sort: { publishDate: -1 } },
            { $limit: 5 },
            {
              $project: {
                title: 1,
                author: 1,
                category: 1,
                views: 1,
                likes: 1,
                publishDate: 1,
                readTime: 1
              }
            }
          ],
          topPerforming: [
            {
              $match: { status: 'published', isActive: true, isPublished: true }
            },
            { $sort: { views: -1, likes: -1 } },
            { $limit: 10 },
            {
              $project: {
                title: 1,
                author: 1,
                views: 1,
                likes: 1,
                shares: 1,
                comments: 1,
                readTime: 1
              }
            }
          ]
        }
      }
    ]);

    return stats[0];
  }

  /**
   * Advanced search with multiple filters and facets
   */
  async advancedSearch(query, filters = {}) {
    const {
      category,
      author,
      tags,
      difficulty,
      format,
      minReadTime,
      maxReadTime,
      publishedAfter,
      publishedBefore,
      minViews,
      featured,
      page = 1,
      limit = 20,
      sortBy = 'relevance'
    } = filters;

    const pipeline = [];

    // Text search stage
    if (query) {
      pipeline.push({
        $match: {
          $text: { $search: query }
        }
      });
      
      pipeline.push({
        $addFields: {
          searchScore: { $meta: 'textScore' }
        }
      });
    }

    // Additional filters
    const matchFilters = {
      isActive: true,
      isPublished: true,
      status: 'published'
    };

    if (category) matchFilters.category = new RegExp(category, 'i');
    if (author) matchFilters.author = new RegExp(author, 'i');
    if (tags && tags.length > 0) matchFilters.tags = { $in: tags.map(tag => tag.toLowerCase()) };
    if (difficulty) matchFilters.difficulty = difficulty;
    if (format) matchFilters.format = format;
    if (minViews) matchFilters.views = { $gte: minViews };
    if (featured !== undefined) matchFilters.featured = featured;
    
    if (publishedAfter || publishedBefore) {
      matchFilters.publishDate = {};
      if (publishedAfter) matchFilters.publishDate.$gte = new Date(publishedAfter);
      if (publishedBefore) matchFilters.publishDate.$lte = new Date(publishedBefore);
    }

    if (minReadTime || maxReadTime) {
      matchFilters.estimatedReadTime = {};
      if (minReadTime) matchFilters.estimatedReadTime.$gte = minReadTime;
      if (maxReadTime) matchFilters.estimatedReadTime.$lte = maxReadTime;
    }

    pipeline.push({ $match: matchFilters });

    // Sorting
    let sortStage = {};
    switch (sortBy) {
      case 'relevance':
        sortStage = query ? { searchScore: { $meta: 'textScore' } } : { views: -1, publishDate: -1 };
        break;
      case 'latest':
        sortStage = { publishDate: -1 };
        break;
      case 'oldest':
        sortStage = { publishDate: 1 };
        break;
      case 'popular':
        sortStage = { views: -1, likes: -1 };
        break;
      case 'trending':
        sortStage = { engagementScore: -1, publishDate: -1 };
        break;
      case 'readTime':
        sortStage = { estimatedReadTime: 1 };
        break;
      default:
        sortStage = { views: -1, publishDate: -1 };
    }

    pipeline.push({ $sort: sortStage });

    // Pagination
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Execute search
    const blogs = await Blog.aggregate(pipeline);

    // Get total count
    const countPipeline = pipeline.slice(0, -2); // Remove skip and limit
    countPipeline.push({ $count: 'total' });
    const countResult = await Blog.aggregate(countPipeline);
    const totalBlogs = countResult.length > 0 ? countResult[0].total : 0;

    return {
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      query,
      filters
    };
  }

  /**
   * Get popular search terms and categories for blogs
   */
  async getPopularSearchData() {
    const popularCategories = await Blog.aggregate([
      {
        $match: { isActive: true, isPublished: true, status: 'published' }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgViews: { $avg: '$views' },
          totalViews: { $sum: '$views' },
          avgReadTime: { $avg: '$estimatedReadTime' }
        }
      },
      { $sort: { totalViews: -1, count: -1 } },
      { $limit: 10 }
    ]);

    const popularTags = await Blog.aggregate([
      {
        $match: { isActive: true, isPublished: true, status: 'published' }
      },
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
          avgViews: { $avg: '$views' }
        }
      },
      { $sort: { count: -1, avgViews: -1 } },
      { $limit: 20 }
    ]);

    const popularAuthors = await Blog.aggregate([
      {
        $match: { isActive: true, isPublished: true, status: 'published' }
      },
      {
        $group: {
          _id: '$author',
          blogCount: { $sum: 1 },
          avgViews: { $avg: '$views' },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' }
        }
      },
      { $sort: { totalViews: -1, blogCount: -1 } },
      { $limit: 10 }
    ]);

    return {
      categories: popularCategories,
      tags: popularTags,
      authors: popularAuthors
    };
  }

  /**
   * Get reading analytics
   */
  async getReadingAnalytics(timeframe = '30d') {
    const days = parseInt(timeframe.replace('d', ''));
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const analytics = await Blog.aggregate([
      {
        $match: {
          publishDate: { $gte: dateThreshold },
          isActive: true,
          isPublished: true,
          status: 'published'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$publishDate'
            }
          },
          blogsPublished: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalShares: { $sum: '$shares' },
          avgReadTime: { $avg: '$estimatedReadTime' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return analytics;
  }

  /**
   * Generate content recommendations based on user reading history
   */
  async generateContentRecommendations(userPreferences = {}, limit = 10) {
    const {
      categories = [],
      authors = [],
      tags = [],
      difficulty = 'beginner',
      excludeRead = []
    } = userPreferences;

    const pipeline = [
      {
        $match: {
          isActive: true,
          isPublished: true,
          status: 'published',
          ...(excludeRead.length > 0 && { _id: { $nin: excludeRead } })
        }
      }
    ];

    // Add scoring based on preferences
    const scoreConditions = [];
    
    if (categories.length > 0) {
      scoreConditions.push({
        $cond: [{ $in: ['$category', categories] }, 3, 0]
      });
    }
    
    if (authors.length > 0) {
      scoreConditions.push({
        $cond: [{ $in: ['$author', authors] }, 2, 0]
      });
    }
    
    if (tags.length > 0) {
      scoreConditions.push({
        $size: { $setIntersection: ['$tags', tags] }
      });
    }

    // Difficulty matching
    scoreConditions.push({
      $cond: [{ $eq: ['$difficulty', difficulty] }, 1, 0]
    });

    // Add engagement score
    scoreConditions.push({
      $multiply: [
        { $add: [
          { $multiply: ['$views', 0.3] },
          { $multiply: ['$likes', 0.4] },
          { $multiply: ['$shares', 0.3] }
        ]},
        0.01
      ]
    });

    if (scoreConditions.length > 0) {
      pipeline.push({
        $addFields: {
          recommendationScore: { $add: scoreConditions }
        }
      });
      
      pipeline.push({ $sort: { recommendationScore: -1, publishDate: -1 } });
    } else {
      pipeline.push({ $sort: { views: -1, publishDate: -1 } });
    }

    pipeline.push({ $limit: limit });

    const recommendations = await Blog.aggregate(pipeline);
    return recommendations;
  }

  /**
   * Get content performance metrics
   */
  async getContentPerformanceMetrics(blogId) {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    // Calculate performance metrics
    const metrics = {
      views: blog.views,
      likes: blog.likes,
      shares: blog.shares,
      comments: blog.comments,
      engagementRate: blog.views > 0 ? ((blog.likes + blog.shares + blog.comments) / blog.views) * 100 : 0,
      readabilityScore: blog.readabilityScore,
      estimatedReadTime: blog.estimatedReadTime,
      wordCount: blog.wordCount,
      averageReadTime: blog.averageReadTime,
      bounceRate: blog.bounceRate
    };

    // Get category average for comparison
    const categoryAvg = await Blog.aggregate([
      {
        $match: {
          category: blog.category,
          isActive: true,
          isPublished: true,
          status: 'published',
          _id: { $ne: blog._id }
        }
      },
      {
        $group: {
          _id: null,
          avgViews: { $avg: '$views' },
          avgLikes: { $avg: '$likes' },
          avgShares: { $avg: '$shares' },
          avgComments: { $avg: '$comments' }
        }
      }
    ]);

    if (categoryAvg.length > 0) {
      metrics.categoryComparison = {
        viewsVsAvg: blog.views / categoryAvg[0].avgViews,
        likesVsAvg: blog.likes / categoryAvg[0].avgLikes,
        sharesVsAvg: blog.shares / categoryAvg[0].avgShares,
        commentsVsAvg: blog.comments / categoryAvg[0].avgComments
      };
    }

    return metrics;
  }
}

export default new BlogService();
