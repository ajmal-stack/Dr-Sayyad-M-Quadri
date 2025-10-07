/**
 * Complete setup script for Podcasts API
 * This script guides you through the entire setup process
 */

import fs from 'fs';
import path from 'path';

console.log('🎧 Dr. Syed M Quadri - Podcasts API Setup');
console.log('=====================================\n');

// Check if .env file exists
function checkEnvironment() {
  console.log('🔍 Checking environment configuration...');
  
  const envPath = path.join(process.cwd(), '../../../../.env');
  const envExamplePath = path.join(process.cwd(), '../../../../.env.example');
  
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env file not found');
    
    if (fs.existsSync(envExamplePath)) {
      console.log('📋 Found .env.example file');
      console.log('\n🔧 Setup steps:');
      console.log('1. Copy .env.example to .env');
      console.log('2. Update MONGODB_URI with your connection string');
      console.log('3. Run this script again');
      
      // Copy .env.example to .env
      try {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ Created .env file from .env.example');
        console.log('📝 Please update the MONGODB_URI in .env file');
      } catch (error) {
        console.log('❌ Could not create .env file:', error.message);
      }
    } else {
      console.log('❌ .env.example file not found');
    }
    
    return false;
  }
  
  console.log('✅ .env file found');
  return true;
}

// Check MongoDB connection
async function checkMongoDB() {
  console.log('\n🍃 Checking MongoDB connection...');
  
  try {
    // Import config
    const { config } = await import('../../../config/index.js');
    console.log('📊 Database URI:', config.database.uri);
    
    // Try to connect
    const mongoose = await import('mongoose');
    await mongoose.default.connect(config.database.uri, config.database.options);
    console.log('✅ MongoDB connection successful');
    
    // Check if podcasts collection exists
    const collections = await mongoose.default.connection.db.listCollections().toArray();
    const podcastsCollection = collections.find(col => col.name === 'podcasts');
    
    if (podcastsCollection) {
      const Podcast = (await import('../models/Podcast.js')).default;
      const count = await Podcast.countDocuments();
      console.log(`📊 Found ${count} podcasts in database`);
      
      if (count === 0) {
        console.log('💡 Database is empty - you can import sample data');
        return 'empty';
      } else {
        console.log('✅ Database has podcast data');
        return 'has-data';
      }
    } else {
      console.log('📝 Podcasts collection not found - database is empty');
      return 'empty';
    }
    
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 MongoDB Setup Options:');
      console.log('1. 🌐 MongoDB Atlas (Cloud) - Recommended');
      console.log('   - Go to https://www.mongodb.com/atlas');
      console.log('   - Create free account and cluster');
      console.log('   - Get connection string');
      console.log('   - Update MONGODB_URI in .env file');
      console.log('');
      console.log('2. 💻 Local MongoDB Installation');
      console.log('   - Download from https://www.mongodb.com/try/download/community');
      console.log('   - Install and start MongoDB service');
      console.log('   - Use: mongodb://localhost:27017/dr-quadri-db');
    }
    
    return 'failed';
  }
}

// Check if server is running
async function checkServer() {
  console.log('\n🖥️  Checking if server is running...');
  
  try {
    const response = await fetch('http://localhost:5000/api/v1/health');
    if (response.ok) {
      console.log('✅ Server is running on port 5000');
      return true;
    } else {
      console.log('⚠️  Server responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Server is not running');
    console.log('\n🔧 To start the server:');
    console.log('1. Open new terminal');
    console.log('2. cd backend');
    console.log('3. npm install');
    console.log('4. npm run dev');
    return false;
  }
}

// Main setup function
async function runSetup() {
  console.log('🚀 Starting setup process...\n');
  
  // Step 1: Check environment
  const envOk = checkEnvironment();
  if (!envOk) {
    console.log('\n❌ Setup incomplete - please configure environment first');
    return;
  }
  
  // Step 2: Check MongoDB
  const mongoStatus = await checkMongoDB();
  if (mongoStatus === 'failed') {
    console.log('\n❌ Setup incomplete - please configure MongoDB first');
    console.log('📖 See MONGODB_SETUP.md for detailed instructions');
    return;
  }
  
  // Step 3: Check server
  const serverRunning = await checkServer();
  
  // Step 4: Provide next steps
  console.log('\n📋 Setup Status Summary:');
  console.log('========================');
  console.log(`Environment: ✅ Configured`);
  console.log(`MongoDB: ${mongoStatus === 'has-data' ? '✅ Connected (has data)' : mongoStatus === 'empty' ? '⚠️  Connected (empty)' : '❌ Failed'}`);
  console.log(`Server: ${serverRunning ? '✅ Running' : '❌ Not running'}`);
  
  console.log('\n🎯 Next Steps:');
  
  if (mongoStatus === 'empty') {
    console.log('1. 📥 Import sample data: node importPodcastData.js');
  }
  
  if (!serverRunning) {
    console.log('2. 🖥️  Start the server: npm run dev (in backend folder)');
  }
  
  if (serverRunning && mongoStatus === 'has-data') {
    console.log('1. 🧪 Test APIs: node testPodcastAPIs.js');
    console.log('2. 📮 Use Postman collection for detailed testing');
    console.log('3. 🎨 Start building admin interface');
  }
  
  console.log('\n📚 Available Scripts:');
  console.log('- node importPodcastData.js  # Import sample data');
  console.log('- node testPodcastAPIs.js    # Test all API endpoints');
  console.log('- node testServer.js         # Test server connection');
  console.log('- node generatePodcastJSON.js # Generate JSON file');
  
  console.log('\n📖 Documentation:');
  console.log('- README.md           # Complete API documentation');
  console.log('- MONGODB_SETUP.md    # MongoDB setup guide');
  console.log('- Postman Collection  # API testing collection');
  
  if (serverRunning && mongoStatus === 'has-data') {
    console.log('\n🎉 Setup Complete! Your Podcasts API is ready to use.');
  } else {
    console.log('\n⚠️  Setup needs attention - please follow the next steps above.');
  }
}

// Run setup
runSetup().catch(console.error);
