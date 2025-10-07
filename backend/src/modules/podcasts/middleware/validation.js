import { body, query, param, validationResult } from 'express-validator';
import { AppError } from '../../../shared/middleware/errorHandler.js';

/**
 * Validation middleware for podcast operations
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
 * Validate podcast query parameters
 */
export const validatePodcastQuery = [
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
    
  query('host')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Host must be between 2 and 100 characters'),
    
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
    
  query('minDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Minimum duration must be a positive integer (in minutes)'),
    
  query('maxDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum duration must be a positive integer (in minutes)'),
    
  query('sortBy')
    .optional()
    .isIn(['latest', 'oldest', 'popular', 'episode', 'duration-short', 'duration-long', 'relevance'])
    .withMessage('Invalid sort option'),
    
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
    
  handleValidationErrors
];

/**
 * Validate podcast search parameters
 */
export const validatePodcastSearch = [
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
    
  query('host')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Host must be between 2 and 100 characters'),
    
  query('minDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Minimum duration must be a positive integer (in minutes)'),
    
  query('maxDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum duration must be a positive integer (in minutes)'),
    
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
 * Validate podcast identifier parameter
 */
export const validatePodcastIdentifier = [
  param('identifier')
    .notEmpty()
    .trim()
    .custom((value) => {
      // Check if it's a valid ObjectId or a valid slug
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      const slugRegex = /^[a-z0-9-]+$/;
      
      if (!objectIdRegex.test(value) && !slugRegex.test(value)) {
        throw new Error('Invalid podcast identifier. Must be a valid ID or slug.');
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
    .isIn(['play', 'like', 'download', 'listen'])
    .withMessage('Action must be one of: play, like, download, listen'),
    
  body('listenTime')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Listen time must be a non-negative integer (in seconds)'),
    
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value'),
    
  // Custom validation: listenTime is required for 'listen' action
  body('listenTime')
    .if(body('action').equals('listen'))
    .notEmpty()
    .withMessage('Listen time is required for listen action'),
    
  handleValidationErrors
];

/**
 * Validate podcast creation data (for admin use later)
 */
export const validatePodcastCreation = [
  body('title')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title is required and must be between 2 and 200 characters'),
    
  body('description')
    .notEmpty()
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Description is required and must be between 10 and 5000 characters'),
    
  body('duration')
    .notEmpty()
    .matches(/^([0-9]{1,2}):([0-5][0-9])$/)
    .withMessage('Duration must be in format MM:SS or HH:MM'),
    
  body('category')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s&-]+$/)
    .withMessage('Category can only contain letters, spaces, hyphens, and ampersands'),
    
  body('audioUrl')
    .notEmpty()
    .isURL()
    .withMessage('Valid audio URL is required')
    .matches(/\.(mp3|wav|m4a|aac|ogg)(\?.*)?$/i)
    .withMessage('Audio URL must point to a valid audio file'),
    
  body('coverImage')
    .notEmpty()
    .trim()
    .withMessage('Cover image is required'),
    
  body('host')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Host must be between 2 and 100 characters'),
    
  body('episodeNumber')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Episode number is required and must be a positive integer'),
    
  body('transcript')
    .optional()
    .trim()
    .isLength({ max: 50000 })
    .withMessage('Transcript cannot exceed 50000 characters'),
    
  body('showNotes')
    .optional()
    .isArray()
    .withMessage('Show notes must be an array'),
    
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      return tags.every(tag => typeof tag === 'string' && tag.trim().length > 0);
    })
    .withMessage('All tags must be non-empty strings'),
    
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
    
  body('chapters')
    .optional()
    .isArray()
    .withMessage('Chapters must be an array'),
    
  body('chapters.*.title')
    .if(body('chapters').exists())
    .notEmpty()
    .trim()
    .withMessage('Chapter title is required'),
    
  body('chapters.*.startTime')
    .if(body('chapters').exists())
    .notEmpty()
    .matches(/^([0-9]{1,2}):([0-5][0-9])$/)
    .withMessage('Chapter start time must be in format MM:SS'),
    
  body('guests')
    .optional()
    .isArray()
    .withMessage('Guests must be an array'),
    
  body('guests.*.name')
    .if(body('guests').exists())
    .notEmpty()
    .trim()
    .withMessage('Guest name is required'),
    
  body('audioMetadata.fileSize')
    .optional()
    .isInt({ min: 0 })
    .withMessage('File size must be a non-negative integer'),
    
  body('audioMetadata.format')
    .optional()
    .isIn(['mp3', 'wav', 'm4a', 'aac', 'ogg'])
    .withMessage('Invalid audio format'),
    
  handleValidationErrors
];

/**
 * Validate podcast update data (for admin use later)
 */
export const validatePodcastUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
    
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Description must be between 10 and 5000 characters'),
    
  body('duration')
    .optional()
    .matches(/^([0-9]{1,2}):([0-5][0-9])$/)
    .withMessage('Duration must be in format MM:SS or HH:MM'),
    
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s&-]+$/)
    .withMessage('Category can only contain letters, spaces, hyphens, and ampersands'),
    
  body('audioUrl')
    .optional()
    .isURL()
    .withMessage('Must be a valid URL')
    .matches(/\.(mp3|wav|m4a|aac|ogg)(\?.*)?$/i)
    .withMessage('Audio URL must point to a valid audio file'),
    
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
    
  body('transcript')
    .optional()
    .trim()
    .isLength({ max: 50000 })
    .withMessage('Transcript cannot exceed 50000 characters'),
    
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
 * Validate host parameter
 */
export const validateHostParam = [
  param('host')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Host must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s.-]+$/)
    .withMessage('Host can only contain letters, spaces, dots, and hyphens'),
    
  handleValidationErrors
];

export { handleValidationErrors };
