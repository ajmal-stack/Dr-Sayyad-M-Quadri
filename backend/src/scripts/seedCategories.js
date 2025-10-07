import mongoose from 'mongoose';
import { config } from '../config/index.js';
import Category from '../modules/books/models/Category.js';

const categories = [
  {
    name: 'Mental Health',
    description: 'Books focused on mental health awareness, treatment, and wellness',
    color: '#4CAF50',
    icon: 'psychology',
    sortOrder: 1
  },
  {
    name: 'Psychology',
    description: 'Psychological theories, research, and practical applications',
    color: '#2196F3',
    icon: 'brain',
    sortOrder: 2
  },
  {
    name: 'Self-Help',
    description: 'Personal development and self-improvement resources',
    color: '#FF9800',
    icon: 'self_improvement',
    sortOrder: 3
  },
  {
    name: 'Wellness',
    description: 'Holistic health and wellness approaches',
    color: '#9C27B0',
    icon: 'spa',
    sortOrder: 4
  },
  {
    name: 'Journal',
    description: 'Personal journals, diaries, and reflective writing',
    color: '#795548',
    icon: 'book',
    sortOrder: 5
  },
  {
    name: 'Memoir',
    description: 'Personal stories and life experiences',
    color: '#607D8B',
    icon: 'person',
    sortOrder: 6
  },
  {
    name: 'Health & Wellness',
    description: 'Comprehensive health and wellness guides',
    color: '#8BC34A',
    icon: 'health_and_safety',
    sortOrder: 7
  },
  {
    name: 'Medical',
    description: 'Medical research, studies, and professional resources',
    color: '#F44336',
    icon: 'medical_services',
    sortOrder: 8
  },
  {
    name: 'Psychiatry',
    description: 'Psychiatric practice, research, and case studies',
    color: '#3F51B5',
    icon: 'psychiatry',
    sortOrder: 9
  },
  {
    name: 'Therapy',
    description: 'Therapeutic approaches and treatment methods',
    color: '#00BCD4',
    icon: 'therapy',
    sortOrder: 10
  },
  {
    name: 'Nutrition',
    description: 'Nutritional science and dietary guidance',
    color: '#CDDC39',
    icon: 'restaurant',
    sortOrder: 11
  },
  {
    name: 'Lifestyle',
    description: 'Lifestyle choices and life balance strategies',
    color: '#E91E63',
    icon: 'lifestyle',
    sortOrder: 12
  },
  {
    name: 'General Health',
    description: 'General health information and preventive care',
    color: '#009688',
    icon: 'health_and_safety',
    sortOrder: 13
  }
];

async function seedCategories() {
  try {
    console.log('🌱 Starting category seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(config.database.uri);
    console.log('✅ Connected to MongoDB');

    // Clear existing categories (optional - comment out if you want to keep existing)
    // await Category.deleteMany({});
    // console.log('🗑️ Cleared existing categories');

    // Insert categories
    for (const categoryData of categories) {
      try {
        // Check if category already exists
        const existingCategory = await Category.findOne({ name: categoryData.name });
        
        if (existingCategory) {
          console.log(`⏭️ Category "${categoryData.name}" already exists, skipping...`);
          continue;
        }

        const category = await Category.create(categoryData);
        console.log(`✅ Created category: ${category.name} (${category.slug})`);
      } catch (error) {
        console.error(`❌ Error creating category "${categoryData.name}":`, error.message);
      }
    }

    console.log('🎉 Category seeding completed!');
    
    // Display final count
    const totalCategories = await Category.countDocuments();
    console.log(`📊 Total categories in database: ${totalCategories}`);

  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the seeder
seedCategories();
