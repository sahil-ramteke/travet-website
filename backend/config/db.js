const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Force IPv4
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:');
    console.error('Name:', err.name);
    console.error('Message:', err.message);
    console.error('Code:', err.code);
    console.error('Stack:', err.stack);
    process.exit(1);
  }
};

module.exports = connectDB;