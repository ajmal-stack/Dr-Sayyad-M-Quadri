import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';
import database from '../config/database.js';
import Blog from '../modules/blogs/models/Blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed Blogs Data
 * Migrates blogs from frontend JSON to MongoDB
 */

// Sample blogs data based on your frontend structure
const sampleBlogsData = {
  "featuredBlog": {
    "title": "The Science of Mental Wellness: Understanding Your Mind",
    "excerpt": "Explore the latest research in mental health and discover evidence-based strategies for maintaining psychological well-being in our modern world.",
    "content": "# The Science of Mental Wellness: Understanding Your Mind\n\nMental wellness is not just the absence of mental illness—it's a state of well-being where individuals can cope with normal life stresses, work productively, and contribute to their communities. In recent years, scientific research has provided us with unprecedented insights into how our minds work and what we can do to maintain optimal mental health.\n\n## The Neuroscience of Well-being\n\nOur brains are incredibly plastic, meaning they can change and adapt throughout our lives. This neuroplasticity is the foundation of mental wellness practices. When we engage in activities that promote mental health, we're literally rewiring our brains for better functioning.\n\n### Key Brain Regions for Mental Health\n\n- **Prefrontal Cortex**: Responsible for executive functions, decision-making, and emotional regulation\n- **Hippocampus**: Critical for memory formation and stress response\n- **Amygdala**: The brain's alarm system, processing emotions and threats\n- **Anterior Cingulate Cortex**: Involved in attention and emotional processing\n\n## Evidence-Based Strategies for Mental Wellness\n\n### 1. Mindfulness and Meditation\n\nResearch consistently shows that mindfulness practices can:\n- Reduce activity in the amygdala (stress response)\n- Increase gray matter density in areas associated with learning and memory\n- Improve emotional regulation and attention\n\n### 2. Physical Exercise\n\nRegular physical activity is one of the most powerful tools for mental health:\n- Increases production of BDNF (brain-derived neurotrophic factor)\n- Promotes neurogenesis (growth of new brain cells)\n- Releases endorphins and other mood-enhancing chemicals\n\n### 3. Social Connections\n\nHuman beings are inherently social creatures. Strong social connections:\n- Activate the brain's reward system\n- Reduce cortisol levels (stress hormone)\n- Provide emotional support and resilience\n\n### 4. Quality Sleep\n\nSleep is essential for mental health:\n- Allows the brain to consolidate memories\n- Clears metabolic waste from brain cells\n- Regulates neurotransmitter balance\n\n## Practical Implementation\n\nImplementing these strategies doesn't require dramatic lifestyle changes. Start small:\n\n1. **Begin with 5 minutes of daily meditation**\n2. **Take a 10-minute walk each day**\n3. **Reach out to one friend or family member weekly**\n4. **Establish a consistent sleep schedule**\n\n## The Role of Professional Support\n\nWhile self-care strategies are important, professional mental health support remains crucial. Therapists, counselors, and psychiatrists can provide:\n- Personalized treatment plans\n- Evidence-based interventions\n- Medication management when needed\n- Crisis intervention and support\n\n## Conclusion\n\nMental wellness is an ongoing journey, not a destination. By understanding the science behind mental health and implementing evidence-based strategies, we can build resilience, improve our quality of life, and better navigate life's challenges.\n\nRemember, seeking help is a sign of strength, not weakness. If you're struggling with mental health concerns, don't hesitate to reach out to a qualified professional.",
    "author": "Dr. Syed M Quadri",
    "publishDate": "2024-01-15",
    "readTime": "8 min read",
    "category": "Mental Health",
    "tags": ["mental-health", "neuroscience", "wellness", "psychology", "self-care"],
    "image": "/hero banner/1.png",
    "featured": true,
    "views": 15420,
    "likes": 892,
    "shares": 156,
    "comments": 43
  },
  "blogs": [
    {
      "title": "Managing Anxiety in the Digital Age",
      "excerpt": "Learn practical strategies for managing anxiety in our hyperconnected world, including digital detox techniques and mindful technology use.",
      "content": "# Managing Anxiety in the Digital Age\n\nIn today's hyperconnected world, anxiety has become increasingly common. The constant stream of notifications, social media comparisons, and information overload can overwhelm our nervous systems and trigger anxiety responses.\n\n## Understanding Digital Anxiety\n\nDigital anxiety manifests in several ways:\n- Fear of missing out (FOMO)\n- Social media comparison anxiety\n- Information overload stress\n- Notification anxiety\n- Cyberbullying concerns\n\n## Practical Strategies\n\n### 1. Digital Boundaries\n- Set specific times for checking social media\n- Use app timers to limit screen time\n- Create phone-free zones in your home\n- Implement a digital sunset routine\n\n### 2. Mindful Technology Use\n- Practice intentional browsing\n- Curate your social media feeds\n- Unfollow accounts that trigger comparison\n- Use technology for connection, not consumption\n\n### 3. Grounding Techniques\n- 5-4-3-2-1 sensory grounding\n- Deep breathing exercises\n- Progressive muscle relaxation\n- Mindfulness meditation\n\n## Building Digital Resilience\n\nThe goal isn't to eliminate technology but to develop a healthier relationship with it. This includes recognizing when digital consumption is affecting your mental health and having strategies to manage it effectively.",
      "author": "Dr. Syed M Quadri",
      "publishDate": "2024-02-10",
      "readTime": "6 min read",
      "category": "Mental Health",
      "tags": ["anxiety", "digital-wellness", "technology", "mindfulness"],
      "image": "/hero banner/2.jpg",
      "featured": false,
      "views": 8750,
      "likes": 423,
      "shares": 89,
      "comments": 27
    },
    {
      "title": "The Power of Sleep for Mental Health",
      "excerpt": "Discover how quality sleep impacts your mental health and learn evidence-based strategies for improving your sleep hygiene.",
      "content": "# The Power of Sleep for Mental Health\n\nSleep and mental health are intimately connected. Poor sleep can contribute to mental health problems, while mental health issues can disrupt sleep patterns. Understanding this bidirectional relationship is crucial for overall wellness.\n\n## The Sleep-Mental Health Connection\n\nDuring sleep, our brains:\n- Process emotions and experiences\n- Consolidate memories\n- Clear metabolic waste\n- Regulate neurotransmitters\n- Restore energy levels\n\n## Sleep Hygiene Fundamentals\n\n### Environment Optimization\n- Keep your bedroom cool (65-68°F)\n- Ensure complete darkness\n- Minimize noise disruptions\n- Invest in comfortable bedding\n\n### Pre-Sleep Routine\n- Establish consistent sleep/wake times\n- Create a relaxing bedtime ritual\n- Avoid screens 1 hour before bed\n- Practice relaxation techniques\n\n### Lifestyle Factors\n- Limit caffeine after 2 PM\n- Avoid large meals before bedtime\n- Get regular exercise (but not close to bedtime)\n- Manage stress through healthy coping strategies\n\n## When to Seek Help\n\nConsult a healthcare provider if you experience:\n- Persistent insomnia\n- Excessive daytime sleepiness\n- Sleep apnea symptoms\n- Nightmares or night terrors\n- Sleep-related anxiety\n\nQuality sleep is not a luxury—it's a necessity for mental health and overall well-being.",
      "author": "Dr. Syed M Quadri",
      "publishDate": "2024-03-05",
      "readTime": "7 min read",
      "category": "Health & Wellness",
      "tags": ["sleep", "mental-health", "wellness", "insomnia"],
      "image": "/hero banner/3.png",
      "featured": false,
      "views": 12300,
      "likes": 678,
      "shares": 134,
      "comments": 52
    },
    {
      "title": "Nutrition and Brain Health: What You Need to Know",
      "excerpt": "Explore the connection between nutrition and mental health, including brain-boosting foods and dietary patterns for optimal cognitive function.",
      "content": "# Nutrition and Brain Health: What You Need to Know\n\nWhat we eat directly impacts how we think, feel, and function. The brain consumes about 20% of our daily calories, making nutrition crucial for optimal mental performance and emotional well-being.\n\n## The Gut-Brain Connection\n\nThe gut and brain communicate through:\n- The vagus nerve\n- Neurotransmitter production\n- Inflammatory pathways\n- Microbiome interactions\n\n## Brain-Boosting Nutrients\n\n### Omega-3 Fatty Acids\n- **Sources**: Fatty fish, walnuts, flaxseeds, chia seeds\n- **Benefits**: Reduce inflammation, support neurotransmitter function\n\n### Antioxidants\n- **Sources**: Berries, dark leafy greens, colorful vegetables\n- **Benefits**: Protect against oxidative stress and aging\n\n### B Vitamins\n- **Sources**: Whole grains, legumes, leafy greens, eggs\n- **Benefits**: Support neurotransmitter synthesis and energy metabolism\n\n### Magnesium\n- **Sources**: Nuts, seeds, dark chocolate, leafy greens\n- **Benefits**: Calms the nervous system, supports sleep\n\n## The Mediterranean Diet for Mental Health\n\nResearch shows the Mediterranean diet can:\n- Reduce depression risk by 30%\n- Improve cognitive function\n- Lower anxiety levels\n- Support overall brain health\n\n### Key Components:\n- Plenty of vegetables and fruits\n- Whole grains and legumes\n- Healthy fats (olive oil, nuts)\n- Moderate fish consumption\n- Limited processed foods\n\n## Practical Meal Planning\n\n### Breakfast Ideas\n- Greek yogurt with berries and nuts\n- Oatmeal with ground flaxseed and fruit\n- Vegetable omelet with whole grain toast\n\n### Lunch Options\n- Salmon salad with mixed greens\n- Lentil soup with whole grain bread\n- Quinoa bowl with roasted vegetables\n\n### Dinner Suggestions\n- Grilled fish with steamed broccoli\n- Bean and vegetable stir-fry\n- Lean protein with sweet potato and greens\n\n## Foods to Limit\n\n- Processed and ultra-processed foods\n- Excessive sugar and refined carbohydrates\n- Trans fats and excessive saturated fats\n- Excessive alcohol\n- High-sodium foods\n\nRemember, small changes in your diet can lead to significant improvements in mental health and cognitive function over time.",
      "author": "Dr. Syed M Quadri",
      "publishDate": "2024-03-20",
      "readTime": "9 min read",
      "category": "Nutrition",
      "tags": ["nutrition", "brain-health", "diet", "wellness"],
      "image": "/hero banner/4.png",
      "featured": false,
      "views": 9850,
      "likes": 567,
      "shares": 98,
      "comments": 34
    }
  ]
};

/**
 * Transform blog data to match our schema
 */
function transformBlogData(blog, index) {
  // Generate a unique slug
  const baseSlug = blog.title ? blog.title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-') : `blog-${index}`;
  
  const slug = `${baseSlug}-${Date.now()}-${index}`; // Ensure uniqueness
  
  return {
    title: blog.title,
    slug: slug,
    excerpt: blog.excerpt,
    content: blog.content,
    author: blog.author || 'Dr. Syed M Quadri',
    publishDate: blog.publishDate ? new Date(blog.publishDate) : new Date(),
    readTime: blog.readTime || '5 min read',
    category: blog.category,
    tags: blog.tags || [],
    image: blog.image,
    featured: blog.featured || false,
    views: blog.views || Math.floor(Math.random() * 1000) + 100,
    likes: blog.likes || Math.floor(Math.random() * 100) + 10,
    shares: blog.shares || Math.floor(Math.random() * 50) + 5,
    comments: blog.comments || Math.floor(Math.random() * 20) + 2,
    isActive: true,
    isPublished: true,
    status: 'published',
    format: 'article',
    difficulty: 'beginner',
    language: 'en',
    // Add some sample engagement metrics
    averageReadTime: Math.floor(Math.random() * 300) + 120, // 2-7 minutes in seconds
    bounceRate: Math.floor(Math.random() * 30) + 20, // 20-50%
  };
}

/**
 * Seed blogs from JSON data
 */
async function seedBlogs() {
  try {
    console.log('🌱 Starting blogs seeding process...');

    // Connect to database
    await database.connect();

    // Clear existing blogs (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing blogs...');
    await Blog.deleteMany({});

    // Prepare blogs data
    const allBlogs = [
      sampleBlogsData.featuredBlog,
      ...sampleBlogsData.blogs
    ];

    console.log(`📝 Preparing to seed ${allBlogs.length} blogs...`);

    // Transform and insert blogs
    const transformedBlogs = allBlogs.map((blog, index) => transformBlogData(blog, index));
    
    const insertedBlogs = await Blog.insertMany(transformedBlogs);
    
    console.log(`✅ Successfully seeded ${insertedBlogs.length} blogs!`);

    // Display summary
    const stats = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalBlogs: { $sum: 1 },
          featuredBlogs: { $sum: { $cond: ['$featured', 1, 0] } },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          avgViews: { $avg: '$views' },
          categories: { $addToSet: '$category' },
          authors: { $addToSet: '$author' }
        }
      }
    ]);

    if (stats.length > 0) {
      const summary = stats[0];
      console.log('\n📊 Seeding Summary:');
      console.log(`   Total Blogs: ${summary.totalBlogs}`);
      console.log(`   Featured Blogs: ${summary.featuredBlogs}`);
      console.log(`   Total Views: ${summary.totalViews}`);
      console.log(`   Total Likes: ${summary.totalLikes}`);
      console.log(`   Average Views: ${Math.round(summary.avgViews)}`);
      console.log(`   Categories: ${summary.categories.join(', ')}`);
      console.log(`   Authors: ${summary.authors.join(', ')}`);
    }

    console.log('\n🎉 Blogs seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding blogs:', error);
    throw error;
  }
}

/**
 * Load blogs from external JSON file (if exists)
 */
async function loadBlogsFromFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      console.log(`📖 Loading blogs from ${filePath}...`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const blogsData = JSON.parse(fileContent);
      
      // Handle different JSON structures
      let allBlogs = [];
      
      if (blogsData.featuredBlog && blogsData.blogs) {
        allBlogs = [blogsData.featuredBlog, ...blogsData.blogs];
      } else if (blogsData.blogs) {
        allBlogs = blogsData.blogs;
      } else if (Array.isArray(blogsData)) {
        allBlogs = blogsData;
      } else {
        console.warn('⚠️  Unknown JSON structure, using sample data');
        return sampleBlogsData;
      }
      
      return { 
        featuredBlog: allBlogs.find(blog => blog.featured) || allBlogs[0],
        blogs: allBlogs.filter(blog => !blog.featured || allBlogs.indexOf(blog) > 0)
      };
    } else {
      console.log('📝 External blogs file not found, using sample data');
      return sampleBlogsData;
    }
  } catch (error) {
    console.error('❌ Error loading blogs from file:', error);
    return sampleBlogsData;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting Blogs Seeder...');
  
  try {
    // Check if .env file exists
    const envPath = path.join(__dirname, '../../.env');
    if (!fs.existsSync(envPath)) {
      console.error('❌ .env file not found. Please create one from .env.example');
      process.exit(1);
    }
    
    console.log('✅ Environment file found');
    
    // Try to load from frontend blogs.json file
    const frontendBlogsPath = path.join(__dirname, '../../../client/src/data/blogs.json');
    console.log(`📂 Looking for blogs data at: ${frontendBlogsPath}`);
    
    const blogsData = await loadBlogsFromFile(frontendBlogsPath);
    
    // Update sample data if external file was loaded
    if (blogsData.featuredBlog || blogsData.blogs) {
      console.log(`📝 Loaded blogs from external file`);
      if (blogsData.featuredBlog) sampleBlogsData.featuredBlog = blogsData.featuredBlog;
      if (blogsData.blogs) sampleBlogsData.blogs = blogsData.blogs;
    } else {
      console.log('📝 Using built-in sample data');
    }
    
    await seedBlogs();
    
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

export { seedBlogs, transformBlogData };
