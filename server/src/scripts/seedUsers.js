import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const defaultUsers = [
  {
    name: 'Dr. Syed M Quadri',
    email: 'admin@drquadri.com',
    password: 'password123',
    role: 'SuperAdmin',
    phone: '+15550001',
    isEmailVerified: true,
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'Admin',
    phone: '+15550002',
    isEmailVerified: true,
  },
  {
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password123',
    role: 'User',
    phone: '+15550003',
    isEmailVerified: true,
  },
  {
    name: 'Test Admin',
    email: 'testadmin@example.com',
    password: 'password123',
    role: 'Admin',
    phone: '+15550004',
    isEmailVerified: false,
  },
];

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional - comment out to keep existing users)
    // await User.deleteMany({});
    // console.log('Cleared existing users');

    // Check if users already exist
    for (const userData of defaultUsers) {
      const existingUser = await User.findByEmail(userData.email);

      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created ${userData.role}: ${userData.email}`);
      } else {
        console.log(`⚠️  User already exists: ${userData.email}`);
      }
    }

    console.log('\n🎉 User seeding completed successfully!');

    // Display summary
    const userStats = await User.getUserStats();
    const totalUsers = await User.countDocuments();

    console.log('\n📊 User Summary:');
    console.log(`Total Users: ${totalUsers}`);
    userStats.forEach((stat) => {
      console.log(
        `${stat._id}: ${stat.count} (Active: ${stat.active}, Verified: ${stat.verified})`
      );
    });

    console.log('\n🔐 Default Login Credentials:');
    console.log('SuperAdmin: admin@drquadri.com / password123');
    console.log('Admin: admin@example.com / password123');
    console.log('User: user@example.com / password123');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding script
seedUsers();
