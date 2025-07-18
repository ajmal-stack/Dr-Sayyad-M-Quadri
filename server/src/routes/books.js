import express from 'express';
import { uploadSingle } from '../middleware/upload.js';
import {
  authenticate,
  adminAccess,
  requirePermission,
} from '../middleware/auth.js';
import {
  getAllBooks,
  getFeaturedBooks,
  getBooksByCategory,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getPublicSpeakingBook,
} from '../controllers/bookController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllBooks);
router.get('/featured', getFeaturedBooks);
router.get('/public-speaking', getPublicSpeakingBook);
router.get('/category/:category', getBooksByCategory);
router.get('/:id', getBookById);

// Protected routes (authentication required)
router.post(
  '/',
  authenticate,
  requirePermission('canWrite'),
  uploadSingle('coverImage'),
  createBook
);
router.put(
  '/:id',
  authenticate,
  requirePermission('canWrite'),
  uploadSingle('coverImage'),
  updateBook
);
router.delete('/:id', authenticate, requirePermission('canDelete'), deleteBook);

export default router;
