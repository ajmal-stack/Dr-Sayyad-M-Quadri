/**
 * Seed Treatment Data Script
 * Run with: node seedTreatments.js
 */

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Treatment from './src/modules/treatment/models/Treatment.js';
import { config } from './src/config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.database.uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

/**
 * Seed treatments from JSON file
 */
const seedTreatments = async () => {
  try {
    console.log('🌱 Starting treatment seeding...\n');

    // Read treatments data
    const treatmentsPath = path.join(__dirname, 'seedTreatments.json');
    const treatmentsData = JSON.parse(fs.readFileSync(treatmentsPath, 'utf-8'));

    console.log(`📊 Found ${treatmentsData.length} treatments to seed\n`);

    // Clear existing treatments
    const deleteResult = await Treatment.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing treatments\n`);

    // Insert new treatments
    const insertedTreatments = await Treatment.insertMany(treatmentsData);
    console.log(`✅ Successfully seeded ${insertedTreatments.length} treatments\n`);

    // Display summary
    console.log('📋 Seeded Treatments Summary:');
    console.log('─'.repeat(50));

    const mentalHealth = insertedTreatments.filter(t => t.category === 'Mental Health');
    const generalHealth = insertedTreatments.filter(t => t.category === 'General Health');
    const featured = insertedTreatments.filter(t => t.featured);

    console.log(`\n📊 Statistics:`);
    console.log(`   Total Treatments: ${insertedTreatments.length}`);
    console.log(`   Mental Health: ${mentalHealth.length}`);
    console.log(`   General Health: ${generalHealth.length}`);
    console.log(`   Featured: ${featured.length}`);
    console.log(`   Published: ${insertedTreatments.filter(t => t.status === 'published').length}`);

    console.log(`\n🧠 Mental Health Treatments:`);
    mentalHealth.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.name} ${t.featured ? '⭐' : ''}`);
    });

    console.log(`\n🏥 General Health Treatments:`);
    generalHealth.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.name} ${t.featured ? '⭐' : ''}`);
    });

    console.log('\n✅ Seeding completed successfully!');
    console.log('\n🔗 Test the API:');
    console.log('   curl http://localhost:5000/api/v1/treatments/stats');
    console.log('   curl http://localhost:5000/api/v1/treatments/featured');
    console.log('   curl http://localhost:5000/api/v1/treatments/categories\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  }
};

/**
 * Main execution
 */
const main = async () => {
  try {
    await connectDB();
    await seedTreatments();
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
};

// Run the script
main();
