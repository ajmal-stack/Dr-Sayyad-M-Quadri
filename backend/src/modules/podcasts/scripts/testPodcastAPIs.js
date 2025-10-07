/**
 * Test script for Podcast APIs
 * This script tests all the podcast endpoints to ensure they work correctly
 * 
 * Usage: node testPodcastAPIs.js
 * Make sure your server is running on the specified port
 */

const BASE_URL = 'http://localhost:5000/api/v1/podcasts';

/**
 * Helper function to make HTTP requests
 */
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    
    return {
      status: response.status,
      success: response.ok,
      data
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

/**
 * Test all podcast API endpoints
 */
async function testPodcastAPIs() {
  console.log('🧪 Testing Podcast APIs...\n');
  
  const tests = [
    {
      name: 'GET /api/v1/podcasts - Get all podcasts',
      test: () => makeRequest(`${BASE_URL}?page=1&limit=5`)
    },
    {
      name: 'GET /api/v1/podcasts/featured - Get featured podcasts',
      test: () => makeRequest(`${BASE_URL}/featured?limit=3`)
    },
    {
      name: 'GET /api/v1/podcasts/latest - Get latest podcasts',
      test: () => makeRequest(`${BASE_URL}/latest?limit=3`)
    },
    {
      name: 'GET /api/v1/podcasts/categories - Get categories',
      test: () => makeRequest(`${BASE_URL}/categories`)
    },
    {
      name: 'GET /api/v1/podcasts/stats - Get statistics',
      test: () => makeRequest(`${BASE_URL}/stats`)
    },
    {
      name: 'GET /api/v1/podcasts/search - Search podcasts',
      test: () => makeRequest(`${BASE_URL}/search?q=anxiety&limit=3`)
    },
    {
      name: 'GET /api/v1/podcasts/category/Mental Health - Get by category',
      test: () => makeRequest(`${BASE_URL}/category/Mental Health`)
    },
    {
      name: 'GET /api/v1/podcasts/host/Dr. Syed M Quadri - Get by host',
      test: () => makeRequest(`${BASE_URL}/host/Dr. Syed M Quadri`)
    }
  ];

  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    console.log(`🔍 ${test.name}`);
    
    const result = await test.test();
    
    if (result.success && result.data.success) {
      console.log(`   ✅ PASSED - Status: ${result.status}`);
      if (result.data.data) {
        if (Array.isArray(result.data.data)) {
          console.log(`   📊 Returned ${result.data.data.length} items`);
        } else {
          console.log(`   📊 Returned data object`);
        }
      }
      passedTests++;
    } else {
      console.log(`   ❌ FAILED - Status: ${result.status}`);
      console.log(`   Error: ${result.error || result.data.message || 'Unknown error'}`);
      failedTests++;
    }
    console.log('');
  }

  // Test CRUD operations (Create, Read, Update, Delete)
  console.log('🔧 Testing CRUD Operations...\n');

  // Test Create
  console.log('🔍 POST /api/v1/podcasts - Create new podcast');
  const createResult = await makeRequest(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({
      title: 'Test Podcast Episode',
      description: 'This is a test podcast episode created by the API test script.',
      duration: '25:30',
      category: 'Test Category',
      audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
      coverImage: '/test-image.jpg',
      host: 'Dr. Syed M Quadri',
      episodeNumber: 999,
      tags: ['test', 'api', 'podcast'],
      showNotes: ['Introduction (0:00 - 5:00)', 'Main content (5:00 - 25:30)']
    })
  });

  let createdPodcastId = null;

  if (createResult.success && createResult.data.success) {
    console.log('   ✅ PASSED - Podcast created successfully');
    createdPodcastId = createResult.data.data._id;
    console.log(`   📊 Created podcast ID: ${createdPodcastId}`);
    passedTests++;
  } else {
    console.log('   ❌ FAILED - Could not create podcast');
    console.log(`   Error: ${createResult.error || createResult.data.message || 'Unknown error'}`);
    failedTests++;
  }
  console.log('');

  // Test Read (Get single podcast)
  if (createdPodcastId) {
    console.log('🔍 GET /api/v1/podcasts/:id - Get single podcast');
    const readResult = await makeRequest(`${BASE_URL}/${createdPodcastId}`);
    
    if (readResult.success && readResult.data.success) {
      console.log('   ✅ PASSED - Podcast retrieved successfully');
      console.log(`   📊 Title: ${readResult.data.data.title}`);
      passedTests++;
    } else {
      console.log('   ❌ FAILED - Could not retrieve podcast');
      console.log(`   Error: ${readResult.error || readResult.data.message || 'Unknown error'}`);
      failedTests++;
    }
    console.log('');

    // Test Update
    console.log('🔍 PUT /api/v1/podcasts/:id - Update podcast');
    const updateResult = await makeRequest(`${BASE_URL}/${createdPodcastId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: 'Updated Test Podcast Episode',
        description: 'This podcast has been updated by the API test script.',
        featured: true
      })
    });
    
    if (updateResult.success && updateResult.data.success) {
      console.log('   ✅ PASSED - Podcast updated successfully');
      console.log(`   📊 New title: ${updateResult.data.data.title}`);
      passedTests++;
    } else {
      console.log('   ❌ FAILED - Could not update podcast');
      console.log(`   Error: ${updateResult.error || updateResult.data.message || 'Unknown error'}`);
      failedTests++;
    }
    console.log('');

    // Test Delete
    console.log('🔍 DELETE /api/v1/podcasts/:id - Delete podcast');
    const deleteResult = await makeRequest(`${BASE_URL}/${createdPodcastId}`, {
      method: 'DELETE'
    });
    
    if (deleteResult.success && deleteResult.data.success) {
      console.log('   ✅ PASSED - Podcast deleted successfully');
      passedTests++;
    } else {
      console.log('   ❌ FAILED - Could not delete podcast');
      console.log(`   Error: ${deleteResult.error || deleteResult.data.message || 'Unknown error'}`);
      failedTests++;
    }
    console.log('');
  }

  // Test Summary
  console.log('📋 Test Summary:');
  console.log(`   ✅ Passed: ${passedTests}`);
  console.log(`   ❌ Failed: ${failedTests}`);
  console.log(`   📊 Total: ${passedTests + failedTests}`);
  console.log(`   🎯 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);

  if (failedTests === 0) {
    console.log('\n🎉 All tests passed! Podcast API is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the server and try again.');
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testPodcastAPIs().catch(console.error);
}

export { testPodcastAPIs };
