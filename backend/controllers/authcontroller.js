const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Keep only this one

const signToken = (id) => 
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

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

        const newUser = await User.create({ name, email, password }); // Use newUser here
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { // Fixed the comma error
            return res.status(400).json({ success: false, message: 'Please enter credentials' });
        }
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))){
            return res.status(401).json({
                success:false,
                message:"Invalid username or password"
            })
        }
        // ... inside your login function after the password check
const token = signToken(user._id);

return res.status(200).json({
    success: true,
    message: 'Logged in successfully!',
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
});

        // Add your login logic here (password comparison, etc.)
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

module.exports = { register, login }; // Export both
