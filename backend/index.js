const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentroutes.js');
const authRoutes = require('./routes/authroutes');

// Initialize environment configuration first to ensure variables are loaded
dotenv.config();

// Establish connection to MongoDB instance
connectDB();

const app = express();

// Global Middleware Configuration
app.use(cors());
app.use(express.json());

// Application API Routes
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint for system monitoring and validation
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'active', message: 'API Gateway running smoothly' });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Production server running on port ${PORT}`);
});
