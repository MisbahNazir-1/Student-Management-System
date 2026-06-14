const mongoose = require('mongoose');

// Ek global variable banayein connection state ko track karne ke liye
let isConnected = false;

const connectDB = async () => {
  // Agar pehle se connected hai, toh wahin se return ho jao
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = !!conn.connections[0].readyState;
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error('something went wrong!', error.message);
  }
};

module.exports = connectDB;