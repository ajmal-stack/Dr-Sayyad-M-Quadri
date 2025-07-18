import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Authentication middleware - Verify if user is logged in
export const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      // Check for token in cookies
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.',
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.id).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Token is not valid. User not found.',
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account has been deactivated.',
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        error:
          'Account is temporarily locked due to too many failed login attempts.',
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token.',
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token has expired.',
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Authentication failed.',
    });
  }
};

// Authorization middleware - Check user roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. Authentication required.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required role: ${roles.join(
          ' or '
        )}. Your role: ${req.user.role}`,
      });
    }

    next();
  };
};

// Permission-based authorization middleware
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. Authentication required.',
      });
    }

    if (!req.user.hasPermission(permission)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required permission: ${permission}`,
      });
    }

    next();
  };
};

// Resource-based authorization middleware
export const requireAccess = (resource, action = 'read') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. Authentication required.',
      });
    }

    if (!req.user.canAccess(resource, action)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Cannot ${action} ${resource}`,
      });
    }

    next();
  };
};

// Optional authentication - User may or may not be logged in
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);

        if (user && user.isActive && !user.isLocked) {
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but that's okay for optional auth
        console.log('Optional auth: Invalid token provided');
      }
    }

    next();
  } catch (error) {
    // For optional auth, we don't fail on errors
    next();
  }
};

// Middleware to check if user owns the resource
export const ownershipOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. Authentication required.',
      });
    }

    // Check if user has required role
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    // Check if user owns the resource (userId in params matches logged-in user)
    const resourceUserId = req.params.userId || req.params.id;
    if (resourceUserId && resourceUserId === req.user._id.toString()) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: 'Access denied. You can only access your own resources.',
    });
  };
};

// Middleware to validate admin or superadmin for user management
export const adminAccess = authorize('Admin', 'SuperAdmin');

// Middleware to validate superadmin only
export const superAdminAccess = authorize('SuperAdmin');

// Middleware to validate user is accessing their own data or has admin rights
export const selfOrAdmin = ownershipOrRole('Admin', 'SuperAdmin');

export default {
  generateToken,
  verifyToken,
  authenticate,
  authorize,
  requirePermission,
  requireAccess,
  optionalAuth,
  ownershipOrRole,
  adminAccess,
  superAdminAccess,
  selfOrAdmin,
};
