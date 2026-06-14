const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Generates a secure JSON Web Token for authenticated sessions
const signToken = (id) => 
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

/**
 * Handles new user registration
 */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter all fields' });
        }

        // Prevent duplicate accounts
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered!' });
        }

        const newUser = await User.create({ name, email, password });
        const token = signToken(newUser._id);

        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            token,
            user: { id: newUser._id, name, email, role: newUser.role }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

/**
 * Handles user authentication and login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter credentials' });
        }
        
        // Explicitly fetch password field (assumed select: false in model schema for security)
        const user = await User.findOne({ email }).select('+password');

        // Verify user existence and password authenticity securely
        if (!user || !(await user.matchPassword(password))){
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = signToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

module.exports = { register, login };
