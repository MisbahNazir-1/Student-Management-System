import mongoose from 'mongoose';

// Serverless function ke liye connection caching lazmi hai
let isConnected = false; 

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGO_URI) {
        return console.log('MONGO_URI is missing in env variables');
    }

    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false, // Yeh line buffering timeout ko rokay gi
        });

        isConnected = db.connections[0].readyState;
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
    }
};

export default connectDB;