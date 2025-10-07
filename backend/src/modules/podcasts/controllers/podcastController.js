import mongoose from 'mongoose';
import Podcast from '../models/Podcast.js';
import { asyncHandler, AppError } from '../../../shared/middleware/errorHandler.js';
import { config } from '../../../config/index.js';

/**
 * Podcast Controller
 * Handles all podcast-related operations
 */
class PodcastController {
  /**
   * @desc    Get all podcasts with filtering, sorting, and pagination
   * @route   GET /api/v1/podcasts
   * @access  Public
   */
  getAllPodcasts = asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = config.pagination.defaultLimit,
      category,
      host,
      featured,
      minDuration,
      maxDuration,
      tags,
      search,
      sortBy = 'latest',
      isActive = true,
      isPublished = true,
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (isActive !== undefined) filter.isActive = isActive === 'true' || isActive === true;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true' || isPublished === true;
    if (category) filter.category = new RegExp(category, 'i');
    if (host) filter.host = new RegExp(host, 'i');
    if (featured !== undefined) filter.featured = featured === 'true';
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',');
      filter.tags = { $in: tagArray.map(tag => tag.trim().toLowerCase()) };
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Duration filtering (requires aggregation)
    let pipeline = [{ $match: filter }];

    if (minDuration || maxDuration) {
      pipeline.push({
        $addFields: {
          durationSeconds: {
            $add: [
              { $multiply: [{ $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 0] } }, 60] },
              { $toInt: { $arrayElemAt: [{ $split: ['$duration', ':'] }, 1] } }
            ]
          }
        }
      });

      const durationFilter = {};
      if (minDuration) durationFilter.$gte = parseInt(minDuration) * 60; // Convert minutes to seconds
      if (maxDuration) durationFilter.$lte = parseInt(maxDuration) * 60;
      
      if (Object.keys(durationFilter).length > 0) {
        pipeline.push({ $match: { durationSeconds: durationFilter } });
      }
    }

    // Sorting options
    let sortOptions = {};
    switch (sortBy) {
      case 'latest':
        sortOptions = { publishDate: -1, episodeNumber: -1 };
        break;
      case 'oldest':
        sortOptions = { publishDate: 1, episodeNumber: 1 };
        break;
      case 'popular':
        sortOptions = { views: -1, likes: -1 };
        break;
      case 'episode':
        sortOptions = { episodeNumber: -1 };
        break;
      case 'duration-short':
        sortOptions = { durationSeconds: 1 };
        break;
      case 'duration-long':
        sortOptions = { durationSeconds: -1 };
        break;
      case 'relevance':
      default:
        sortOptions = search 
          ? { score: { $meta: 'textScore' }, publishDate: -1 }
          : { publishDate: -1, views: -1 };
        break;
    }

    pipeline.push({ $sort: sortOptions });

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), config.pagination.maxLimit);
    const skip = (pageNum - 1) * limitNum;

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limitNum });

    // Execute aggregation
    const [podcasts, totalPodcasts] = await Promise.all([
      Podcast.aggregate(pipeline),
      Podcast.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalPodcasts / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.status(200).json({
      success: true,
      data: podcasts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalPodcasts,
        limit: limitNum,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? pageNum + 1 : null,
        prevPage: hasPrevPage ? pageNum - 1 : null,
      },
      filters: {
        category,
        host,
        featured,
        minDuration,
        maxDuration,
        tags,
        search,
        sortBy,
      },
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get featured podcasts
   * @route   GET /api/v1/podcasts/featured
   * @access  Public
   */
  getFeaturedPodcasts = asyncHandler(async (req, res) => {
    const { limit = 5 } = req.query;
    
    const podcasts = await Podcast.findFeatured(parseInt(limit));

    res.status(200).json({
      success: true,
      data: podcasts,
      count: podcasts.length,
      message: 'Featured podcasts retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get latest podcasts
   * @route   GET /api/v1/podcasts/latest
   * @access  Public
   */
  getLatestPodcasts = asyncHandler(async (req, res) => {
    const { limit = 10 } = req.query;
    
    const podcasts = await Podcast.findLatest(parseInt(limit));

    res.status(200).json({
      success: true,
      data: podcasts,
      count: podcasts.length,
      message: 'Latest podcasts retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcasts by category
   * @route   GET /api/v1/podcasts/category/:category
   * @access  Public
   */
  getPodcastsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [podcasts, totalPodcasts] = await Promise.all([
      Podcast.findByCategory(category, limitNum).skip(skip),
      Podcast.countDocuments({ 
        category: new RegExp(category, 'i'),
        isActive: true,
        isPublished: true 
      })
    ]);

    if (podcasts.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: `No podcasts found in category: ${category}`,
        },
        timestamp: new Date().toISOString(),
      });
    }

    const totalPages = Math.ceil(totalPodcasts / limitNum);

    res.status(200).json({
      success: true,
      data: podcasts,
      category,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalPodcasts,
        limit: limitNum,
      },
      message: `Podcasts in category '${category}' retrieved successfully`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcasts by host
   * @route   GET /api/v1/podcasts/host/:host
   * @access  Public
   */
  getPodcastsByHost = asyncHandler(async (req, res) => {
    const { host } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [podcasts, totalPodcasts] = await Promise.all([
      Podcast.findByHost(host, limitNum).skip(skip),
      Podcast.countDocuments({ 
        host: new RegExp(host, 'i'),
        isActive: true,
        isPublished: true 
      })
    ]);

    if (podcasts.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          message: `No podcasts found by host: ${host}`,
        },
        timestamp: new Date().toISOString(),
      });
    }

    const totalPages = Math.ceil(totalPodcasts / limitNum);

    res.status(200).json({
      success: true,
      data: podcasts,
      host,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalPodcasts,
        limit: limitNum,
      },
      message: `Podcasts by host '${host}' retrieved successfully`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get single podcast by ID or slug
   * @route   GET /api/v1/podcasts/:identifier
   * @access  Public
   */
  getPodcast = asyncHandler(async (req, res) => {
    const { identifier } = req.params;
    
    // Try to find by ID first, then by slug
    let podcast;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      // Valid ObjectId
      podcast = await Podcast.findById(identifier)
        .populate('relatedEpisodes', 'title slug coverImage duration category');
    } else {
      // Assume it's a slug
      podcast = await Podcast.findOne({ slug: identifier })
        .populate('relatedEpisodes', 'title slug coverImage duration category');
    }

    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    if (!podcast.isActive || !podcast.isPublished) {
      throw new AppError('Podcast is not available', 404);
    }

    // Increment views (fire and forget)
    podcast.incrementViews().catch(err => 
      console.error('Error incrementing podcast views:', err)
    );

    res.status(200).json({
      success: true,
      data: podcast,
      message: 'Podcast retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcast transcript
   * @route   GET /api/v1/podcasts/:identifier/transcript
   * @access  Public
   */
  getPodcastTranscript = asyncHandler(async (req, res) => {
    const { identifier } = req.params;
    
    let podcast;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      podcast = await Podcast.findById(identifier).select('title transcript');
    } else {
      podcast = await Podcast.findOne({ slug: identifier }).select('title transcript');
    }

    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    if (!podcast.transcript) {
      throw new AppError('Transcript not available for this podcast', 404);
    }

    res.status(200).json({
      success: true,
      data: {
        title: podcast.title,
        transcript: podcast.transcript,
      },
      message: 'Podcast transcript retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Search podcasts
   * @route   GET /api/v1/podcasts/search
   * @access  Public
   */
  searchPodcasts = asyncHandler(async (req, res) => {
    const {
      q: query,
      category,
      host,
      minDuration,
      maxDuration,
      tags,
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
      host,
      minDuration: minDuration ? parseInt(minDuration) : undefined,
      maxDuration: maxDuration ? parseInt(maxDuration) : undefined,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',')) : undefined,
      limit: limitNum,
      skip,
      sortBy
    };

    const [podcasts, totalPodcasts] = await Promise.all([
      Podcast.searchPodcasts(query.trim(), searchOptions),
      Podcast.countDocuments({
        $text: { $search: query.trim() },
        isActive: true,
        isPublished: true,
        ...(category && { category: new RegExp(category, 'i') }),
        ...(host && { host: new RegExp(host, 'i') }),
      })
    ]);

    const totalPages = Math.ceil(totalPodcasts / limitNum);

    res.status(200).json({
      success: true,
      data: podcasts,
      searchQuery: query,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalPodcasts,
        limit: limitNum,
      },
      filters: searchOptions,
      message: `Search results for "${query}"`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcast categories
   * @route   GET /api/v1/podcasts/categories
   * @access  Public
   */
  getCategories = asyncHandler(async (req, res) => {
    const categories = await Podcast.aggregate([
      {
        $match: { isActive: true, isPublished: true }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgViews: { $avg: '$views' },
          totalDuration: { $sum: '$durationInSeconds' },
          latestEpisode: { $max: '$publishDate' },
          episodes: { $push: { title: '$title', slug: '$slug', coverImage: '$coverImage' } }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          avgViews: { $round: ['$avgViews', 0] },
          totalDuration: 1,
          latestEpisode: 1,
          sampleEpisodes: { $slice: ['$episodes', 3] },
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
      message: 'Podcast categories retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcast statistics
   * @route   GET /api/v1/podcasts/stats
   * @access  Public
   */
  getPodcastStats = asyncHandler(async (req, res) => {
    const stats = await Podcast.aggregate([
      {
        $match: { isActive: true, isPublished: true }
      },
      {
        $group: {
          _id: null,
          totalPodcasts: { $sum: 1 },
          featuredPodcasts: { $sum: { $cond: ['$featured', 1, 0] } },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalDownloads: { $sum: '$downloads' },
          avgViews: { $avg: '$views' },
          categories: { $addToSet: '$category' },
          hosts: { $addToSet: '$host' },
          totalDuration: { $sum: '$durationInSeconds' },
        }
      },
      {
        $project: {
          _id: 0,
          totalPodcasts: 1,
          featuredPodcasts: 1,
          totalViews: 1,
          totalLikes: 1,
          totalDownloads: 1,
          avgViews: { $round: ['$avgViews', 0] },
          categoriesCount: { $size: '$categories' },
          hostsCount: { $size: '$hosts' },
          totalDurationHours: { $round: [{ $divide: ['$totalDuration', 3600] }, 1] },
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalPodcasts: 0,
        featuredPodcasts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalDownloads: 0,
        avgViews: 0,
        categoriesCount: 0,
        hostsCount: 0,
        totalDurationHours: 0,
      },
      message: 'Podcast statistics retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Track podcast engagement
   * @route   POST /api/v1/podcasts/:identifier/track
   * @access  Public
   */
  trackEngagement = asyncHandler(async (req, res) => {
    const { identifier } = req.params;
    const { action, listenTime, completed } = req.body;

    let podcast;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      podcast = await Podcast.findById(identifier);
    } else {
      podcast = await Podcast.findOne({ slug: identifier });
    }

    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    switch (action) {
      case 'play':
        await podcast.incrementViews();
        break;
      case 'like':
        await podcast.incrementLikes();
        break;
      case 'download':
        await podcast.incrementDownloads();
        break;
      case 'listen':
        if (listenTime) {
          await podcast.updateEngagement(listenTime, completed);
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

  /**
   * @desc    Create new podcast
   * @route   POST /api/v1/podcasts
   * @access  Admin
   */
  createPodcast = asyncHandler(async (req, res) => {
    try {
      const podcastData = req.body;
      const uploadedFiles = req.uploadedFiles || {};

      // Log the incoming data for debugging
      console.log('Creating podcast with data:', JSON.stringify(podcastData, null, 2));
      console.log('Uploaded files:', uploadedFiles);

      // Check if episode number already exists
      const existingEpisode = await Podcast.findOne({ episodeNumber: podcastData.episodeNumber });
      if (existingEpisode) {
        throw new AppError(`Episode number ${podcastData.episodeNumber} already exists`, 400);
      }

      // Ensure required fields have defaults if not provided
      const processedData = {
        ...podcastData,
        featured: podcastData.featured || false,
        host: podcastData.host || 'Dr. Syed M Quadri',
        isActive: podcastData.isActive !== undefined ? podcastData.isActive : true,
        isPublished: podcastData.isPublished !== undefined ? podcastData.isPublished : true,
        publishDate: podcastData.publishDate || new Date(),
        showNotes: Array.isArray(podcastData.showNotes) ? podcastData.showNotes : [],
        tags: Array.isArray(podcastData.tags) ? podcastData.tags.map(tag => tag.toLowerCase().trim()) : [],
        views: 0,
        likes: 0,
        downloads: 0
      };

      // Add uploaded cover image information
      if (uploadedFiles.coverImage) {
        processedData.coverImage = uploadedFiles.coverImage.url;
        processedData.coverImageCloudinary = {
          publicId: uploadedFiles.coverImage.publicId,
          url: uploadedFiles.coverImage.url,
          originalName: uploadedFiles.coverImage.originalName,
          fileSize: uploadedFiles.coverImage.fileSize,
          mimeType: uploadedFiles.coverImage.mimeType,
          width: uploadedFiles.coverImage.width,
          height: uploadedFiles.coverImage.height
        };
      }

      // Add uploaded audio file information
      if (uploadedFiles.audioFile) {
        processedData.audioUrl = uploadedFiles.audioFile.url;
        processedData.audioFile = {
          url: uploadedFiles.audioFile.url,
          publicId: uploadedFiles.audioFile.publicId,
          originalName: uploadedFiles.audioFile.originalName,
          fileSize: uploadedFiles.audioFile.fileSize,
          mimeType: uploadedFiles.audioFile.mimeType,
          duration: uploadedFiles.audioFile.duration,
          bitrate: uploadedFiles.audioFile.bitrate,
          sampleRate: uploadedFiles.audioFile.sampleRate,
          format: uploadedFiles.audioFile.format
        };

        // Update audioMetadata for backward compatibility
        processedData.audioMetadata = {
          fileSize: uploadedFiles.audioFile.fileSize,
          bitrate: uploadedFiles.audioFile.bitrate,
          format: uploadedFiles.audioFile.format,
          sampleRate: uploadedFiles.audioFile.sampleRate
        };
      }

      // Create the podcast
      const podcast = await Podcast.create(processedData);

      res.status(201).json({
        success: true,
        data: podcast,
        message: 'Podcast created successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating podcast:', error);
      throw error;
    }
  });

  /**
   * @desc    Update podcast
   * @route   PUT /api/v1/podcasts/:id
{{ ... }}
   * @access  Admin
   */
  updatePodcast = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };
      const uploadedFiles = req.uploadedFiles || {};

      console.log('Updating podcast with data:', JSON.stringify(updateData, null, 2));
      console.log('Uploaded files:', uploadedFiles);

      // Find podcast
      const podcast = await Podcast.findById(id);
      if (!podcast) {
        throw new AppError('Podcast not found', 404);
      }

      // Check if episode number is being changed and if it conflicts
      if (updateData.episodeNumber && updateData.episodeNumber !== podcast.episodeNumber) {
        const existingEpisode = await Podcast.findOne({ 
          episodeNumber: updateData.episodeNumber,
          _id: { $ne: id }
        });
        if (existingEpisode) {
          throw new AppError(`Episode number ${updateData.episodeNumber} already exists`, 400);
        }
      }

      // Process tags if provided
      if (updateData.tags && Array.isArray(updateData.tags)) {
        updateData.tags = updateData.tags.map(tag => tag.toLowerCase().trim());
      }

      // Handle uploaded cover image
      if (uploadedFiles.coverImage) {
        // Delete old cover image from Cloudinary if it exists
        if (podcast.coverImageCloudinary?.publicId) {
          try {
            const { deletePodcastFromCloudinary } = await import('../middleware/fileUpload.js');
            await deletePodcastFromCloudinary(podcast.coverImageCloudinary.publicId, 'image');
          } catch (error) {
            console.warn('Failed to delete old cover image:', error.message);
          }
        }

        updateData.coverImage = uploadedFiles.coverImage.url;
        updateData.coverImageCloudinary = {
          publicId: uploadedFiles.coverImage.publicId,
          url: uploadedFiles.coverImage.url,
          originalName: uploadedFiles.coverImage.originalName,
          fileSize: uploadedFiles.coverImage.fileSize,
          mimeType: uploadedFiles.coverImage.mimeType,
          width: uploadedFiles.coverImage.width,
          height: uploadedFiles.coverImage.height
        };
      }

      // Handle uploaded audio file
      if (uploadedFiles.audioFile) {
        // Delete old audio file from Cloudinary if it exists
        if (podcast.audioFile?.publicId) {
          try {
            const { deletePodcastFromCloudinary } = await import('../middleware/fileUpload.js');
            await deletePodcastFromCloudinary(podcast.audioFile.publicId, 'video');
          } catch (error) {
            console.warn('Failed to delete old audio file:', error.message);
          }
        }

        updateData.audioUrl = uploadedFiles.audioFile.url;
        updateData.audioFile = {
          url: uploadedFiles.audioFile.url,
          publicId: uploadedFiles.audioFile.publicId,
          originalName: uploadedFiles.audioFile.originalName,
          fileSize: uploadedFiles.audioFile.fileSize,
          mimeType: uploadedFiles.audioFile.mimeType,
          duration: uploadedFiles.audioFile.duration,
          bitrate: uploadedFiles.audioFile.bitrate,
          sampleRate: uploadedFiles.audioFile.sampleRate,
          format: uploadedFiles.audioFile.format
        };

        // Update audioMetadata for backward compatibility
        updateData.audioMetadata = {
          fileSize: uploadedFiles.audioFile.fileSize,
          bitrate: uploadedFiles.audioFile.bitrate,
          format: uploadedFiles.audioFile.format,
          sampleRate: uploadedFiles.audioFile.sampleRate
        };
      }

      // Update podcast
      const updatedPodcast = await Podcast.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: updatedPodcast,
        message: 'Podcast updated successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating podcast:', error);
      throw error;
    }
  });

  /**
   * @desc    Delete podcast
   * @route   DELETE /api/v1/podcasts/:id
   * @access  Admin
   */
  deletePodcast = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const podcast = await Podcast.findById(id);
    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    await Podcast.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: null,
      message: 'Podcast deleted successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcast categories with counts
   * @route   GET /api/v1/podcasts/categories
   * @access  Public
   */
  getCategories = asyncHandler(async (req, res) => {
    const categories = await Podcast.aggregate([
      {
        $match: {
          isActive: true,
          isPublished: true,
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          latestEpisode: { $max: '$publishDate' },
        },
      },
      {
        $sort: { count: -1, _id: 1 },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1,
          latestEpisode: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length,
      message: 'Categories retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcast statistics
   * @route   GET /api/v1/podcasts/stats
   * @access  Public
   */
  getPodcastStats = asyncHandler(async (req, res) => {
    const stats = await Podcast.aggregate([
      {
        $match: {
          isActive: true,
          isPublished: true,
        },
      },
      {
        $group: {
          _id: null,
          totalPodcasts: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalDownloads: { $sum: '$downloads' },
          avgViews: { $avg: '$views' },
          avgLikes: { $avg: '$likes' },
          avgDownloads: { $avg: '$downloads' },
          mostPopular: { $max: '$views' },
          latestEpisode: { $max: '$publishDate' },
          oldestEpisode: { $min: '$publishDate' },
        },
      },
    ]);

    const categoryStats = await Podcast.aggregate([
      {
        $match: {
          isActive: true,
          isPublished: true,
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalPodcasts: 0,
          totalViews: 0,
          totalLikes: 0,
          totalDownloads: 0,
          avgViews: 0,
          avgLikes: 0,
          avgDownloads: 0,
          mostPopular: 0,
          latestEpisode: null,
          oldestEpisode: null,
        },
        topCategories: categoryStats,
      },
      message: 'Podcast statistics retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Search podcasts
   * @route   GET /api/v1/podcasts/search
   * @access  Public
   */
  searchPodcasts = asyncHandler(async (req, res) => {
    const {
      q: query,
      category,
      host,
      tags,
      minDuration,
      maxDuration,
      page = 1,
      limit = 20,
      sortBy = 'relevance'
    } = req.query;

    if (!query) {
      throw new AppError('Search query is required', 400);
    }

    // Build search filter
    const searchFilter = {
      isActive: true,
      isPublished: true,
      $text: { $search: query },
    };

    if (category) {
      searchFilter.category = new RegExp(category, 'i');
    }

    if (host) {
      searchFilter.host = new RegExp(host, 'i');
    }

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',');
      searchFilter.tags = { $in: tagArray.map(tag => tag.trim().toLowerCase()) };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), 50);
    const skip = (pageNum - 1) * limitNum;

    // Sort options
    let sortOptions = {};
    switch (sortBy) {
      case 'latest':
        sortOptions = { publishDate: -1 };
        break;
      case 'popular':
        sortOptions = { views: -1 };
        break;
      case 'relevance':
      default:
        sortOptions = { score: { $meta: 'textScore' }, publishDate: -1 };
        break;
    }

    // Execute search
    const [podcasts, totalResults] = await Promise.all([
      Podcast.find(searchFilter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
      Podcast.countDocuments(searchFilter)
    ]);

    // Calculate pagination
    const totalPages = Math.ceil(totalResults / limitNum);

    res.status(200).json({
      success: true,
      data: podcasts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
      searchQuery: query,
      filters: { category, host, tags, minDuration, maxDuration, sortBy },
      message: `Found ${totalResults} podcasts matching "${query}"`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcasts by host
   * @route   GET /api/v1/podcasts/host/:host
   * @access  Public
   */
  getPodcastsByHost = asyncHandler(async (req, res) => {
    const { host } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [podcasts, totalPodcasts] = await Promise.all([
      Podcast.findByHost(host, limitNum).skip(skip),
      Podcast.countDocuments({
        host: new RegExp(host, 'i'),
        isActive: true,
        isPublished: true,
      })
    ]);

    const totalPages = Math.ceil(totalPodcasts / limitNum);

    res.status(200).json({
      success: true,
      data: podcasts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalPodcasts,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
      host,
      message: `Podcasts by ${host} retrieved successfully`,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Get podcast transcript
   * @route   GET /api/v1/podcasts/:identifier/transcript
   * @access  Public
   */
  getPodcastTranscript = asyncHandler(async (req, res) => {
    const { identifier } = req.params;

    // Find by ID or slug
    const podcast = await Podcast.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(identifier) ? identifier : null },
        { slug: identifier }
      ],
      isActive: true,
      isPublished: true,
    }).select('title transcript episodeNumber publishDate');

    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    if (!podcast.transcript) {
      throw new AppError('Transcript not available for this podcast', 404);
    }

    res.status(200).json({
      success: true,
      data: {
        id: podcast._id,
        title: podcast.title,
        episodeNumber: podcast.episodeNumber,
        publishDate: podcast.publishDate,
        transcript: podcast.transcript,
      },
      message: 'Transcript retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Remove audio file from podcast
   * @route   DELETE /api/v1/podcasts/:id/files/audio
   * @access  Admin
   */
  removeAudioFile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const podcast = await Podcast.findById(id);
    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    // Delete audio file from Cloudinary if it exists
    if (podcast.audioFile?.publicId) {
      try {
        const { deletePodcastFromCloudinary } = await import('../middleware/fileUpload.js');
        await deletePodcastFromCloudinary(podcast.audioFile.publicId, 'video');
      } catch (error) {
        console.warn('Failed to delete audio file from Cloudinary:', error.message);
      }
    }

    // Update podcast to remove audio file references
    const updatedPodcast = await Podcast.findByIdAndUpdate(
      id,
      {
        $unset: {
          audioFile: 1,
          audioMetadata: 1
        },
        audioUrl: '' // Reset to empty string
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedPodcast,
      message: 'Audio file removed successfully',
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * @desc    Remove cover image from podcast
   * @route   DELETE /api/v1/podcasts/:id/files/cover
   * @access  Admin
   */
  removeCoverImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const podcast = await Podcast.findById(id);
    if (!podcast) {
      throw new AppError('Podcast not found', 404);
    }

    // Delete cover image from Cloudinary if it exists
    if (podcast.coverImageCloudinary?.publicId) {
      try {
        const { deletePodcastFromCloudinary } = await import('../middleware/fileUpload.js');
        await deletePodcastFromCloudinary(podcast.coverImageCloudinary.publicId, 'image');
      } catch (error) {
        console.warn('Failed to delete cover image from Cloudinary:', error.message);
      }
    }

    // Update podcast to remove cover image references
    const updatedPodcast = await Podcast.findByIdAndUpdate(
      id,
      {
        $unset: {
          coverImageCloudinary: 1
        },
        coverImage: '' // Reset to empty string
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedPodcast,
      message: 'Cover image removed successfully',
      timestamp: new Date().toISOString(),
    });
  });
}

export default new PodcastController();
