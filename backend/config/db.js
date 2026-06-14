const mongoose = require('mongoose');

// Serverless state caching
let isConnected = false;

const connectDB = async () => {
  // Agar pehle se connected hai toh bypass karo
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    // bufferCommands: false lagane se Mongoose freeze nahi hoga
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false
    });
    
    isConnected = !!conn.connections[0].readyState;
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error('something went wrong!', error.message);
  }
};

module.exports = connectDB;