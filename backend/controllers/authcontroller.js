const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const User = require('../models/user');

const signToken = (id) => {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_safety';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign({ id }, secret, { expiresIn });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter credentials' });
        }
        
        // Fetch user with password explicitly
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

        const token = signToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("LOGIN CRASH LOG:", error);
        return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
    }
};
