import { body, query, param, validationResult } from 'express-validator';
import { AppError } from '../../../shared/middleware/errorHandler.js';

/**
 * Validation middleware for blog operations
 */

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    throw new AppError('Validation failed', 400, errorMessages);
  }
  next();
};

/**
 * Validate blog query parameters
 */
export const validateBlogQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  query('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
    
  query('author')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author must be between 2 and 100 characters'),
    
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
    
  query('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Difficulty must be one of: beginner, intermediate, advanced, expert'),
    
  query('format')
    .optional()
    .isIn(['article', 'listicle', 'how-to', 'interview', 'case-study', 'research', 'news', 'opinion'])
    .withMessage('Format must be one of: article, listicle, how-to, interview, case-study, research, news, opinion'),
    
  query('minReadTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Minimum read time must be a positive integer (in minutes)'),
    
  query('maxReadTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum read time must be a positive integer (in minutes)'),
    
  query('sortBy')
    .optional()
    .isIn(['latest', 'oldest', 'popular', 'trending', 'readTime', 'alphabetical', 'relevance'])
    .withMessage('Invalid sort option'),
    
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
    
  query('status')
    .optional()
    .isIn(['draft', 'published', 'archived', 'scheduled'])
    .withMessage('Status must be one of: draft, published, archived, scheduled'),
    
  handleValidationErrors
];

/**
 * Validate blog search parameters
 */
export const validateBlogSearch = [
  query('q')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query is required and must be between 2 and 100 characters'),
    
  query('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
    
  query('author')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author must be between 2 and 100 characters'),
    
  query('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Difficulty must be one of: beginner, intermediate, advanced, expert'),
    
  query('format')
    .optional()
    .isIn(['article', 'listicle', 'how-to', 'interview', 'case-study', 'research', 'news', 'opinion'])
    .withMessage('Format must be one of: article, listicle, how-to, interview, case-study, research, news, opinion'),
    
  query('minReadTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Minimum read time must be a positive integer (in minutes)'),
    
  query('maxReadTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum read time must be a positive integer (in minutes)'),
    
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
    
  handleValidationErrors
];

/**
 * Validate blog identifier parameter
 */
export const validateBlogIdentifier = [
  param('identifier')
    .notEmpty()
    .trim()
    .custom((value) => {
      // Check if it's a valid ObjectId or a valid slug
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      const slugRegex = /^[a-z0-9-]+$/;
      
      if (!objectIdRegex.test(value) && !slugRegex.test(value)) {
        throw new Error('Invalid blog identifier. Must be a valid ID or slug.');
      }
      
      return true;
    }),
    
  handleValidationErrors
];

/**
 * Validate engagement tracking data
 */
export const validateEngagementTracking = [
  body('action')
    .notEmpty()
    .isIn(['view', 'like', 'share', 'read'])
    .withMessage('Action must be one of: view, like, share, read'),
    
  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100'),
    
  body('userId')
    .optional()
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB ObjectId'),
    
  // Custom validation: progress and userId are required for 'read' action
  body('progress')
    .if(body('action').equals('read'))
    .notEmpty()
    .withMessage('Progress is required for read action'),
    
  body('userId')
    .if(body('action').equals('read'))
    .notEmpty()
    .withMessage('User ID is required for read action'),
    
  handleValidationErrors
];

/**
 * Validate blog creation data (for admin use later)
 */
export const validateBlogCreation = [
  body('title')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title is required and must be between 2 and 200 characters'),
    
  body('excerpt')
    .notEmpty()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Excerpt is required and must be between 10 and 500 characters'),
    
  body('content')
    .notEmpty()
    .trim()
    .isLength({ min: 100 })
    .withMessage('Content is required and must be at least 100 characters'),
    
  body('author')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author must be between 2 and 100 characters'),
    
  body('category')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category is required and must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s&-]+$/)
    .withMessage('Category can only contain letters, spaces, hyphens, and ampersands'),
    
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      return tags.every(tag => typeof tag === 'string' && tag.trim().length > 0);
    })
    .withMessage('All tags must be non-empty strings'),
    
  body('image')
    .notEmpty()
    .trim()
    .withMessage('Image is required'),
    
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
    
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Difficulty must be one of: beginner, intermediate, advanced, expert'),
    
  body('format')
    .optional()
    .isIn(['article', 'listicle', 'how-to', 'interview', 'case-study', 'research', 'news', 'opinion'])
    .withMessage('Format must be one of: article, listicle, how-to, interview, case-study, research, news, opinion'),
    
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived', 'scheduled'])
    .withMessage('Status must be one of: draft, published, archived, scheduled'),
    
  body('scheduledDate')
    .optional()
    .isISO8601()
    .withMessage('Scheduled date must be a valid ISO 8601 date'),
    
  body('seoTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('SEO title cannot exceed 60 characters'),
    
  body('seoDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('SEO description cannot exceed 160 characters'),
    
  body('seoKeywords')
    .optional()
    .isArray()
    .withMessage('SEO keywords must be an array'),
    
  handleValidationErrors
];

/**
 * Validate blog update data (for admin use later)
 */
export const validateBlogUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
    
  body('excerpt')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Excerpt must be between 10 and 500 characters'),
    
  body('content')
    .optional()
    .trim()
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters'),
    
  body('author')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author must be between 2 and 100 characters'),
    
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s&-]+$/)
    .withMessage('Category can only contain letters, spaces, hyphens, and ampersands'),
    
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
    
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
    
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean value'),
    
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived', 'scheduled'])
    .withMessage('Status must be one of: draft, published, archived, scheduled'),
    
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Difficulty must be one of: beginner, intermediate, advanced, expert'),
    
  body('format')
    .optional()
    .isIn(['article', 'listicle', 'how-to', 'interview', 'case-study', 'research', 'news', 'opinion'])
    .withMessage('Format must be one of: article, listicle, how-to, interview, case-study, research, news, opinion'),
    
  handleValidationErrors
];

/**
 * Validate category parameter
 */
export const validateCategoryParam = [
  param('category')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s&-]+$/)
    .withMessage('Category can only contain letters, spaces, hyphens, and ampersands'),
    
  handleValidationErrors
];

/**
 * Validate author parameter
 */
export const validateAuthorParam = [
  param('author')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s.-]+$/)
    .withMessage('Author can only contain letters, spaces, dots, and hyphens'),
    
  handleValidationErrors
];

/**
 * Validate tag parameter
 */
export const validateTagParam = [
  param('tag')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Tag must be between 2 and 30 characters')
    .matches(/^[a-zA-Z0-9-]+$/)
    .withMessage('Tag can only contain letters, numbers, and hyphens'),
    
  handleValidationErrors
];

export { handleValidationErrors };
