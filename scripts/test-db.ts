import mongoose from 'mongoose';

async function testConnection() {
  try {
    await mongoose.connect('mongodb://localhost:27017/eduquest');
    console.log('✅ MongoDB connected successfully');
    
    // Create a test collection
    const testCollection = mongoose.connection.collection('test');
    
    // Insert a test document
    await testCollection.insertOne({
      test: 'connection',
      date: new Date()
    });
    console.log('✅ Test document inserted successfully');
    
    // Read the test document
    const doc = await testCollection.findOne({ test: 'connection' });
    console.log('📄 Retrieved test document:', doc);
    
    // Clean up: remove the test document
    await testCollection.deleteOne({ test: 'connection' });
    console.log('🧹 Test document cleaned up');
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 MongoDB disconnected');
  }
}

testConnection();