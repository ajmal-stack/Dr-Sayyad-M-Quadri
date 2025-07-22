import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const fixUserPermissions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to update`);

    let updatedCount = 0;

    for (const user of users) {
      // Set permissions based on role
      let newPermissions;

      switch (user.role) {
        case 'User':
          newPermissions = {
            canRead: true,
            canWrite: false,
            canDelete: false,
            canManageUsers: false,
            canManageRoles: false,
            canAccessAnalytics: false,
          };
          break;
        case 'Admin':
          newPermissions = {
            canRead: true,
            canWrite: true,
            canDelete: true,
            canManageUsers: false,
            canManageRoles: false,
            canAccessAnalytics: true,
          };
          break;
        case 'SuperAdmin':
          newPermissions = {
            canRead: true,
            canWrite: true,
            canDelete: true,
            canManageUsers: true,
            canManageRoles: true,
            canAccessAnalytics: true,
          };
          break;
        default:
          console.log(`⚠️  Unknown role for user ${user.email}: ${user.role}`);
          continue;
      }

      // Update permissions directly without triggering middleware
      await User.updateOne(
        { _id: user._id },
        { $set: { permissions: newPermissions } }
      );

      console.log(`✅ Updated permissions for ${user.role}: ${user.email}`);
      updatedCount++;
    }

    console.log(`\n🎉 Updated permissions for ${updatedCount} users!`);

    // Display summary
    const userStats = await User.getUserStats();
    console.log('\n📊 User Summary:');
    userStats.forEach((stat) => {
      console.log(`${stat._id}: ${stat.count} users`);
    });
  } catch (error) {
    console.error('❌ Error fixing permissions:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Run the fix script
fixUserPermissions();
