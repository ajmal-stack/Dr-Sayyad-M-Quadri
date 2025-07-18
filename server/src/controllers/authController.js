import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email',
      });
    }

    // Prepare user data
    const userData = { name, email, password, phone };

    // Only SuperAdmin can create Admin or SuperAdmin users
    if (role && role !== 'User') {
      if (!req.user || req.user.role !== 'SuperAdmin') {
        return res.status(403).json({
          success: false,
          error: 'Only SuperAdmin can create Admin or SuperAdmin accounts',
        });
      }
      userData.role = role;
    }

    // Add avatar if uploaded
    if (req.file) {
      userData.avatar = {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
      };
    }

    // Create user
    const user = new User(userData);
    await user.save();

    // Generate token
    const token = generateToken({ id: user._id, role: user.role });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Registration failed',
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      });
    }

    // Get user with password
    const user = await User.findByEmail(email).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        error:
          'Account is temporarily locked due to too many failed login attempts',
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account has been deactivated',
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();

      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    await user.updateLastLogin();

    // Generate token
    const token = generateToken({ id: user._id, role: user.role });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Set cookie (optional)
    res.cookie('token', token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
    });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    // Clear cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout failed',
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get profile',
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updateData = { name, email, phone };

    // Add avatar if uploaded
    if (req.file) {
      updateData.avatar = {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
      };
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update profile',
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide current and new password',
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to change password',
    });
  }
};

// Get all users (Admin/SuperAdmin only)
export const getAllUsers = async (req, res) => {
  try {
    const { role, isActive, page = 1, limit = 20, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let query = {};

    // Add filters
    if (role) {
      query.role = role;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: users,
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get users',
    });
  }
};

// Get user by ID (Admin/SuperAdmin only)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user',
    });
  }
};

// Update user (Admin/SuperAdmin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, isActive } = req.body;

    // Only SuperAdmin can update roles
    if (role && req.user.role !== 'SuperAdmin') {
      return res.status(403).json({
        success: false,
        error: 'Only SuperAdmin can update user roles',
      });
    }

    const updateData = { name, email, phone, isActive };
    if (role) updateData.role = role;

    // Add avatar if uploaded
    if (req.file) {
      updateData.avatar = {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
      };
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update user',
    });
  }
};

// Delete user (SuperAdmin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent self-deletion
    if (id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        error: 'You cannot delete your own account',
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user',
    });
  }
};

// Get user statistics (Admin/SuperAdmin only)
export const getUserStats = async (req, res) => {
  try {
    const stats = await User.getUserStats();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });

    res.status(200).json({
      success: true,
      data: {
        total: totalUsers,
        active: activeUsers,
        verified: verifiedUsers,
        byRole: stats,
      },
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user statistics',
    });
  }
};
