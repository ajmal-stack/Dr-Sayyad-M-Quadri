import YouTube from '../models/YouTube.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all YouTube videos with filtering, sorting, and pagination
const getAllVideos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      featured,
      trending,
      isNew,
      search,
      sortBy = 'publishDate',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    
    if (trending !== undefined) {
      filter.isTrending = trending === 'true';
    }
    
    if (isNew !== undefined) {
      filter.isNew = isNew === 'true';
    }

    // Build query
    let query = YouTube.find(filter);

    // Add search functionality
    if (search) {
      query = YouTube.find({
        ...filter,
        $text: { $search: search }
      });
    }

    // Add sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    query = query.sort(sortOptions);

    // Add pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    query = query.skip(skip).limit(parseInt(limit));

    // Execute query
    const videos = await query;
    const total = await YouTube.countDocuments(search ? 
      { ...filter, $text: { $search: search } } : 
      filter
    );

    // Calculate statistics
    const stats = await YouTube.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalVideos: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          featuredCount: { $sum: { $cond: ['$featured', 1, 0] } },
          trendingCount: { $sum: { $cond: ['$isTrending', 1, 0] } },
          newCount: { $sum: { $cond: ['$isNew', 1, 0] } }
        }
      }
    ]);

    res.json({
      success: true,
      data: videos,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      },
      stats: stats[0] || {
        totalVideos: 0,
        totalViews: 0,
        totalLikes: 0,
        featuredCount: 0,
        trendingCount: 0,
        newCount: 0
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch videos',
      error: error.message
    });
  }
};

// Get single video by ID
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await YouTube.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video',
      error: error.message
    });
  }
};

// Get video by videoId (YouTube ID)
const getVideoByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await YouTube.findOne({ videoId, isActive: true });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video',
      error: error.message
    });
  }
};

// Create new video
const createVideo = async (req, res) => {
  try {
    const videoData = req.body;

    // Check if video with same videoId already exists
    const existingVideo = await YouTube.findOne({ videoId: videoData.videoId });
    if (existingVideo) {
      return res.status(400).json({
        success: false,
        message: 'Video with this YouTube ID already exists'
      });
    }

    const video = new YouTube(videoData);
    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video
    });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create video',
      error: error.message
    });
  }
};

// Update video
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const video = await YouTube.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update video',
      error: error.message
    });
  }
};

// Delete video (soft delete)
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await YouTube.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete video',
      error: error.message
    });
  }
};

// Get featured videos
const getFeaturedVideos = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const videos = await YouTube.find({ 
      featured: true, 
      isActive: true 
    })
    .sort({ publishDate: -1 })
    .limit(parseInt(limit));

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured videos',
      error: error.message
    });
  }
};

// Get trending videos
const getTrendingVideos = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const videos = await YouTube.find({ 
      isTrending: true, 
      isActive: true 
    })
    .sort({ views: -1 })
    .limit(parseInt(limit));

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trending videos',
      error: error.message
    });
  }
};

// Get latest videos
const getLatestVideos = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const videos = await YouTube.find({ isActive: true })
    .sort({ publishDate: -1 })
    .limit(parseInt(limit));

    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Error fetching latest videos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest videos',
      error: error.message
    });
  }
};

// Get videos by category
const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const videos = await YouTube.find({ 
      category, 
      isActive: true 
    })
    .sort({ publishDate: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await YouTube.countDocuments({ category, isActive: true });

    res.json({
      success: true,
      data: videos,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch videos by category',
      error: error.message
    });
  }
};

// Get video statistics
const getVideoStats = async (req, res) => {
  try {
    const stats = await YouTube.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalVideos: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          avgViews: { $avg: '$views' },
          avgLikes: { $avg: '$likes' },
          featuredCount: { $sum: { $cond: ['$featured', 1, 0] } },
          trendingCount: { $sum: { $cond: ['$isTrending', 1, 0] } },
          newCount: { $sum: { $cond: ['$isNew', 1, 0] } }
        }
      }
    ]);

    const categoryStats = await YouTube.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overall: stats[0] || {},
        byCategory: categoryStats
      }
    });
  } catch (error) {
    console.error('Error fetching video stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video statistics',
      error: error.message
    });
  }
};

// Seed database with JSON data
const seedDatabase = async (req, res) => {
  try {
    // Read the JSON file
    const jsonPath = path.join(__dirname, '../../../../../client/src/data/youtube.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const videos = JSON.parse(jsonData);

    // Clear existing data
    await YouTube.deleteMany({});

    // Transform and insert data
    const transformedVideos = videos.map(video => ({
      ...video,
      publishDate: new Date(video.publishDate),
      _id: undefined // Remove the string ID to let MongoDB generate ObjectId
    }));

    await YouTube.insertMany(transformedVideos);

    res.json({
      success: true,
      message: `Successfully seeded database with ${videos.length} videos`
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: error.message
    });
  }
};

export {
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
};
