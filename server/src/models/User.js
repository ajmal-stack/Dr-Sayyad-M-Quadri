import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters'],
      maxLength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ['User', 'Admin', 'SuperAdmin'],
      default: 'User',
    },
    avatar: {
      url: String,
      publicId: String,
      originalName: String,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    permissions: {
      canRead: { type: Boolean, default: true },
      canWrite: { type: Boolean, default: false },
      canDelete: { type: Boolean, default: false },
      canManageUsers: { type: Boolean, default: false },
      canManageRoles: { type: Boolean, default: false },
      canAccessAnalytics: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for account locked status
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to set permissions based on role
userSchema.pre('save', function (next) {
  if (!this.isModified('role')) return next();

  // Set permissions based on role
  switch (this.role) {
    case 'User':
      this.permissions = {
        canRead: true,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canManageRoles: false,
        canAccessAnalytics: false,
      };
      break;
    case 'Admin':
      this.permissions = {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canManageUsers: false,
        canManageRoles: false,
        canAccessAnalytics: true,
      };
      break;
    case 'SuperAdmin':
      this.permissions = {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canManageUsers: true,
        canManageRoles: true,
        canAccessAnalytics: true,
      };
      break;
  }
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }

  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
  });
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save();
};

// Static method to find by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to get users by role
userSchema.statics.getUsersByRole = function (role) {
  return this.find({ role, isActive: true }).select('-password');
};

// Static method to get user statistics
userSchema.statics.getUserStats = function () {
  return this.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        active: {
          $sum: { $cond: ['$isActive', 1, 0] },
        },
        verified: {
          $sum: { $cond: ['$isEmailVerified', 1, 0] },
        },
      },
    },
  ]);
};

// Instance method to check permissions
userSchema.methods.hasPermission = function (permission) {
  return this.permissions[permission] === true;
};

// Instance method to check if user can access resource
userSchema.methods.canAccess = function (resource, action = 'read') {
  const permissionMap = {
    read: 'canRead',
    write: 'canWrite',
    delete: 'canDelete',
    manage_users: 'canManageUsers',
    manage_roles: 'canManageRoles',
    analytics: 'canAccessAnalytics',
  };

  const permission = permissionMap[action];
  return permission ? this.hasPermission(permission) : false;
};

// Instance method to generate password reset token
userSchema.methods.generatePasswordResetToken = async function () {
  const crypto = await import('crypto');
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Instance method to generate email verification token
userSchema.methods.generateEmailVerificationToken = async function () {
  const crypto = await import('crypto');
  const verificationToken = crypto.randomBytes(20).toString('hex');

  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

const User = mongoose.model('User', userSchema);

export default User;
