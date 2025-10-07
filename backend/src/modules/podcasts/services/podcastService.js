import Podcast from '../models/Podcast.js';
import { AppError } from '../../../shared/middleware/errorHandler.js';

/**
 * Podcast Service
 * Contains business logic for podcast operations
 */
class PodcastService {
  /**
   * Get podcasts with advanced filtering and aggregation
   */
  async getFilteredPodcasts(filters, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'latest',
      includeInactive = false
    } = options;

    const pipeline = [];

    // Match stage
    const matchStage = {
      ...(includeInactive ? {} : { isActive: true, isPublished: true }),
      ...filters
    };
    pipeline.push({ $match: matchStage });

    // Add computed fields
    pipeline.push({
      $addFields: {
        durationInSeconds: {
          $add: [
            { $multiply: [{ $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 0] } }, 60] },
            { $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 1] } }
          ]
        },
        engagementScore: {
          $add: [
            { $multiply: ['$views', 0.3] },
            { $multiply: ['$likes', 0.4] },
            { $multiply: ['$downloads', 0.2] },
            { $multiply: ['$completionRate', 0.1] }
          ]
        }
      }
    });

    // Sort stage
    let sortStage = {};
    switch (sortBy) {
      case 'latest':
        sortStage = { publishDate: -1, episodeNumber: -1 };
        break;
      case 'oldest':
        sortStage = { publishDate: 1, episodeNumber: 1 };
        break;
      case 'popular':
        sortStage = { views: -1, likes: -1 };
        break;
      case 'episode':
        sortStage = { episodeNumber: -1 };
        break;
      case 'duration-short':
        sortStage = { durationInSeconds: 1 };
        break;
      case 'duration-long':
        sortStage = { durationInSeconds: -1 };
        break;
      case 'engagement':
        sortStage = { engagementScore: -1 };
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
    const podcasts = await Podcast.aggregate(pipeline);

    // Get total count for pagination
    const countPipeline = [
      { $match: matchStage },
      { $count: 'total' }
    ];
    const countResult = await Podcast.aggregate(countPipeline);
    const totalPodcasts = countResult.length > 0 ? countResult[0].total : 0;

    return {
      podcasts,
      totalPodcasts,
      totalPages: Math.ceil(totalPodcasts / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalPodcasts / limit),
      hasPrevPage: page > 1
    };
  }

  /**
   * Get podcast recommendations based on a podcast
   */
  async getRecommendations(podcastId, limit = 5) {
    const podcast = await Podcast.findById(podcastId);
    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    // Find similar podcasts based on category, tags, and host
    const recommendations = await Podcast.aggregate([
      {
        $match: {
          _id: { $ne: podcast._id },
          isActive: true,
          isPublished: true,
          $or: [
            { category: podcast.category },
            { tags: { $in: podcast.tags } },
            { host: podcast.host }
          ]
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              { $cond: [{ $eq: ['$category', podcast.category] }, 3, 0] },
              { $cond: [{ $eq: ['$host', podcast.host] }, 2, 0] },
              { $size: { $setIntersection: ['$tags', podcast.tags] } },
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
          host: 1,
          category: 1,
          duration: 1,
          views: 1,
          coverImage: 1,
          slug: 1,
          episodeNumber: 1,
          publishDate: 1,
          score: 1
        }
      }
    ]);

    return recommendations;
  }

  /**
   * Get trending podcasts based on recent engagement
   */
  async getTrendingPodcasts(limit = 10, days = 30) {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const trendingPodcasts = await Podcast.aggregate([
      {
        $match: {
          isActive: true,
          isPublished: true,
          publishDate: { $gte: dateThreshold }
        }
      },
      {
        $addFields: {
          trendingScore: {
            $add: [
              { $multiply: ['$views', 0.4] },
              { $multiply: ['$likes', 3] },
              { $multiply: ['$downloads', 2] },
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
          host: 1,
          category: 1,
          duration: 1,
          views: 1,
          likes: 1,
          coverImage: 1,
          slug: 1,
          episodeNumber: 1,
          publishDate: 1,
          trendingScore: 1
        }
      }
    ]);

    return trendingPodcasts;
  }

  /**
   * Get podcasts by multiple categories
   */
  async getPodcastsByCategories(categories, limit = 5) {
    const podcastsByCategory = {};

    for (const category of categories) {
      const podcasts = await Podcast.findByCategory(category, limit);
      podcastsByCategory[category] = podcasts;
    }

    return podcastsByCategory;
  }

  /**
   * Get podcast series information
   */
  async getPodcastSeries(seriesName, limit = 20) {
    const series = await Podcast.aggregate([
      {
        $match: {
          'series.name': new RegExp(seriesName, 'i'),
          isActive: true,
          isPublished: true
        }
      },
      {
        $sort: { 'series.season': 1, 'series.episodeInSeries': 1 }
      },
      { $limit: limit },
      {
        $group: {
          _id: '$series.season',
          episodes: { $push: '$$ROOT' },
          episodeCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return series;
  }

  /**
   * Get detailed podcast statistics for analytics
   */
  async getDetailedStats() {
    const stats = await Podcast.aggregate([
      {
        $facet: {
          overview: [
            {
              $group: {
                _id: null,
                totalPodcasts: { $sum: 1 },
                activePodcasts: { $sum: { $cond: ['$isActive', 1, 0] } },
                featuredPodcasts: { $sum: { $cond: ['$featured', 1, 0] } },
                totalViews: { $sum: '$views' },
                totalLikes: { $sum: '$likes' },
                totalDownloads: { $sum: '$downloads' },
                avgViews: { $avg: '$views' },
                avgLikes: { $avg: '$likes' },
                avgCompletionRate: { $avg: '$completionRate' }
              }
            }
          ],
          byCategory: [
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 },
                avgViews: { $avg: '$views' },
                totalViews: { $sum: '$views' },
                avgDuration: { $avg: '$durationInSeconds' }
              }
            },
            { $sort: { totalViews: -1 } }
          ],
          byHost: [
            {
              $group: {
                _id: '$host',
                count: { $sum: 1 },
                avgViews: { $avg: '$views' },
                totalViews: { $sum: '$views' },
                totalLikes: { $sum: '$likes' }
              }
            },
            { $sort: { totalViews: -1 } },
            { $limit: 10 }
          ],
          engagementMetrics: [
            {
              $group: {
                _id: null,
                avgListenTime: { $avg: '$averageListenTime' },
                avgCompletionRate: { $avg: '$completionRate' },
                totalEngagementScore: { $sum: {
                  $add: [
                    { $multiply: ['$views', 0.3] },
                    { $multiply: ['$likes', 0.4] },
                    { $multiply: ['$downloads', 0.2] },
                    { $multiply: ['$completionRate', 0.1] }
                  ]
                }}
              }
            }
          ],
          recentPodcasts: [
            { $sort: { publishDate: -1 } },
            { $limit: 5 },
            {
              $project: {
                title: 1,
                host: 1,
                category: 1,
                views: 1,
                likes: 1,
                publishDate: 1,
                episodeNumber: 1
              }
            }
          ],
          topPerforming: [
            { $sort: { views: -1, likes: -1 } },
            { $limit: 10 },
            {
              $project: {
                title: 1,
                host: 1,
                views: 1,
                likes: 1,
                downloads: 1,
                completionRate: 1
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
      host,
      minDuration,
      maxDuration,
      tags,
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
      isPublished: true
    };

    if (category) matchFilters.category = new RegExp(category, 'i');
    if (host) matchFilters.host = new RegExp(host, 'i');
    if (tags && tags.length > 0) matchFilters.tags = { $in: tags };
    if (minViews) matchFilters.views = { $gte: minViews };
    if (featured !== undefined) matchFilters.featured = featured;
    
    if (publishedAfter || publishedBefore) {
      matchFilters.publishDate = {};
      if (publishedAfter) matchFilters.publishDate.$gte = new Date(publishedAfter);
      if (publishedBefore) matchFilters.publishDate.$lte = new Date(publishedBefore);
    }

    pipeline.push({ $match: matchFilters });

    // Duration filtering
    if (minDuration || maxDuration) {
      pipeline.push({
        $addFields: {
          durationInSeconds: {
            $add: [
              { $multiply: [{ $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 0] } }, 60] },
              { $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 1] } }
            ]
          }
        }
      });
      
      const durationFilter = {};
      if (minDuration) durationFilter.$gte = minDuration * 60; // Convert minutes to seconds
      if (maxDuration) durationFilter.$lte = maxDuration * 60;
      
      pipeline.push({
        $match: {
          durationInSeconds: durationFilter
        }
      });
    }

    // Sorting
    let sortStage = {};
    switch (sortBy) {
      case 'relevance':
        sortStage = query ? { searchScore: { $meta: 'textScore' } } : { views: -1, publishDate: -1 };
        break;
      case 'latest':
        sortStage = { publishDate: -1, episodeNumber: -1 };
        break;
      case 'oldest':
        sortStage = { publishDate: 1, episodeNumber: 1 };
        break;
      case 'popular':
        sortStage = { views: -1, likes: -1 };
        break;
      case 'episode':
        sortStage = { episodeNumber: -1 };
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
    const podcasts = await Podcast.aggregate(pipeline);

    // Get total count
    const countPipeline = pipeline.slice(0, -2); // Remove skip and limit
    countPipeline.push({ $count: 'total' });
    const countResult = await Podcast.aggregate(countPipeline);
    const totalPodcasts = countResult.length > 0 ? countResult[0].total : 0;

    return {
      podcasts,
      totalPodcasts,
      totalPages: Math.ceil(totalPodcasts / limit),
      currentPage: page,
      query,
      filters
    };
  }

  /**
   * Get popular search terms and categories for podcasts
   */
  async getPopularSearchData() {
    const popularCategories = await Podcast.aggregate([
      {
        $match: { isActive: true, isPublished: true }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgViews: { $avg: '$views' },
          totalViews: { $sum: '$views' },
          avgDuration: { $avg: '$durationInSeconds' }
        }
      },
      { $sort: { totalViews: -1, count: -1 } },
      { $limit: 10 }
    ]);

    const popularTags = await Podcast.aggregate([
      {
        $match: { isActive: true, isPublished: true }
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

    const popularHosts = await Podcast.aggregate([
      {
        $match: { isActive: true, isPublished: true }
      },
      {
        $group: {
          _id: '$host',
          episodeCount: { $sum: 1 },
          avgViews: { $avg: '$views' },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' }
        }
      },
      { $sort: { totalViews: -1, episodeCount: -1 } },
      { $limit: 10 }
    ]);

    return {
      categories: popularCategories,
      tags: popularTags,
      hosts: popularHosts
    };
  }

  /**
   * Get podcast listening analytics
   */
  async getListeningAnalytics(timeframe = '30d') {
    const days = parseInt(timeframe.replace('d', ''));
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const analytics = await Podcast.aggregate([
      {
        $match: {
          publishDate: { $gte: dateThreshold },
          isActive: true,
          isPublished: true
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
          episodesPublished: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalDownloads: { $sum: '$downloads' },
          avgCompletionRate: { $avg: '$completionRate' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return analytics;
  }

  /**
   * Generate podcast playlist based on user preferences
   */
  async generatePlaylist(preferences = {}, limit = 10) {
    const {
      categories = [],
      hosts = [],
      minDuration,
      maxDuration,
      excludeListened = []
    } = preferences;

    const pipeline = [
      {
        $match: {
          isActive: true,
          isPublished: true,
          ...(excludeListened.length > 0 && { _id: { $nin: excludeListened } })
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
    
    if (hosts.length > 0) {
      scoreConditions.push({
        $cond: [{ $in: ['$host', hosts] }, 2, 0]
      });
    }

    // Add engagement score
    scoreConditions.push({
      $multiply: [
        { $add: [
          { $multiply: ['$views', 0.3] },
          { $multiply: ['$likes', 0.4] },
          { $multiply: ['$completionRate', 0.3] }
        ]},
        0.01
      ]
    });

    if (scoreConditions.length > 0) {
      pipeline.push({
        $addFields: {
          playlistScore: { $add: scoreConditions }
        }
      });
      
      pipeline.push({ $sort: { playlistScore: -1, publishDate: -1 } });
    } else {
      pipeline.push({ $sort: { views: -1, publishDate: -1 } });
    }

    // Duration filtering
    if (minDuration || maxDuration) {
      pipeline.push({
        $addFields: {
          durationInSeconds: {
            $add: [
              { $multiply: [{ $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 0] } }, 60] },
              { $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 1] } }
            ]
          }
        }
      });
      
      const durationFilter = {};
      if (minDuration) durationFilter.$gte = minDuration * 60;
      if (maxDuration) durationFilter.$lte = maxDuration * 60;
      
      pipeline.push({
        $match: { durationInSeconds: durationFilter }
      });
    }

    pipeline.push({ $limit: limit });

    const playlist = await Podcast.aggregate(pipeline);
    return playlist;
  }
}

export default new PodcastService();
