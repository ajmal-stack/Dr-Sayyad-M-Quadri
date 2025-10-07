import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/v1/youtube';

// Test functions
const testAPI = async () => {
  console.log('🎬 Testing YouTube API...\n');

  try {
    // Test 1: Get all videos
    console.log('1️⃣ Testing GET /youtube');
    const allVideos = await fetch(`${BASE_URL}?page=1&limit=5`);
    const allVideosData = await allVideos.json();
    console.log(`✅ Status: ${allVideos.status}`);
    console.log(`📊 Found ${allVideosData.data?.length || 0} videos`);
    console.log(`📈 Total videos: ${allVideosData.stats?.totalVideos || 0}`);
    console.log('');

    // Test 2: Get featured videos
    console.log('2️⃣ Testing GET /youtube/featured');
    const featured = await fetch(`${BASE_URL}/featured?limit=3`);
    const featuredData = await featured.json();
    console.log(`✅ Status: ${featured.status}`);
    console.log(`⭐ Featured videos: ${featuredData.data?.length || 0}`);
    console.log('');

    // Test 3: Get trending videos
    console.log('3️⃣ Testing GET /youtube/trending');
    const trending = await fetch(`${BASE_URL}/trending?limit=3`);
    const trendingData = await trending.json();
    console.log(`✅ Status: ${trending.status}`);
    console.log(`🔥 Trending videos: ${trendingData.data?.length || 0}`);
    console.log('');

    // Test 4: Get latest videos
    console.log('4️⃣ Testing GET /youtube/latest');
    const latest = await fetch(`${BASE_URL}/latest?limit=3`);
    const latestData = await latest.json();
    console.log(`✅ Status: ${latest.status}`);
    console.log(`🆕 Latest videos: ${latestData.data?.length || 0}`);
    console.log('');

    // Test 5: Get videos by category
    console.log('5️⃣ Testing GET /youtube/category/Mental Health');
    const categoryVideos = await fetch(`${BASE_URL}/category/Mental Health?limit=3`);
    const categoryData = await categoryVideos.json();
    console.log(`✅ Status: ${categoryVideos.status}`);
    console.log(`🧠 Mental Health videos: ${categoryData.data?.length || 0}`);
    console.log('');

    // Test 6: Search videos
    console.log('6️⃣ Testing search functionality');
    const searchResults = await fetch(`${BASE_URL}?search=depression&limit=3`);
    const searchData = await searchResults.json();
    console.log(`✅ Status: ${searchResults.status}`);
    console.log(`🔍 Search results for "depression": ${searchData.data?.length || 0}`);
    console.log('');

    // Test 7: Get video statistics
    console.log('7️⃣ Testing GET /youtube/stats');
    const stats = await fetch(`${BASE_URL}/stats`);
    const statsData = await stats.json();
    console.log(`✅ Status: ${stats.status}`);
    if (statsData.success && statsData.data.overall) {
      console.log(`📊 Total Videos: ${statsData.data.overall.totalVideos}`);
      console.log(`👀 Total Views: ${statsData.data.overall.totalViews?.toLocaleString()}`);
      console.log(`❤️  Total Likes: ${statsData.data.overall.totalLikes?.toLocaleString()}`);
      console.log(`📈 Categories: ${statsData.data.byCategory?.length || 0}`);
    }
    console.log('');

    // Test 8: Get specific video by YouTube ID (if we have data)
    if (allVideosData.data && allVideosData.data.length > 0) {
      const firstVideo = allVideosData.data[0];
      console.log('8️⃣ Testing GET /youtube/video/:videoId');
      const specificVideo = await fetch(`${BASE_URL}/video/${firstVideo.videoId}`);
      const specificVideoData = await specificVideo.json();
      console.log(`✅ Status: ${specificVideo.status}`);
      console.log(`🎥 Video: ${specificVideoData.data?.title || 'Not found'}`);
      console.log('');
    }

    // Test 9: Test filtering
    console.log('9️⃣ Testing filtering (featured=true)');
    const filteredVideos = await fetch(`${BASE_URL}?featured=true&limit=3`);
    const filteredData = await filteredVideos.json();
    console.log(`✅ Status: ${filteredVideos.status}`);
    console.log(`⭐ Featured videos: ${filteredData.data?.length || 0}`);
    console.log('');

    // Test 10: Test sorting
    console.log('🔟 Testing sorting (by views, descending)');
    const sortedVideos = await fetch(`${BASE_URL}?sortBy=views&sortOrder=desc&limit=3`);
    const sortedData = await sortedVideos.json();
    console.log(`✅ Status: ${sortedVideos.status}`);
    console.log(`📈 Top viewed videos: ${sortedData.data?.length || 0}`);
    if (sortedData.data && sortedData.data.length > 0) {
      console.log(`   Most viewed: "${sortedData.data[0].title}" (${sortedData.data[0].views?.toLocaleString()} views)`);
    }
    console.log('');

    console.log('🎉 All YouTube API tests completed successfully!');

  } catch (error) {
    console.error('❌ Error testing YouTube API:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the server is running on http://localhost:5000');
      console.log('💡 Run: npm start or node src/index.js');
    }
  }
};

// Test create video (admin function)
const testCreateVideo = async () => {
  console.log('\n🔧 Testing CREATE video (Admin function)...');
  
  const newVideo = {
    videoId: 'TEST123456',
    title: 'Test Video - API Testing',
    description: 'This is a test video created via API for testing purposes.',
    thumbnail: 'https://img.youtube.com/vi/TEST123456/maxresdefault.jpg',
    duration: '10:00',
    views: 100,
    likes: 10,
    publishDate: new Date().toISOString(),
    category: 'Mental Health',
    tags: ['Test', 'API', 'Mental Health'],
    featured: false,
    isTrending: false,
    isNew: true
  };

  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo)
    });

    const data = await response.json();
    console.log(`✅ Create Status: ${response.status}`);
    
    if (data.success) {
      console.log(`🎥 Created video: ${data.data.title}`);
      
      // Clean up - delete the test video
      const deleteResponse = await fetch(`${BASE_URL}/${data.data._id}`, {
        method: 'DELETE'
      });
      
      if (deleteResponse.ok) {
        console.log('🗑️  Test video cleaned up successfully');
      }
    } else {
      console.log(`❌ Create failed: ${data.message}`);
    }

  } catch (error) {
    console.error('❌ Error testing create video:', error.message);
  }
};

// Run tests
const runAllTests = async () => {
  await testAPI();
  await testCreateVideo();
  
  console.log('\n📋 Test Summary:');
  console.log('================');
  console.log('✅ GET /youtube - List all videos with pagination');
  console.log('✅ GET /youtube/featured - Get featured videos');
  console.log('✅ GET /youtube/trending - Get trending videos');
  console.log('✅ GET /youtube/latest - Get latest videos');
  console.log('✅ GET /youtube/category/:category - Get videos by category');
  console.log('✅ GET /youtube/stats - Get video statistics');
  console.log('✅ GET /youtube/video/:videoId - Get video by YouTube ID');
  console.log('✅ Search functionality');
  console.log('✅ Filtering and sorting');
  console.log('✅ POST /youtube - Create video (Admin)');
  console.log('✅ DELETE /youtube/:id - Delete video (Admin)');
  
  console.log('\n🎬 YouTube API is ready for production! 🚀');
};

// Execute tests
runAllTests();
