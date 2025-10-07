import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import YouTube from '../modules/youtube/models/YouTube.js';
import { config } from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedYouTubeDatabase() {
  try {
    console.log('🎬 Starting YouTube database seeding...');

    // Connect to MongoDB
    await mongoose.connect(config.database.uri);
    console.log('✅ Connected to MongoDB');

    // Read the YouTube JSON file
    const jsonPath = path.join(__dirname, '../../client/src/data/youtube.json');
    const jsonData = await fs.readFile(jsonPath, 'utf8');
    const videos = JSON.parse(jsonData);

    console.log(`📊 Found ${videos.length} videos in JSON file`);

    // Clear existing YouTube data
    await YouTube.deleteMany({});
    console.log('🗑️  Cleared existing YouTube data');

    // Transform and insert data
    const transformedVideos = videos.map(video => ({
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      duration: video.duration,
      views: video.views || 0,
      likes: video.likes || 0,
      publishDate: new Date(video.publishDate),
      category: video.category,
      tags: video.tags || [],
      channelName: video.channelName || 'Dr. Syed M Quadri',
      isNew: video.isNew || false,
      featured: video.featured || false,
      isTrending: video.isTrending || false,
      isActive: true
    }));

    // Insert videos in batches
    const batchSize = 10;
    let insertedCount = 0;

    for (let i = 0; i < transformedVideos.length; i += batchSize) {
      const batch = transformedVideos.slice(i, i + batchSize);
      await YouTube.insertMany(batch);
      insertedCount += batch.length;
      console.log(`📥 Inserted ${insertedCount}/${transformedVideos.length} videos`);
    }

    // Verify insertion
    const totalVideos = await YouTube.countDocuments();
    console.log(`✅ Successfully seeded ${totalVideos} YouTube videos`);

    // Display statistics
    const stats = await YouTube.aggregate([
      {
        $group: {
          _id: null,
          totalVideos: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          featuredCount: { $sum: { $cond: ['$featured', 1, 0] } },
          trendingCount: { $sum: { $cond: ['$isTrending', 1, 0] } },
          newCount: { $sum: { $cond: ['$isNew', 1, 0] } }
        }
      }
    ]);

    const categoryStats = await YouTube.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    console.log('\n📊 YouTube Database Statistics:');
    console.log('================================');
    if (stats[0]) {
      console.log(`📺 Total Videos: ${stats[0].totalVideos}`);
      console.log(`👀 Total Views: ${stats[0].totalViews.toLocaleString()}`);
      console.log(`❤️  Total Likes: ${stats[0].totalLikes.toLocaleString()}`);
      console.log(`⭐ Featured Videos: ${stats[0].featuredCount}`);
      console.log(`🔥 Trending Videos: ${stats[0].trendingCount}`);
      console.log(`🆕 New Videos: ${stats[0].newCount}`);
    }

    console.log('\n📊 Videos by Category:');
    console.log('=====================');
    categoryStats.forEach(cat => {
      console.log(`${cat._id}: ${cat.count} videos (${cat.totalViews.toLocaleString()} views)`);
    });

    console.log('\n🎉 YouTube database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding YouTube database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seeding function
seedYouTubeDatabase();
