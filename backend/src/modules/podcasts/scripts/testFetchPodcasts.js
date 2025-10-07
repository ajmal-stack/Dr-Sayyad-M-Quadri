/**
 * Test fetching podcasts from API
 */

const BASE_URL = 'http://localhost:5000/api/v1/podcasts';

async function testFetchPodcasts() {
  console.log('🔍 Testing podcast API endpoints...\n');
  
  try {
    // Test 1: Get all podcasts
    console.log('1. Testing GET /api/v1/podcasts');
    const response1 = await fetch(BASE_URL);
    const result1 = await response1.json();
    
    console.log('   Status:', response1.status);
    console.log('   Success:', result1.success);
    console.log('   Total podcasts:', result1.data?.length || 0);
    console.log('   Pagination:', result1.pagination);
    
    if (result1.data && result1.data.length > 0) {
      console.log('   First podcast:', {
        id: result1.data[0]._id,
        title: result1.data[0].title,
        episode: result1.data[0].episodeNumber,
        isActive: result1.data[0].isActive,
        isPublished: result1.data[0].isPublished
      });
    }
    
    // Test 2: Get podcasts with explicit parameters
    console.log('\n2. Testing with explicit parameters');
    const response2 = await fetch(`${BASE_URL}?isActive=true&isPublished=true&limit=5`);
    const result2 = await response2.json();
    
    console.log('   Status:', response2.status);
    console.log('   Success:', result2.success);
    console.log('   Total podcasts:', result2.data?.length || 0);
    
    // Test 3: Get all podcasts without filters
    console.log('\n3. Testing without active/published filters');
    const response3 = await fetch(`${BASE_URL}?limit=10`);
    const result3 = await response3.json();
    
    console.log('   Status:', response3.status);
    console.log('   Success:', result3.success);
    console.log('   Total podcasts:', result3.data?.length || 0);
    
    // Test 4: Get featured podcasts
    console.log('\n4. Testing featured endpoint');
    const response4 = await fetch(`${BASE_URL}/featured`);
    const result4 = await response4.json();
    
    console.log('   Status:', response4.status);
    console.log('   Success:', result4.success);
    console.log('   Featured podcasts:', result4.data?.length || 0);
    
    // Test 5: Get categories
    console.log('\n5. Testing categories endpoint');
    const response5 = await fetch(`${BASE_URL}/categories`);
    const result5 = await response5.json();
    
    console.log('   Status:', response5.status);
    console.log('   Success:', result5.success);
    console.log('   Categories:', result5.data);
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Run the test
testFetchPodcasts();
