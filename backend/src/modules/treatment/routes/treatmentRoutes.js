import express from 'express';
import {
  getAllTreatments,
  getTreatment,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  getFeaturedTreatments,
  getTreatmentsByCategory,
  searchTreatments,
  getTreatmentStats,
  trackEngagement,
  getCategories,
  seedTreatments
} from '../controllers/treatmentController.js';
import {
  validateTreatmentQuery,
  validateTreatmentSearch,
  validateTreatmentIdentifier,
  validateTreatmentCreate,
  validateTreatmentUpdate,
  validateTreatmentId,
  validateEngagementTracking,
  validateCategory
} from '../middleware/validation.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get all treatments with filtering and pagination
router.get(
  '/',
  validateTreatmentQuery,
  getAllTreatments
);

// Get featured treatments
router.get(
  '/featured',
  getFeaturedTreatments
);

// Get treatment statistics
router.get(
  '/stats',
  getTreatmentStats
);

// Get all categories
router.get(
  '/categories',
  getCategories
);

// Search treatments
router.get(
  '/search',
  validateTreatmentSearch,
  searchTreatments
);

// Get treatments by category
router.get(
  '/category/:category',
  validateCategory,
  getTreatmentsByCategory
);

// Get single treatment by ID or slug
router.get(
  '/:identifier',
  validateTreatmentIdentifier,
  getTreatment
);

/**
 * Admin Routes (would typically require authentication middleware)
 */

// Seed treatments from JSON
router.post(
  '/seed',
  seedTreatments
);

// Create new treatment
router.post(
  '/',
  validateTreatmentCreate,
  createTreatment
);

// Update treatment
router.put(
  '/:id',
  validateTreatmentId,
  validateTreatmentUpdate,
  updateTreatment
);

// Delete treatment (soft delete)
router.delete(
  '/:id',
  validateTreatmentId,
  deleteTreatment
);

/**
 * Engagement Tracking Routes
 */

// Track engagement (views, inquiries, bookings)
router.post(
  '/:identifier/track',
  validateTreatmentIdentifier,
  validateEngagementTracking,
  trackEngagement
);

export default router;
