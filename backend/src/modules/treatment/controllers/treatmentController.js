import Treatment from '../models/Treatment.js';
import { AppError } from '../../../shared/middleware/errorHandler.js';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Get all treatments with pagination, filtering, and sorting
 */
export const getAllTreatments = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      status,
      featured,
      active,
      sortBy = 'name',
      adminView = 'false'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = {};

    // Admin view shows all, public view shows only published and active
    if (adminView !== 'true') {
      query.status = 'published';
      query.active = true;
    }

    if (category) {
      query.category = category;
    }

    if (status && adminView === 'true') {
      query.status = status;
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (active !== undefined && adminView === 'true') {
      query.active = active === 'true';
    }

    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'name':
        sort = { name: 1 };
        break;
      case 'views':
      case 'popular':
        sort = { views: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      default:
        sort = { name: 1 };
    }

    // Execute query
    const treatments = await Treatment.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalTreatments = await Treatment.countDocuments(query);
    const totalPages = Math.ceil(totalTreatments / limitNum);

    res.status(200).json({
      success: true,
      data: treatments,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalTreatments,
        limit: limitNum,
        hasMore: pageNum < totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get treatment by ID or slug
 */
export const getTreatment = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    // Try to find by ID first, then by slug
    let treatment;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      treatment = await Treatment.findById(identifier);
    } else {
      treatment = await Treatment.findOne({ slug: identifier });
    }

    if (!treatment) {
      return next(new AppError('Treatment not found', 404));
    }

    res.status(200).json({
      success: true,
      data: treatment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new treatment
 */
export const createTreatment = async (req, res, next) => {
  try {
    // Handle image upload if file is provided
    if (req.file) {
      const uploadOptions = {
        folder: 'dr-quadri/treatments',
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 630, crop: 'limit' },
          { quality: 'auto:good' }
        ]
      };

      const result = await cloudinary.uploader.upload(req.file.path, uploadOptions);
      
      req.body.image = result.secure_url;
      req.body.imageCloudinary = {
        publicId: result.public_id,
        url: result.secure_url,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        width: result.width,
        height: result.height
      };
    }

    // Parse JSON fields if they come as strings (from FormData)
    const fieldsToParse = ['methods', 'conditions', 'sections', 'onThisPage', 'informationCards', 'keyPoints', 'relatedResources', 'keywords', 'faqs'];
    fieldsToParse.forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          // If parsing fails, leave as is
        }
      }
    });

    // Parse nested objects
    if (req.body.pricing && typeof req.body.pricing === 'string') {
      try {
        req.body.pricing = JSON.parse(req.body.pricing);
      } catch (e) {
        // Leave as is
      }
    }

    if (req.body.availability && typeof req.body.availability === 'string') {
      try {
        req.body.availability = JSON.parse(req.body.availability);
      } catch (e) {
        // Leave as is
      }
    }

    if (req.body.contactInfo && typeof req.body.contactInfo === 'string') {
      try {
        req.body.contactInfo = JSON.parse(req.body.contactInfo);
      } catch (e) {
        // Leave as is
      }
    }

    const treatment = await Treatment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Treatment created successfully',
      data: treatment
    });
  } catch (error) {
    // If there was an error and we uploaded an image, delete it
    if (req.body.imageCloudinary?.publicId) {
      try {
        await cloudinary.uploader.destroy(req.body.imageCloudinary.publicId);
      } catch (deleteError) {
        console.error('Failed to delete uploaded image:', deleteError);
      }
    }
    next(error);
  }
};

/**
 * Update treatment
 */
export const updateTreatment = async (req, res, next) => {
  try {
    const { id } = req.params;

    let treatment = await Treatment.findById(id);
    if (!treatment) {
      return next(new AppError('Treatment not found', 404));
    }

    // Handle image upload if new file is provided
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (treatment.imageCloudinary?.publicId) {
        try {
          await cloudinary.uploader.destroy(treatment.imageCloudinary.publicId);
        } catch (deleteError) {
          console.error('Failed to delete old image:', deleteError);
        }
      }

      const uploadOptions = {
        folder: 'dr-quadri/treatments',
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 630, crop: 'limit' },
          { quality: 'auto:good' }
        ]
      };

      const result = await cloudinary.uploader.upload(req.file.path, uploadOptions);
      
      req.body.image = result.secure_url;
      req.body.imageCloudinary = {
        publicId: result.public_id,
        url: result.secure_url,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        width: result.width,
        height: result.height
      };
    }

    // Parse JSON fields if they come as strings (from FormData)
    const fieldsToParse = ['methods', 'conditions', 'sections', 'onThisPage', 'informationCards', 'keyPoints', 'relatedResources', 'keywords', 'faqs'];
    fieldsToParse.forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          // If parsing fails, leave as is
        }
      }
    });

    // Parse nested objects
    if (req.body.pricing && typeof req.body.pricing === 'string') {
      try {
        req.body.pricing = JSON.parse(req.body.pricing);
      } catch (e) {
        // Leave as is
      }
    }

    if (req.body.availability && typeof req.body.availability === 'string') {
      try {
        req.body.availability = JSON.parse(req.body.availability);
      } catch (e) {
        // Leave as is
      }
    }

    if (req.body.contactInfo && typeof req.body.contactInfo === 'string') {
      try {
        req.body.contactInfo = JSON.parse(req.body.contactInfo);
      } catch (e) {
        // Leave as is
      }
    }

    treatment = await Treatment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Treatment updated successfully',
      data: treatment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete treatment (soft delete by setting active to false)
 */
export const deleteTreatment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const treatment = await Treatment.findById(id);
    if (!treatment) {
      return next(new AppError('Treatment not found', 404));
    }

    // Soft delete - set active to false
    treatment.active = false;
    treatment.status = 'archived';
    await treatment.save();

    res.status(200).json({
      success: true,
      message: 'Treatment deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured treatments
 */
export const getFeaturedTreatments = async (req, res, next) => {
  try {
    const { category } = req.query;

    const treatments = await Treatment.getFeatured(category);

    res.status(200).json({
      success: true,
      data: treatments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get treatments by category
 */
export const getTreatmentsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    // Convert URL-friendly category to proper format
    const categoryMap = {
      'mental-health': 'Mental Health',
      'general-health': 'General Health'
    };

    const properCategory = categoryMap[category.toLowerCase()];
    if (!properCategory) {
      return next(new AppError('Invalid category', 400));
    }

    const treatments = await Treatment.getByCategory(properCategory);

    res.status(200).json({
      success: true,
      data: treatments,
      category: properCategory
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search treatments
 */
export const searchTreatments = async (req, res, next) => {
  try {
    const { q: searchTerm, page = 1, limit = 20 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const treatments = await Treatment.searchTreatments(searchTerm)
      .skip(skip)
      .limit(limitNum);

    const total = await Treatment.countDocuments({
      $text: { $search: searchTerm },
      status: 'published',
      active: true
    });

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: treatments,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: total,
        limit: limitNum
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get treatment statistics
 */
export const getTreatmentStats = async (req, res, next) => {
  try {
    const totalTreatments = await Treatment.countDocuments({ active: true });
    const publishedTreatments = await Treatment.countDocuments({ status: 'published', active: true });
    const draftTreatments = await Treatment.countDocuments({ status: 'draft', active: true });
    const featuredTreatments = await Treatment.countDocuments({ featured: true, active: true });

    const mentalHealthCount = await Treatment.countDocuments({ 
      category: 'Mental Health', 
      status: 'published', 
      active: true 
    });

    const generalHealthCount = await Treatment.countDocuments({ 
      category: 'General Health', 
      status: 'published', 
      active: true 
    });

    const totalViews = await Treatment.aggregate([
      { $match: { active: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const totalInquiries = await Treatment.aggregate([
      { $match: { active: true } },
      { $group: { _id: null, total: { $sum: '$inquiries' } } }
    ]);

    const totalBookings = await Treatment.aggregate([
      { $match: { active: true } },
      { $group: { _id: null, total: { $sum: '$bookings' } } }
    ]);

    const mostPopular = await Treatment.find({ active: true })
      .sort({ views: -1 })
      .limit(5)
      .select('name slug views category');

    res.status(200).json({
      success: true,
      data: {
        total: totalTreatments,
        published: publishedTreatments,
        draft: draftTreatments,
        featured: featuredTreatments,
        byCategory: {
          mentalHealth: mentalHealthCount,
          generalHealth: generalHealthCount
        },
        engagement: {
          totalViews: totalViews[0]?.total || 0,
          totalInquiries: totalInquiries[0]?.total || 0,
          totalBookings: totalBookings[0]?.total || 0
        },
        mostPopular
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Track engagement (views, inquiries, bookings)
 */
export const trackEngagement = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { action } = req.body;

    // Find treatment by ID or slug
    let treatment;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      treatment = await Treatment.findById(identifier);
    } else {
      treatment = await Treatment.findOne({ slug: identifier });
    }

    if (!treatment) {
      return next(new AppError('Treatment not found', 404));
    }

    // Track engagement based on action
    switch (action) {
      case 'view':
        await treatment.incrementViews();
        break;
      case 'inquiry':
        await treatment.incrementInquiries();
        break;
      case 'booking':
        await treatment.incrementBookings();
        break;
      default:
        return next(new AppError('Invalid action', 400));
    }

    res.status(200).json({
      success: true,
      message: `${action.charAt(0).toUpperCase() + action.slice(1)} tracked successfully`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all categories with treatment counts
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Treatment.aggregate([
      { $match: { status: 'published', active: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const formattedCategories = categories.map(cat => ({
      name: cat._id,
      slug: cat._id.toLowerCase().replace(/\s+/g, '-'),
      count: cat.count
    }));

    res.status(200).json({
      success: true,
      data: formattedCategories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Seed treatments from JSON data
 */
export const seedTreatments = async (req, res, next) => {
  try {
    const treatments = req.body;

    if (!Array.isArray(treatments) || treatments.length === 0) {
      return next(new AppError('Invalid treatment data. Expected an array of treatments.', 400));
    }

    // Clear existing treatments (optional - can be controlled by query param)
    const clearExisting = req.query.clear === 'true';
    if (clearExisting) {
      const deleteResult = await Treatment.deleteMany({});
      console.log(`Cleared ${deleteResult.deletedCount} existing treatments`);
    }

    // Insert treatments
    const insertedTreatments = await Treatment.insertMany(treatments);

    // Get statistics
    const stats = {
      total: insertedTreatments.length,
      mentalHealth: insertedTreatments.filter(t => t.category === 'Mental Health').length,
      generalHealth: insertedTreatments.filter(t => t.category === 'General Health').length,
      featured: insertedTreatments.filter(t => t.featured).length,
      published: insertedTreatments.filter(t => t.status === 'published').length
    };

    res.status(201).json({
      success: true,
      message: `Successfully seeded ${insertedTreatments.length} treatments`,
      data: insertedTreatments,
      stats
    });
  } catch (error) {
    next(error);
  }
};
