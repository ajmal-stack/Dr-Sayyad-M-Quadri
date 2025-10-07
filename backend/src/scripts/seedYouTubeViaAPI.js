// Using built-in fetch (Node.js 18+)

const API_BASE_URL = 'http://localhost:5000/api/v1/youtube';

async function seedViaAPI() {
  try {
    console.log('🎬 Starting YouTube database seeding via API...');

    // Test if server is running
    console.log('🔍 Checking if server is running...');
    const healthCheck = await fetch('http://localhost:5000/health');
    
    if (!healthCheck.ok) {
      throw new Error('Server is not running. Please start the server first with: npm start');
    }

    console.log('✅ Server is running');

    // Call the seed endpoint
    console.log('📡 Calling seed endpoint...');
    const response = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ ' + result.message);
      
      // Get statistics to verify
      const statsResponse = await fetch(`${API_BASE_URL}/stats`);
      const stats = await statsResponse.json();
      
      if (stats.success && stats.data.overall) {
        console.log('\n📊 YouTube Database Statistics:');
        console.log('================================');
        console.log(`📺 Total Videos: ${stats.data.overall.totalVideos}`);
        console.log(`👀 Total Views: ${stats.data.overall.totalViews?.toLocaleString()}`);
        console.log(`❤️  Total Likes: ${stats.data.overall.totalLikes?.toLocaleString()}`);
        console.log(`⭐ Featured Videos: ${stats.data.overall.featuredCount}`);
        console.log(`🔥 Trending Videos: ${stats.data.overall.trendingCount}`);
        console.log(`🆕 New Videos: ${stats.data.overall.newCount}`);
        
        console.log('\n📊 Videos by Category:');
        console.log('=====================');
        stats.data.byCategory?.forEach(cat => {
          console.log(`${cat._id}: ${cat.count} videos (${cat.totalViews?.toLocaleString()} views)`);
        });
      }
      
      console.log('\n🎉 YouTube database seeding completed successfully via API!');
      
    } else {
      console.error('❌ Seeding failed:', result.message);
    }

  } catch (error) {
    console.error('❌ Error seeding YouTube database:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solutions:');
      console.log('1. Start the main server: npm start (in backend directory)');
      console.log('2. Or use: node src/index.js');
      console.log('3. Make sure the server is running on http://localhost:5000');
    }
  }
}

// Run the seeding
seedViaAPI();
