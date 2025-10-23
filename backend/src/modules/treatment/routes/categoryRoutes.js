import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  getOrCreateCategory,
  addSubcategory,
  getSubcategories,
  updateCategory,
  deleteCategory,
  syncCategoriesFromTreatments
} from '../controllers/categoryController.js';

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

// Get category by ID
router.get('/:id', getCategoryById);

// Create new category
router.post('/', createCategory);

// Get or create category (auto-create if doesn't exist)
router.post('/get-or-create', getOrCreateCategory);

// Add subcategory to category
router.post('/subcategory', addSubcategory);

// Get subcategories for a category
router.get('/subcategories/list', getSubcategories);

// Update category
router.put('/:id', updateCategory);

// Delete category
router.delete('/:id', deleteCategory);

// Sync categories from existing treatments
router.post('/sync', syncCategoriesFromTreatments);

export default router;
