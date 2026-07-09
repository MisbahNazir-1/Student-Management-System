const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Stable token generation method
const signToken = (id) => {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_safety';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign({ id }, secret, { expiresIn });
};

// Register Function
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter all fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered!' });
        }

        const newUser = await User.create({ name, email, password });
        const token = signToken(newUser._id.toString());

        return res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            token,
            user: { id: newUser._id, name, email, role: newUser.role }
        });
    } catch (error) {
        console.error("REGISTER CRASH LOG:", error.message);
        return res.status(500).json({ success: false, message: 'Something went wrong while creating account', error: error.message });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter credentials' });
        }
        
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = signToken(user._id.toString());

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("LOGIN CRASH LOG:", error.message);
        return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
    }
};

module.exports = { register, login };
