const mongoose = require('mongoose');

// Cache connection to optimize performance in serverless environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to MongoDB with connection pooling.
 */
async function connectDB() {
  // If a cached connection exists, verify it is still healthy before returning
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // Allowed Mongoose to handle query buffering natively during cold starts
      bufferCommands: true, 
      maxPoolSize: 10, // Keeps connections lean for serverless scaling
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
      console.log('=> MongoDB connected successfully');
      return mongooseInstance;
    }).catch((error) => {
      cached.promise = null; // Clear promise on error to allow retries
      console.error('=> MongoDB connection error:', error.message);
      throw error;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
