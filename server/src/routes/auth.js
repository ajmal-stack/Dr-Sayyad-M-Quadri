import express from 'express';
import { uploadSingle } from '../middleware/upload.js';
import {
  authenticate,
  adminAccess,
  superAdminAccess,
  selfOrAdmin,
} from '../middleware/auth.js';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', uploadSingle('avatar'), register);
router.post('/login', login);

// Protected routes (authentication required)
router.use(authenticate); // All routes below require authentication

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', uploadSingle('avatar'), updateProfile);
router.put('/change-password', changePassword);
router.post('/logout', logout);

// Admin routes (Admin or SuperAdmin access)
router.get('/users', adminAccess, getAllUsers);
router.get('/users/stats', adminAccess, getUserStats);

// User management routes
router.get('/users/:id', selfOrAdmin, getUserById);
router.put('/users/:id', adminAccess, uploadSingle('avatar'), updateUser);

// SuperAdmin only routes
router.delete('/users/:id', superAdminAccess, deleteUser);
router.post(
  '/create-admin',
  superAdminAccess,
  uploadSingle('avatar'),
  register
);

export default router;
