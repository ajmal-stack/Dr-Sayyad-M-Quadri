import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';
import database from '../config/database.js';
import Podcast from '../modules/podcasts/models/Podcast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed Podcasts Data
 * Migrates podcasts from frontend JSON to MongoDB
 */

// Sample podcasts data based on your frontend structure
const samplePodcastsData = {
  "episodes": [
    {
      "title": "Understanding Anxiety: A Deep Dive into Mental Wellness",
      "description": "Explore the complexities of anxiety disorders and discover practical strategies for managing stress and promoting mental well-being in daily life. In this comprehensive episode, we delve into the science behind anxiety, discuss evidence-based treatment approaches, and share real-world strategies that you can implement today.",
      "duration": "45:30",
      "publishDate": "2024-01-15",
      "category": "Mental Health",
      "audioUrl": "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      "coverImage": "/hero banner/1.png",
      "featured": true,
      "views": 12500,
      "likes": 890,
      "downloads": 3200,
      "host": "Dr. Syed M Quadri",
      "episodeNumber": 42,
      "transcript": "Welcome to today's episode on understanding anxiety. Anxiety is one of the most common mental health challenges we face today, affecting millions of people worldwide. In this episode, we'll explore what anxiety really is, how it manifests in our daily lives, and most importantly, what we can do about it.\n\nFirst, let's understand that anxiety is a normal human emotion. It's our body's natural response to stress and potential threats. However, when anxiety becomes overwhelming or interferes with our daily functioning, it may indicate an anxiety disorder that requires attention and care.\n\nThere are several types of anxiety disorders, including generalized anxiety disorder, panic disorder, social anxiety disorder, and specific phobias. Each has its own unique characteristics and treatment approaches.\n\nResearch shows that cognitive-behavioral therapy, mindfulness practices, and in some cases medication can be highly effective in managing anxiety. The key is finding the right combination of strategies that work for you.",
      "showNotes": [
        "Introduction to anxiety and its prevalence (0:00 - 5:00)",
        "Understanding the difference between normal anxiety and anxiety disorders (5:00 - 12:00)",
        "Common types of anxiety disorders (12:00 - 20:00)",
        "Evidence-based treatment approaches (20:00 - 35:00)",
        "Practical daily strategies for managing anxiety (35:00 - 45:30)"
      ],
      "tags": ["anxiety", "mental-health", "wellness", "psychology", "self-care"]
    },
    {
      "title": "Nutrition and Brain Health: The Science Connection",
      "description": "Discover how nutrition directly impacts brain function, mood, and cognitive performance. Dr. Quadri discusses the latest research on brain-healthy foods, supplements, and dietary patterns that support mental wellness.",
      "duration": "38:15",
      "publishDate": "2024-02-10",
      "category": "Health & Wellness",
      "audioUrl": "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      "coverImage": "/hero banner/2.jpg",
      "featured": false,
      "views": 8750,
      "likes": 654,
      "downloads": 2100,
      "host": "Dr. Syed M Quadri",
      "episodeNumber": 43,
      "transcript": "Today we're exploring the fascinating connection between nutrition and brain health. What we eat doesn't just fuel our bodies – it directly impacts our brain function, mood, and cognitive abilities. The brain consumes about 20% of our daily calories, making nutrition crucial for optimal mental performance.\n\nResearch shows that certain nutrients are particularly important for brain health. Omega-3 fatty acids, found in fish, walnuts, and flaxseeds, are essential for brain structure and function. Antioxidants from colorful fruits and vegetables protect against oxidative stress. B vitamins support neurotransmitter production.\n\nThe Mediterranean diet has shown remarkable benefits for cognitive health and may reduce the risk of depression and anxiety. This eating pattern emphasizes whole foods, healthy fats, and plenty of vegetables.",
      "showNotes": [
        "The brain-nutrition connection (0:00 - 8:00)",
        "Key nutrients for brain health (8:00 - 18:00)",
        "The Mediterranean diet and mental wellness (18:00 - 28:00)",
        "Practical meal planning for brain health (28:00 - 38:15)"
      ],
      "tags": ["nutrition", "brain-health", "diet", "wellness", "cognitive-function"]
    },
    {
      "title": "Sleep and Mental Health: Breaking the Cycle",
      "description": "Examine the bidirectional relationship between sleep and mental health. Learn evidence-based strategies for improving sleep quality and how better sleep can enhance mood, cognition, and overall mental wellness.",
      "duration": "42:20",
      "publishDate": "2024-03-05",
      "category": "Mental Health",
      "audioUrl": "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      "coverImage": "/hero banner/3.png",
      "featured": true,
      "views": 15200,
      "likes": 1120,
      "downloads": 4500,
      "host": "Dr. Syed M Quadri",
      "episodeNumber": 44,
      "transcript": "Sleep and mental health are intimately connected in what we call a bidirectional relationship. Poor sleep can contribute to mental health problems, while mental health issues can disrupt sleep patterns. Understanding this connection is crucial for overall wellness.\n\nSleep plays a vital role in emotional regulation, memory consolidation, and stress recovery. During sleep, our brains process emotions and experiences from the day. When we don't get enough quality sleep, we're more likely to experience anxiety, depression, and difficulty managing stress.\n\nGood sleep hygiene includes maintaining a consistent sleep schedule, creating a relaxing bedtime routine, and optimizing your sleep environment. The bedroom should be cool, dark, and quiet.",
      "showNotes": [
        "The sleep-mental health connection (0:00 - 10:00)",
        "How sleep affects emotional regulation (10:00 - 20:00)",
        "Sleep hygiene fundamentals (20:00 - 32:00)",
        "Advanced sleep optimization strategies (32:00 - 42:20)"
      ],
      "tags": ["sleep", "mental-health", "insomnia", "wellness", "sleep-hygiene"]
    },
    {
      "title": "Mindfulness in Daily Life: Practical Applications",
      "description": "Learn how to integrate mindfulness practices into your busy daily routine. This episode covers simple techniques that can be done anywhere, anytime to reduce stress and increase present-moment awareness.",
      "duration": "35:45",
      "publishDate": "2024-03-20",
      "category": "Psychology",
      "audioUrl": "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      "coverImage": "/hero banner/4.png",
      "featured": false,
      "views": 9800,
      "likes": 742,
      "downloads": 2800,
      "host": "Dr. Syed M Quadri",
      "episodeNumber": 45,
      "transcript": "Mindfulness doesn't require hours of meditation or special equipment. It's about bringing conscious awareness to the present moment, and it can be practiced anywhere, anytime. In our fast-paced world, these simple practices can make a profound difference in our stress levels and overall well-being.\n\nOne of the simplest mindfulness techniques is mindful breathing. Take a moment right now to notice your breath. Feel the air entering and leaving your nostrils. This simple practice can be done during a commute, before a meeting, or anytime you feel stressed.\n\nMindful eating is another powerful practice. Instead of rushing through meals, try eating slowly and paying attention to the flavors, textures, and sensations of your food.",
      "showNotes": [
        "What is mindfulness? (0:00 - 8:00)",
        "Mindful breathing techniques (8:00 - 15:00)",
        "Mindful eating practices (15:00 - 25:00)",
        "Integrating mindfulness into work and daily activities (25:00 - 35:45)"
      ],
      "tags": ["mindfulness", "meditation", "stress-reduction", "present-moment", "wellness"]
    }
  ]
};

/**
 * Transform podcast data to match our schema
 */
function transformPodcastData(podcast, index) {
  // Generate a unique slug
  const baseSlug = podcast.title ? podcast.title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-') : `podcast-${index}`;
  
  const slug = `${baseSlug}-${Date.now()}-${index}`; // Ensure uniqueness
  
  return {
    title: podcast.title,
    slug: slug,
    description: podcast.description,
    duration: podcast.duration,
    publishDate: podcast.publishDate ? new Date(podcast.publishDate) : new Date(),
    category: podcast.category,
    audioUrl: podcast.audioUrl,
    coverImage: podcast.coverImage,
    featured: podcast.featured || false,
    views: podcast.views || Math.floor(Math.random() * 1000) + 100,
    likes: podcast.likes || Math.floor(Math.random() * 100) + 10,
    downloads: podcast.downloads || Math.floor(Math.random() * 500) + 50,
    host: podcast.host || 'Dr. Syed M Quadri',
    episodeNumber: podcast.episodeNumber || index + 1,
    transcript: podcast.transcript,
    showNotes: podcast.showNotes || [],
    tags: podcast.tags || [],
    isActive: true,
    isPublished: true,
    // Add some sample engagement metrics
    averageListenTime: Math.floor(Math.random() * 1800) + 600, // 10-40 minutes
    completionRate: Math.floor(Math.random() * 40) + 60, // 60-100%
    // Add sample audio metadata
    audioMetadata: {
      fileSize: Math.floor(Math.random() * 50000000) + 10000000, // 10-60MB
      bitrate: '128kbps',
      format: 'mp3',
      sampleRate: '44.1kHz'
    }
  };
}

/**
 * Seed podcasts from JSON data
 */
async function seedPodcasts() {
  try {
    console.log('🌱 Starting podcasts seeding process...');

    // Connect to database
    await database.connect();

    // Clear existing podcasts (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing podcasts...');
    await Podcast.deleteMany({});

    // Prepare podcasts data
    const allPodcasts = samplePodcastsData.episodes;

    console.log(`🎧 Preparing to seed ${allPodcasts.length} podcasts...`);

    // Transform and insert podcasts
    const transformedPodcasts = allPodcasts.map((podcast, index) => transformPodcastData(podcast, index));
    
    const insertedPodcasts = await Podcast.insertMany(transformedPodcasts);
    
    console.log(`✅ Successfully seeded ${insertedPodcasts.length} podcasts!`);

    // Display summary
    const stats = await Podcast.aggregate([
      {
        $group: {
          _id: null,
          totalPodcasts: { $sum: 1 },
          featuredPodcasts: { $sum: { $cond: ['$featured', 1, 0] } },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          avgViews: { $avg: '$views' },
          categories: { $addToSet: '$category' },
          hosts: { $addToSet: '$host' }
        }
      }
    ]);

    if (stats.length > 0) {
      const summary = stats[0];
      console.log('\n📊 Seeding Summary:');
      console.log(`   Total Podcasts: ${summary.totalPodcasts}`);
      console.log(`   Featured Podcasts: ${summary.featuredPodcasts}`);
      console.log(`   Total Views: ${summary.totalViews}`);
      console.log(`   Total Likes: ${summary.totalLikes}`);
      console.log(`   Average Views: ${Math.round(summary.avgViews)}`);
      console.log(`   Categories: ${summary.categories.join(', ')}`);
      console.log(`   Hosts: ${summary.hosts.join(', ')}`);
    }

    console.log('\n🎉 Podcasts seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding podcasts:', error);
    throw error;
  }
}

/**
 * Load podcasts from external JSON file (if exists)
 */
async function loadPodcastsFromFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      console.log(`📖 Loading podcasts from ${filePath}...`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const podcastsData = JSON.parse(fileContent);
      
      // Handle different JSON structures
      let allPodcasts = [];
      
      if (podcastsData.episodes) {
        allPodcasts = podcastsData.episodes;
      } else if (Array.isArray(podcastsData)) {
        allPodcasts = podcastsData;
      } else {
        console.warn('⚠️  Unknown JSON structure, using sample data');
        return samplePodcastsData;
      }
      
      return { episodes: allPodcasts };
    } else {
      console.log('📝 External podcasts file not found, using sample data');
      return samplePodcastsData;
    }
  } catch (error) {
    console.error('❌ Error loading podcasts from file:', error);
    return samplePodcastsData;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting Podcasts Seeder...');
  
  try {
    // Check if .env file exists
    const envPath = path.join(__dirname, '../../.env');
    if (!fs.existsSync(envPath)) {
      console.error('❌ .env file not found. Please create one from .env.example');
      process.exit(1);
    }
    
    console.log('✅ Environment file found');
    
    // Try to load from frontend podcasts.json file
    const frontendPodcastsPath = path.join(__dirname, '../../../client/src/data/podcasts.json');
    console.log(`📂 Looking for podcasts data at: ${frontendPodcastsPath}`);
    
    const podcastsData = await loadPodcastsFromFile(frontendPodcastsPath);
    
    // Update sample data if external file was loaded
    if (podcastsData.episodes) {
      console.log(`🎧 Loaded ${podcastsData.episodes.length} podcasts from external file`);
      samplePodcastsData.episodes = podcastsData.episodes;
    } else {
      console.log('📝 Using built-in sample data');
    }
    
    await seedPodcasts();
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    // Close database connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
    process.exit(0);
  }
}

// Run the seeder
main();

export { seedPodcasts, transformPodcastData };
