import mongoose from 'mongoose';
import Podcast from '../models/Podcast.js';
import { config } from '../../../config/index.js';

/**
 * Import podcast data from JSON to MongoDB
 * Run this script to populate the database with initial podcast data
 */

// Sample podcast data based on the frontend JSON structure
const podcastData = [
  {
    title: "Understanding Anxiety: A Deep Dive into Mental Wellness",
    description: "Explore the complexities of anxiety disorders and discover practical strategies for managing stress and promoting mental well-being in daily life. In this comprehensive episode, we delve into the science behind anxiety, discuss evidence-based treatment approaches, and share real-world strategies that you can implement today. Whether you're dealing with anxiety yourself or supporting someone who is, this episode provides valuable insights and actionable advice.",
    duration: "45:30",
    publishDate: new Date("2024-01-15"),
    category: "Mental Health",
    audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    coverImage: "/hero banner/1.png",
    featured: true,
    views: 12500,
    likes: 890,
    downloads: 3200,
    host: "Dr. Syed M Quadri",
    episodeNumber: 42,
    transcript: "Welcome to today's episode on understanding anxiety. Anxiety is one of the most common mental health challenges we face today, affecting millions of people worldwide. In this episode, we'll explore what anxiety really is, how it manifests in our daily lives, and most importantly, what we can do about it.\n\nFirst, let's understand that anxiety is a normal human emotion. It's our body's natural response to stress and potential threats. However, when anxiety becomes overwhelming or interferes with our daily functioning, it may indicate an anxiety disorder that requires attention and care.\n\nThere are several types of anxiety disorders, including generalized anxiety disorder, panic disorder, social anxiety disorder, and specific phobias. Each has its own unique characteristics and treatment approaches.\n\nResearch shows that cognitive-behavioral therapy, mindfulness practices, and in some cases medication can be highly effective in managing anxiety. The key is finding the right combination of strategies that work for you.",
    showNotes: [
      "Introduction to anxiety and its prevalence (0:00 - 5:00)",
      "Understanding the difference between normal anxiety and anxiety disorders (5:00 - 12:00)",
      "Common types of anxiety disorders (12:00 - 20:00)",
      "Evidence-based treatment approaches (20:00 - 35:00)",
      "Practical daily strategies for managing anxiety (35:00 - 45:30)"
    ],
    tags: ["anxiety", "mental-health", "wellness", "psychology", "self-care"]
  },
  {
    title: "Nutrition and Brain Health: The Science Connection",
    description: "Discover how proper nutrition directly impacts cognitive function, mood regulation, and overall brain health throughout different life stages. We explore the latest research on brain-boosting foods, the gut-brain connection, and practical dietary strategies for optimal mental performance.",
    duration: "38:15",
    publishDate: new Date("2024-01-08"),
    category: "Nutrition",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
    coverImage: "/hero banner/9.png",
    featured: false,
    views: 8900,
    likes: 650,
    downloads: 2100,
    host: "Dr. Syed M Quadri",
    episodeNumber: 41,
    transcript: "Today we're diving into the fascinating connection between nutrition and brain health. The food we eat doesn't just fuel our bodies – it has a profound impact on our cognitive function, mood, and overall mental well-being.\n\nThe brain consumes about 20% of our daily caloric intake, making it one of the most energy-demanding organs in our body. The quality of fuel we provide directly affects how well our brain functions.\n\nOmega-3 fatty acids, found in fish like salmon and sardines, are crucial for brain health. They support neurotransmitter function and help reduce inflammation in the brain.",
    showNotes: [
      "The gut-brain connection overview (0:00 - 8:00)",
      "Essential nutrients for cognitive function (8:00 - 18:00)",
      "Foods that boost mental clarity (18:00 - 28:00)",
      "Nutrition strategies for different age groups (28:00 - 38:15)"
    ],
    tags: ["nutrition", "brain-health", "cognitive-function", "wellness", "diet"]
  },
  {
    title: "Mastering Public Speaking: Overcoming Fear and Building Confidence",
    description: "Transform your public speaking abilities with proven techniques for managing stage fright and delivering compelling presentations. Learn from psychology research and practical experience to become a confident, engaging speaker.",
    duration: "52:20",
    publishDate: new Date("2024-01-01"),
    category: "Self-Development",
    audioUrl: "https://file-examples.com/storage/fe68c8a7c4a1e7a5f09f5c2/2017/11/file_example_MP3_700KB.mp3",
    coverImage: "/hero banner/3.png",
    featured: true,
    views: 15600,
    likes: 1200,
    downloads: 4500,
    host: "Dr. Syed M Quadri",
    episodeNumber: 40,
    transcript: "Public speaking is one of the most common fears, but it's also one of the most valuable skills you can develop. Whether you're presenting at work, speaking at a wedding, or giving a keynote address, the ability to communicate effectively in front of others is transformational.\n\nThe fear of public speaking often stems from our evolutionary wiring – being judged by a group historically meant potential rejection from the tribe, which could be life-threatening. Understanding this helps normalize the anxiety many feel.\n\nPreparation is key to confidence. Know your material inside and out, practice in front of mirrors or friends, and rehearse handling potential questions or interruptions.",
    showNotes: [
      "Understanding the psychology of public speaking fear (0:00 - 12:00)",
      "Preparation techniques for confident delivery (12:00 - 25:00)",
      "Body language and vocal techniques (25:00 - 38:00)",
      "Handling Q&A sessions effectively (38:00 - 52:20)"
    ],
    tags: ["public-speaking", "confidence", "communication", "self-development", "presentation-skills"]
  },
  {
    title: "Sleep Disorders: Diagnosis and Treatment Approaches",
    description: "Comprehensive overview of common sleep disorders, their impact on health, and evidence-based treatment methodologies. Learn about sleep hygiene, when to seek professional help, and cutting-edge treatments for better sleep.",
    duration: "41:45",
    publishDate: new Date("2023-12-25"),
    category: "Health",
    audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    coverImage: "/hero banner/4.png",
    featured: false,
    views: 7200,
    likes: 480,
    downloads: 1800,
    host: "Dr. Syed M Quadri",
    episodeNumber: 39,
    transcript: "Sleep is fundamental to our physical and mental health, yet millions of people struggle with sleep disorders. In this episode, we'll explore the most common sleep disorders and their treatments.\n\nInsomnia affects about 30% of adults at some point in their lives. It can be acute (short-term) or chronic (long-term), and the causes range from stress and anxiety to medical conditions and medications.\n\nSleep apnea is another serious condition where breathing repeatedly stops and starts during sleep. It's often undiagnosed but can have serious health consequences if left untreated.",
    showNotes: [
      "Overview of sleep and its importance (0:00 - 8:00)",
      "Common sleep disorders: insomnia, sleep apnea, restless leg syndrome (8:00 - 20:00)",
      "Diagnostic approaches and sleep studies (20:00 - 30:00)",
      "Treatment options: behavioral, medical, and technological (30:00 - 41:45)"
    ],
    tags: ["sleep", "health", "insomnia", "sleep-apnea", "wellness"]
  },
  {
    title: "Mindfulness and Meditation: Ancient Wisdom for Modern Life",
    description: "Learn practical mindfulness techniques and meditation practices that can enhance your daily life and mental clarity. Discover how ancient practices can help manage modern stress and improve overall well-being.",
    duration: "35:10",
    publishDate: new Date("2023-12-18"),
    category: "Wellness",
    audioUrl: "https://file-examples.com/storage/fe68c8a7c4a1e7a5f09f5c2/2017/11/file_example_MP3_1MG.mp3",
    coverImage: "/hero banner/5.png",
    featured: true,
    views: 11800,
    likes: 920,
    downloads: 3600,
    host: "Dr. Syed M Quadri",
    episodeNumber: 38,
    transcript: "Mindfulness and meditation have been practiced for thousands of years, but modern science is now validating what ancient traditions have long known – these practices can profoundly impact our mental and physical health.\n\nMindfulness is the practice of being fully present and engaged with whatever we're doing at the moment, free from distraction or judgment. It's about paying attention to the here and now.\n\nRegular meditation practice has been shown to reduce stress, improve focus, lower blood pressure, and even change the structure of the brain in positive ways.",
    showNotes: [
      "Introduction to mindfulness and its benefits (0:00 - 7:00)",
      "Different types of meditation practices (7:00 - 18:00)",
      "Starting a daily meditation practice (18:00 - 28:00)",
      "Integrating mindfulness into daily activities (28:00 - 35:10)"
    ],
    tags: ["mindfulness", "meditation", "wellness", "stress-reduction", "mental-health"]
  },
  {
    title: "Understanding Depression: Breaking the Stigma",
    description: "An honest conversation about depression, its various forms, treatment options, and the importance of seeking help. We address common misconceptions and provide hope for those affected by depression.",
    duration: "48:30",
    publishDate: new Date("2023-12-11"),
    category: "Mental Health",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
    coverImage: "/hero banner/6.png",
    featured: false,
    views: 9400,
    likes: 710,
    downloads: 2800,
    host: "Dr. Syed M Quadri",
    episodeNumber: 37,
    transcript: "Depression is more than just feeling sad – it's a serious medical condition that affects how you feel, think, and handle daily activities. Today, we're going to have an honest, open conversation about depression.\n\nDepression affects over 280 million people worldwide, making it one of the leading causes of disability. Yet stigma and misunderstanding still surround this condition.\n\nThere are different types of depression, including major depressive disorder, persistent depressive disorder, bipolar disorder, and seasonal affective disorder. Each requires different approaches to treatment.",
    showNotes: [
      "What is depression? Symptoms and types (0:00 - 12:00)",
      "Breaking down stigma and misconceptions (12:00 - 22:00)",
      "Treatment options: therapy, medication, lifestyle changes (22:00 - 38:00)",
      "Supporting someone with depression (38:00 - 48:30)"
    ],
    tags: ["depression", "mental-health", "therapy", "stigma", "support"]
  },
  {
    title: "The Psychology of Habits: Building Positive Change",
    description: "Explore the science behind habit formation and learn practical strategies for building good habits and breaking bad ones. Understand the psychology that drives our behaviors and how to harness it for positive change.",
    duration: "43:15",
    publishDate: new Date("2023-12-04"),
    category: "Psychology",
    audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    coverImage: "/hero banner/7.png",
    featured: false,
    views: 6800,
    likes: 520,
    downloads: 1900,
    host: "Dr. Syed M Quadri",
    episodeNumber: 36,
    transcript: "Habits shape our lives more than we realize. Research suggests that about 40% of our daily actions are habits, not conscious decisions. Understanding how habits work is key to creating positive change in our lives.\n\nThe habit loop consists of three components: cue, routine, and reward. The cue triggers the behavior, the routine is the behavior itself, and the reward is what reinforces the habit.\n\nTo build new habits, start small. Research shows that tiny changes are more likely to stick than dramatic overhauls of our behavior.",
    showNotes: [
      "The science of habit formation (0:00 - 10:00)",
      "The habit loop: cue, routine, reward (10:00 - 20:00)",
      "Strategies for building good habits (20:00 - 32:00)",
      "Breaking bad habits effectively (32:00 - 43:15)"
    ],
    tags: ["habits", "psychology", "behavior-change", "self-improvement", "neuroscience"]
  },
  {
    title: "Stress Management in the Digital Age",
    description: "Navigate the unique stressors of modern digital life and learn effective coping strategies. From social media overwhelm to work-from-home challenges, discover how to maintain mental wellness in our connected world.",
    duration: "39:45",
    publishDate: new Date("2023-11-27"),
    category: "Wellness",
    audioUrl: "https://file-examples.com/storage/fe68c8a7c4a1e7a5f09f5c2/2017/11/file_example_MP3_700KB.mp3",
    coverImage: "/hero banner/8.png",
    featured: true,
    views: 13200,
    likes: 1050,
    downloads: 4100,
    host: "Dr. Syed M Quadri",
    episodeNumber: 35,
    transcript: "The digital age has brought incredible opportunities, but it's also created new forms of stress. From information overload to constant connectivity, our brains are processing more stimuli than ever before.\n\nSocial media can be particularly challenging for mental health. The constant comparison, fear of missing out, and addictive design of these platforms can contribute to anxiety and depression.\n\nSetting boundaries with technology is crucial. This includes designated phone-free times, turning off notifications, and being intentional about our digital consumption.",
    showNotes: [
      "Digital age stressors: information overload, constant connectivity (0:00 - 10:00)",
      "Social media and mental health impacts (10:00 - 20:00)",
      "Digital detox strategies and boundaries (20:00 - 30:00)",
      "Mindful technology use and stress reduction techniques (30:00 - 39:45)"
    ],
    tags: ["stress-management", "digital-wellness", "social-media", "technology", "mental-health"]
  }
];

/**
 * Connect to MongoDB and import podcast data
 */
async function importPodcastData() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    console.log('Database URI:', config.database.uri);
    await mongoose.connect(config.database.uri, config.database.options);
    console.log('✅ Connected to MongoDB successfully');

    // Clear existing podcast data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing podcast data...');
    await Podcast.deleteMany({});
    console.log('✅ Existing data cleared');

    // Import new podcast data
    console.log('📥 Importing podcast data...');
    const importedPodcasts = await Podcast.insertMany(podcastData);
    console.log(`✅ Successfully imported ${importedPodcasts.length} podcasts`);

    // Display summary
    console.log('\n📊 Import Summary:');
    console.log(`Total podcasts: ${importedPodcasts.length}`);
    console.log(`Featured podcasts: ${importedPodcasts.filter(p => p.featured).length}`);
    console.log(`Categories: ${[...new Set(importedPodcasts.map(p => p.category))].join(', ')}`);
    console.log(`Episode numbers: ${importedPodcasts.map(p => p.episodeNumber).sort((a, b) => b - a).join(', ')}`);

    // Verify data integrity
    console.log('\n🔍 Verifying data integrity...');
    const totalPodcasts = await Podcast.countDocuments();
    const featuredPodcasts = await Podcast.countDocuments({ featured: true });
    const publishedPodcasts = await Podcast.countDocuments({ isPublished: true, isActive: true });

    console.log(`✅ Database verification:`);
    console.log(`   Total podcasts in DB: ${totalPodcasts}`);
    console.log(`   Featured podcasts: ${featuredPodcasts}`);
    console.log(`   Published & active: ${publishedPodcasts}`);

    console.log('\n🎉 Podcast data import completed successfully!');
    
  } catch (error) {
    console.error('❌ Error importing podcast data:', error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the import if this script is executed directly
console.log('🎆 Starting Podcast Data Import...');
console.log('Script path:', import.meta.url);
console.log('Process argv[1]:', process.argv[1]);
importPodcastData().catch(console.error);

export { importPodcastData, podcastData };
