/**
 * Test script for Treatment API
 * Run with: node testTreatmentAPI.js
 */

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Test data
const testTreatment = {
  name: 'Test Anxiety Treatment',
  description: 'This is a test treatment for anxiety disorders with comprehensive care.',
  detailedDescription: 'Detailed description of the anxiety treatment program including CBT, exposure therapy, and mindfulness techniques.',
  category: 'Mental Health',
  duration: '8-12 sessions',
  methods: ['CBT', 'Exposure Therapy', 'Mindfulness'],
  conditions: ['Panic Disorder', 'Social Anxiety', 'GAD'],
  gradient: 'from-blue-500 to-indigo-600',
  sections: [
    {
      id: 'what-is-anxiety',
      title: 'What is Anxiety?',
      content: '<p>Anxiety is a natural response to stress...</p>',
      order: 1
    },
    {
      id: 'treatment-approach',
      title: 'Treatment Approach',
      content: '<p>Our evidence-based approach combines...</p>',
      order: 2
    }
  ],
  onThisPage: [
    { name: 'What is anxiety?', href: '#what-is-anxiety', order: 1 },
    { name: 'Treatment approach', href: '#treatment-approach', order: 2 }
  ],
  informationCards: [
    {
      title: 'Free consultation',
      description: 'Schedule a free 15-minute consultation to discuss your needs.',
      icon: 'BookOpenIcon',
      bgColor: 'bg-blue-500'
    }
  ],
  keyPoints: [
    'Evidence-based treatment approaches',
    'Personalized care plans',
    'Flexible scheduling options'
  ],
  status: 'published',
  featured: true,
  active: true
};

async function testAPI() {
  console.log('🧪 Starting Treatment API Tests...\n');

  try {
    // Test 1: Get all treatments
    console.log('📝 Test 1: GET /treatments');
    const allTreatments = await fetch(`${API_BASE_URL}/treatments?limit=10`);
    const allData = await allTreatments.json();
    console.log(`✅ Status: ${allTreatments.status}`);
    console.log(`   Found ${allData.data?.length || 0} treatments`);
    console.log(`   Total: ${allData.pagination?.totalTreatments || 0}\n`);

    // Test 2: Get featured treatments
    console.log('📝 Test 2: GET /treatments/featured');
    const featured = await fetch(`${API_BASE_URL}/treatments/featured`);
    const featuredData = await featured.json();
    console.log(`✅ Status: ${featured.status}`);
    console.log(`   Found ${featuredData.data?.length || 0} featured treatments\n`);

    // Test 3: Get statistics
    console.log('📝 Test 3: GET /treatments/stats');
    const stats = await fetch(`${API_BASE_URL}/treatments/stats`);
    const statsData = await stats.json();
    console.log(`✅ Status: ${stats.status}`);
    console.log(`   Total: ${statsData.data?.total || 0}`);
    console.log(`   Published: ${statsData.data?.published || 0}`);
    console.log(`   Mental Health: ${statsData.data?.byCategory?.mentalHealth || 0}`);
    console.log(`   General Health: ${statsData.data?.byCategory?.generalHealth || 0}\n`);

    // Test 4: Get categories
    console.log('📝 Test 4: GET /treatments/categories');
    const categories = await fetch(`${API_BASE_URL}/treatments/categories`);
    const categoriesData = await categories.json();
    console.log(`✅ Status: ${categories.status}`);
    console.log(`   Categories:`, categoriesData.data?.map(c => `${c.name} (${c.count})`).join(', ') || 'None');
    console.log();

    // Test 5: Create treatment
    console.log('📝 Test 5: POST /treatments (Create)');
    const create = await fetch(`${API_BASE_URL}/treatments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testTreatment)
    });
    const createData = await create.json();
    console.log(`✅ Status: ${create.status}`);
    
    if (createData.success) {
      const createdId = createData.data._id;
      const createdSlug = createData.data.slug;
      console.log(`   Created ID: ${createdId}`);
      console.log(`   Slug: ${createdSlug}\n`);

      // Test 6: Get by ID
      console.log('📝 Test 6: GET /treatments/:id (by ID)');
      const byId = await fetch(`${API_BASE_URL}/treatments/${createdId}`);
      const byIdData = await byId.json();
      console.log(`✅ Status: ${byId.status}`);
      console.log(`   Name: ${byIdData.data?.name}\n`);

      // Test 7: Get by slug
      console.log('📝 Test 7: GET /treatments/:slug (by slug)');
      const bySlug = await fetch(`${API_BASE_URL}/treatments/${createdSlug}`);
      const bySlugData = await bySlug.json();
      console.log(`✅ Status: ${bySlug.status}`);
      console.log(`   Name: ${bySlugData.data?.name}\n`);

      // Test 8: Update treatment
      console.log('📝 Test 8: PUT /treatments/:id (Update)');
      const update = await fetch(`${API_BASE_URL}/treatments/${createdId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: 'Updated description for testing purposes.',
          views: 100
        })
      });
      const updateData = await update.json();
      console.log(`✅ Status: ${update.status}`);
      console.log(`   Updated description: ${updateData.data?.description?.substring(0, 50)}...\n`);

      // Test 9: Track engagement
      console.log('📝 Test 9: POST /treatments/:id/track (Track view)');
      const track = await fetch(`${API_BASE_URL}/treatments/${createdId}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'view' })
      });
      const trackData = await track.json();
      console.log(`✅ Status: ${track.status}`);
      console.log(`   Message: ${trackData.message}\n`);

      // Test 10: Search
      console.log('📝 Test 10: GET /treatments/search?q=anxiety');
      const search = await fetch(`${API_BASE_URL}/treatments/search?q=anxiety`);
      const searchData = await search.json();
      console.log(`✅ Status: ${search.status}`);
      console.log(`   Found ${searchData.data?.length || 0} results\n`);

      // Test 11: Get by category
      console.log('📝 Test 11: GET /treatments/category/mental-health');
      const byCategory = await fetch(`${API_BASE_URL}/treatments/category/mental-health`);
      const byCategoryData = await byCategory.json();
      console.log(`✅ Status: ${byCategory.status}`);
      console.log(`   Found ${byCategoryData.data?.length || 0} mental health treatments\n`);

      // Test 12: Delete treatment
      console.log('📝 Test 12: DELETE /treatments/:id (Soft delete)');
      const deleteResp = await fetch(`${API_BASE_URL}/treatments/${createdId}`, {
        method: 'DELETE'
      });
      const deleteData = await deleteResp.json();
      console.log(`✅ Status: ${deleteResp.status}`);
      console.log(`   Message: ${deleteData.message}\n`);

      // Verify soft delete
      console.log('📝 Test 13: Verify soft delete (should still exist with active=false)');
      const afterDelete = await fetch(`${API_BASE_URL}/treatments/${createdId}`);
      const afterDeleteData = await afterDelete.json();
      console.log(`✅ Status: ${afterDelete.status}`);
      console.log(`   Active: ${afterDeleteData.data?.active}`);
      console.log(`   Status: ${afterDeleteData.data?.status}\n`);

    } else {
      console.log(`❌ Failed to create treatment: ${createData.message}\n`);
    }

    console.log('✅ All tests completed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
  }
}

// Run tests
console.log('🚀 Treatment API Test Suite');
console.log('============================\n');
testAPI();
