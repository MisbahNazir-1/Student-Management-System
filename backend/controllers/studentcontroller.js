const Student = require('../models/students');
const connectDB = require('../config/db');

/**
 * Creates a new student record
 */
const addStudent = async (req, res) => {
    try {
        const { name, email, course, age, city } = req.body;

        if (!name || !email || !course || !age || !city) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }

        const student = await Student.create({ name, email, course, age, city });

        return res.status(201).json({
            success: true,
            message: 'Student record created successfully',
            data: student
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

/**
 * Retrieves all student records
 */
const getAllStudents = async (req, res) => {
    try {
        await connectDB();
        const students = await Student.find();

        return res.status(200).json({
            success: true,
            message: "All students fetched successfully",
            count: students.length,
            data: students
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

/**
 * Retrieves a specific student record by ID
 */
const getStudentID = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        return res.status(200).json({
            success: true,
            message: "Student found",
            data: student
        });
    } catch (error) {
        // Handle invalid MongoDB ObjectId formats gracefully
        if (error.name === "CastError") {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

/**
 * Updates an existing student record
 */
const updateStudents = async (req, res) => {
    try {
        const { name, email, course, age, city } = req.body;

        // Use standard { new: true } to return the modified document instead of the original
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, course, age, city },
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

/**
 * Deletes a student record
 */
const deleteStudents = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        
        if (!student) {
            return res.status(404).json({ success: false, message: "Student does not exist" });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = { addStudent, getAllStudents, getStudentID, updateStudents, deleteStudents };
