/**
 * Test creating a podcast via API
 * This bypasses the direct MongoDB connection and uses the running server
 */

const BASE_URL = 'http://localhost:5000/api/v1/podcasts';

const samplePodcast = {
  title: "Understanding Anxiety: A Deep Dive into Mental Wellness",
  description: "Explore the complexities of anxiety disorders and discover practical strategies for managing stress and promoting mental well-being in daily life. In this comprehensive episode, we delve into the science behind anxiety, discuss evidence-based treatment approaches, and share real-world strategies that you can implement today.",
  duration: "45:30",
  category: "Mental Health",
  audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
  coverImage: "/hero banner/1.png",
  featured: true,
  host: "Dr. Syed M Quadri",
  episodeNumber: 1,
  transcript: "Welcome to today's episode on understanding anxiety. Anxiety is one of the most common mental health challenges we face today, affecting millions of people worldwide. In this episode, we'll explore what anxiety really is, how it manifests in our daily lives, and most importantly, what we can do about it.",
  showNotes: [
    "Introduction to anxiety and its prevalence (0:00 - 5:00)",
    "Understanding the difference between normal anxiety and anxiety disorders (5:00 - 12:00)",
    "Common types of anxiety disorders (12:00 - 20:00)",
    "Evidence-based treatment approaches (20:00 - 35:00)",
    "Practical daily strategies for managing anxiety (35:00 - 45:30)"
  ],
  tags: ["anxiety", "mental-health", "wellness", "psychology", "self-care"],
  isActive: true,
  isPublished: true
};

async function createTestPodcast() {
  console.log('🧪 Creating test podcast via API...');
  
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(samplePodcast),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Test podcast created successfully!');
      console.log('📊 Podcast ID:', result.data._id);
      console.log('📝 Title:', result.data.title);
      console.log('🏷️  Episode:', result.data.episodeNumber);
      
      // Now test fetching all podcasts
      console.log('\n🔍 Testing fetch all podcasts...');
      const fetchResponse = await fetch(BASE_URL);
      const fetchResult = await fetchResponse.json();
      
      if (fetchResponse.ok && fetchResult.success) {
        console.log('✅ Fetch successful!');
        console.log('📊 Total podcasts:', fetchResult.data.length);
        console.log('📋 Pagination:', fetchResult.pagination);
      } else {
        console.log('❌ Fetch failed:', fetchResult.message);
      }
      
    } else {
      console.log('❌ Failed to create podcast');
      console.log('Status:', response.status);
      console.log('Error:', result.message || result.error || 'Unknown error');
      console.log('Details:', result);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Run the test
createTestPodcast();
