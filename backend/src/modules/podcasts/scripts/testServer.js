/**
 * Test if the backend server is running and accessible
 */

const BASE_URL = 'http://localhost:5000';

async function testServer() {
  console.log('🔍 Testing server connection...');
  console.log('Server URL:', BASE_URL);
  
  try {
    // Test basic server health
    const response = await fetch(`${BASE_URL}/api/v1/health`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Server is running!');
      console.log('📊 Server info:', data);
      return true;
    } else {
      console.log('⚠️  Server responded but with error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Server is not running or not accessible');
    console.log('Error:', error.message);
    console.log('\n🔧 To start the server:');
    console.log('1. Open a new terminal');
    console.log('2. Navigate to backend folder: cd backend');
    console.log('3. Install dependencies: npm install');
    console.log('4. Start server: npm run dev');
    console.log('5. Wait for "Server running on port 5000" message');
    return false;
  }
}

// Test basic API endpoints if server is running
async function testBasicEndpoints() {
  console.log('\n🧪 Testing basic API endpoints...');
  
  const endpoints = [
    '/api/v1/podcasts',
    '/api/v1/podcasts/featured',
    '/api/v1/podcasts/categories',
    '/api/v1/podcasts/stats'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        console.log(`✅ ${endpoint} - Working`);
        if (data.data && Array.isArray(data.data)) {
          console.log(`   📊 Returned ${data.data.length} items`);
        }
      } else {
        console.log(`❌ ${endpoint} - Error: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Connection error: ${error.message}`);
    }
  }
}

// Main test function
async function runTests() {
  console.log('🎯 Server and API Test Suite\n');
  
  const serverRunning = await testServer();
  
  if (serverRunning) {
    await testBasicEndpoints();
    
    console.log('\n🎉 Server tests completed!');
    console.log('\n🎯 Next steps:');
    console.log('1. Import podcast data: node importPodcastData.js');
    console.log('2. Test all APIs: node testPodcastAPIs.js');
    console.log('3. Use Postman collection for detailed testing');
  } else {
    console.log('\n⚠️  Please start the server first, then run this test again.');
  }
}

// Run tests
runTests().catch(console.error);
