console.log('🎯 Testing basic script execution...');
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('Script arguments:', process.argv);

try {
  console.log('📦 Testing imports...');
  
  // Test basic import
  import('mongoose').then(() => {
    console.log('✅ Mongoose import successful');
  }).catch(err => {
    console.error('❌ Mongoose import failed:', err.message);
  });

  // Test config import
  import('../../../config/index.js').then((configModule) => {
    console.log('✅ Config import successful');
    console.log('Database URI:', configModule.config.database.uri);
  }).catch(err => {
    console.error('❌ Config import failed:', err.message);
  });

  // Test model import
  import('../models/Podcast.js').then(() => {
    console.log('✅ Podcast model import successful');
  }).catch(err => {
    console.error('❌ Podcast model import failed:', err.message);
  });

} catch (error) {
  console.error('❌ Script error:', error);
}

console.log('🏁 Test script completed');
