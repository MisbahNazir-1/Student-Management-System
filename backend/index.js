const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentroutes.js');
const authRoutes = require('./routes/authroutes');

// Load environment variables from .env file
dotenv.config();
//calling the database function 
connectDB();

// Create Express app as a middleware
const app = express();

// use express as a middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
// localhost:4000/api/add
// ;oca;host:4000/api/getall
app.use('/api/students', studentRoutes);


//registerting the auth routes
app.use('/api/auth',authRoutes);

//creating route for testing
app.get('/test',(req,res) => {
    res.json({message:'this is a testing api'});
})

// connecting with Port
const PORT = process.env.PORT || 5000; 



//initiating the port and printing a message
app.listen(PORT,() => {
    console.log(`server is running on the port ${PORT}`)
})

