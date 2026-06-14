const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        minLength: [3, 'Please enter name of minimum 3 characters'],
        maxLength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        lowercase: true,
        trim: true,
        unique: true
    },
    course: {
        type: String,
        required: [true, 'Course is required'],
        enum: {
            // Strict course validation list
            values: ['MERN', 'React', 'Android', 'AI', 'Graphic'],
            message: '{VALUE} is not a valid course'
        }
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }); // Automatically manages createdAt and updatedAt tracking

module.exports = mongoose.model('Student', studentSchema, 'students');
