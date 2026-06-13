const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is Required'],
        minlength: [2, 'Name must be 2 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is Required'], // Fixed label
        minlength: [6, 'Password must be 6 characters long'], // Fixed logic to match your message
        select: false
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, 'Email is Required'], // Fixed label
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true }); // Fixed 'timestamp' to 'timestamps'

// Hashing logic
userSchema.pre('save', async function (next) { // Added next
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10); // Changed .salt to .genSalt
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match password logic
userSchema.methods.matchPassword = async function (enteredPassword) { // Added 's', fixed camelCase
    return await bcrypt.compare(enteredPassword, this.password); // Fixed 'passsword' typo
}

module.exports = mongoose.model('User', userSchema);
