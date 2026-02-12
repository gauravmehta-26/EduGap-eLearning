/**
 * MongoDB Connection Test Script
 * 
 * Run this script to test your MongoDB connection:
 * node scripts/test-mongodb.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');

  if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI not found in .env.local');
    console.log('\n📝 Please set MONGODB_URI in your .env.local file');
    console.log('   Example: MONGODB_URI=mongodb://localhost:27017/edugap');
    process.exit(1);
  }

  console.log('📡 Connection String:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

  try {
    console.log('\n⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ MongoDB Connected Successfully!\n');

    // Test database operations
    console.log('📊 Database Info:');
    console.log('   - Database Name:', mongoose.connection.db.databaseName);
    console.log('   - Host:', mongoose.connection.host);
    console.log('   - Port:', mongoose.connection.port);
    console.log('   - Ready State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected');

    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections:');
    if (collections.length === 0) {
      console.log('   - No collections yet (will be created when you save data)');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }

    // Test write operation
    console.log('\n🧪 Testing Write Operation...');
    const TestModel = mongoose.model('ConnectionTest', new mongoose.Schema({
      message: String,
      timestamp: Date,
    }));

    const testDoc = await TestModel.create({
      message: 'MongoDB connection test successful',
      timestamp: new Date(),
    });

    console.log('✅ Write Test Passed!');
    console.log('   - Document ID:', testDoc._id);

    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Cleanup Complete');

    console.log('\n🎉 All Tests Passed! Your MongoDB connection is working perfectly.\n');

  } catch (error) {
    console.error('\n❌ Connection Failed!');
    console.error('   Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Tip: Check your username and password in the connection string');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.log('\n💡 Tip: Check your internet connection and MongoDB Atlas IP whitelist');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.log('\n💡 Tip: Make sure MongoDB is running locally (mongod service)');
    }
    
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Connection Closed\n');
  }
}

testConnection();
