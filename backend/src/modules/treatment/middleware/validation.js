import { AppError } from '../../../shared/middleware/errorHandler.js';

/**
 * Validate treatment query parameters
 */
export const validateTreatmentQuery = (req, res, next) => {
  const { page, limit, sortBy } = req.query;

  // Validate page
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return next(new AppError('Page must be a positive number', 400));
  }

  // Validate limit
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return next(new AppError('Limit must be between 1 and 100', 400));
  }

  // Validate sortBy
  const validSortOptions = ['name', 'views', 'newest', 'oldest', 'popular'];
  if (sortBy && !validSortOptions.includes(sortBy)) {
    return next(new AppError(`Invalid sort option. Valid options: ${validSortOptions.join(', ')}`, 400));
  }

  next();
};

/**
 * Validate treatment search parameters
 */
export const validateTreatmentSearch = (req, res, next) => {
  const { q: query, page, limit } = req.query;

  // Validate search query
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return next(new AppError('Search query must be at least 2 characters long', 400));
  }

  // Validate page
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return next(new AppError('Page must be a positive number', 400));
  }

  // Validate limit
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return next(new AppError('Limit must be between 1 and 100', 400));
  }

  next();
};

/**
 * Validate treatment identifier (ID or slug)
 */
export const validateTreatmentIdentifier = (req, res, next) => {
  const { identifier } = req.params;

  if (!identifier || typeof identifier !== 'string' || identifier.trim().length === 0) {
    return next(new AppError('Invalid treatment identifier', 400));
  }

  next();
};

/**
 * Validate treatment creation data
 */
export const validateTreatmentCreate = (req, res, next) => {
  const { name, description, category } = req.body;

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    return next(new AppError('Name is required and must be at least 3 characters long', 400));
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    return next(new AppError('Description is required and must be at least 10 characters long', 400));
  }

  if (!category || typeof category !== 'string') {
    return next(new AppError('Category is required', 400));
  }

  // Validate category value
  const validCategories = ['Mental Health', 'General Health'];
  if (!validCategories.includes(category)) {
    return next(new AppError(`Category must be one of: ${validCategories.join(', ')}`, 400));
  }

  // Validate name length
  if (name.length > 200) {
    return next(new AppError('Name cannot exceed 200 characters', 400));
  }

  // Validate description length
  if (description.length > 500) {
    return next(new AppError('Description cannot exceed 500 characters', 400));
  }

  next();
};

/**
 * Validate treatment update data
 */
export const validateTreatmentUpdate = (req, res, next) => {
  const { name, description, category } = req.body;

  // Validate fields if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 3) {
      return next(new AppError('Name must be at least 3 characters long', 400));
    }
    if (name.length > 200) {
      return next(new AppError('Name cannot exceed 200 characters', 400));
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim().length < 10) {
      return next(new AppError('Description must be at least 10 characters long', 400));
    }
    if (description.length > 500) {
      return next(new AppError('Description cannot exceed 500 characters', 400));
    }
  }

  if (category !== undefined) {
    const validCategories = ['Mental Health', 'General Health'];
    if (!validCategories.includes(category)) {
      return next(new AppError(`Category must be one of: ${validCategories.join(', ')}`, 400));
    }
  }

  next();
};

/**
 * Validate treatment ID parameter
 */
export const validateTreatmentId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new AppError('Invalid treatment ID format', 400));
  }

  next();
};

/**
 * Validate engagement tracking data
 */
export const validateEngagementTracking = (req, res, next) => {
  const { action } = req.body;

  const validActions = ['view', 'inquiry', 'booking'];
  if (!action || !validActions.includes(action)) {
    return next(new AppError(`Invalid action. Valid actions: ${validActions.join(', ')}`, 400));
  }

  next();
};

/**
 * Validate category parameter
 */
export const validateCategory = (req, res, next) => {
  const { category } = req.params;

  const validCategories = ['mental-health', 'general-health'];
  if (!validCategories.includes(category.toLowerCase())) {
    return next(new AppError(`Invalid category. Valid categories: ${validCategories.join(', ')}`, 400));
  }

  next();
};
