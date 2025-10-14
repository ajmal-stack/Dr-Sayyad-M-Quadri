import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import dotenv from 'dotenv';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../../../.env') });

/**
 * Seed blogs from blogs.json file
 */
async function seedBlogsFromJSON() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dr-quadri');
    console.log('✅ Connected to MongoDB');

    // Read blogs.json file
    const blogsJsonPath = path.join(__dirname, '../../../../../client/src/data/blogs.json');
    console.log('📖 Reading blogs.json from:', blogsJsonPath);
    
    if (!fs.existsSync(blogsJsonPath)) {
      throw new Error(`blogs.json not found at: ${blogsJsonPath}`);
    }

    const blogsData = JSON.parse(fs.readFileSync(blogsJsonPath, 'utf-8'));
    console.log('✅ blogs.json loaded successfully');

    // Prepare blogs array
    const blogsToSeed = [];

    // Add featured blog
    if (blogsData.featuredBlog) {
      blogsToSeed.push({
        ...blogsData.featuredBlog,
        featured: true
      });
    }

    // Add other blogs
    if (blogsData.otherBlogs && Array.isArray(blogsData.otherBlogs)) {
      blogsToSeed.push(...blogsData.otherBlogs.map(blog => ({
        ...blog,
        featured: blog.featured || false
      })));
    }

    console.log(`📝 Found ${blogsToSeed.length} blogs to seed`);

    // Clear existing blogs (optional - comment out if you want to keep existing)
    // const deleteResult = await Blog.deleteMany({});
    // console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing blogs`);

    let created = 0;
    let skipped = 0;
    let errors = 0;

    // Seed each blog
    for (const blogData of blogsToSeed) {
      try {
        // Check if blog already exists
        const existingBlog = await Blog.findOne({
          $or: [
            { title: blogData.title },
            { slug: blogData.slug }
          ]
        });

        if (existingBlog) {
          console.log(`⏭️  Skipping existing blog: "${blogData.title}"`);
          skipped++;
          continue;
        }

        // Prepare blog data
        const processedData = {
          title: blogData.title,
          excerpt: blogData.excerpt,
          content: blogData.content,
          author: blogData.author || 'Dr. Syed M Quadri',
          authorBio: blogData.authorBio || '',
          authorAvatar: blogData.authorAvatar || '/sayyed-quadri.png',
          publishDate: blogData.publishDate ? new Date(blogData.publishDate) : new Date(),
          readTime: blogData.readTime || '5 min read',
          category: blogData.category,
          tags: Array.isArray(blogData.tags) ? blogData.tags.map(tag => tag.toLowerCase().trim()) : [],
          image: blogData.image || '',
          views: blogData.views || 0,
          likes: blogData.likes || 0,
          featured: blogData.featured || false,
          isActive: true,
          isPublished: true,
          status: 'published',
          commentsEnabled: true,
          commentsCount: 0,
          shares: {
            facebook: 0,
            twitter: 0,
            linkedin: 0,
            email: 0
          }
        };

        // Create blog
        const blog = await Blog.create(processedData);
        console.log(`✅ Created blog: "${blog.title}" (${blog.slug})`);
        created++;
      } catch (error) {
        console.error(`❌ Error creating blog "${blogData.title}":`, error.message);
        errors++;
      }
    }

    // Summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`   📝 Total: ${blogsToSeed.length}`);

    // Verify
    const totalBlogs = await Blog.countDocuments();
    console.log(`\n📚 Total blogs in database: ${totalBlogs}`);

    // Get categories
    const categories = await Blog.distinct('category');
    console.log(`📂 Categories: ${categories.join(', ')}`);

    // Get featured count
    const featuredCount = await Blog.countDocuments({ featured: true });
    console.log(`⭐ Featured blogs: ${featuredCount}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
    process.exit(0);
  }
}

// Run the seeding function
seedBlogsFromJSON();
