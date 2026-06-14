const { findPackageJSON } = require('node:module');
const Student = require('../models/students');
const connectDB = require('../config/db');

// inserting data of students
const addStudent = async (req, res) => {
    try {
        const { name, email, course, age, city } = req.body;

        if (!name || !email || !course || !age || !city) {
            return res.status(400).json({
                success: false,
                message: 'please provide all fields'
            })
        }
        const student = await Student.create({ name, email, course, age, city })
        // From your controller
return res.status(200).json({
    success: true,
    dataA: students, // <--- You named it dataA
})

    } catch (error) {

    }
}

// gettings data of all students
const getAllStudents = async (req, res) => {
    try {
        await connectDB();

        const students = await Student.find();

        res.status(200).json({
            success: true,
            message: "All Students fetched successfully",
            count: students.length,
            dataA: students,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Serve Error",
            error: error.message
        })
    }
}
// API of getting data of any specific student
const getStudentID = async (req, res) => {
    try {

        const student = await Student.findById(req.params.id)

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found '
            })
        }

        res.status(200).json({
            success: true,
            message: "Student found!",
            data: student
        })
    } catch (error) {
        // checking if the ID is in valid format or not 
        if (error.name === "CastError") {
            res.status(400).json({
                success: false,
                message: "Invalid ID format or Server Error",
                error: error.message
            })
        }
    }
}

// API fro updating the data
const updateStudents = async (req, res) => {
    try {
        const { name, email, course, age, city } = req.body;

        // getting updated values from user
        const updateData = {};
        updateData.name = name;
        updateData.email = email;
        updateData.course = course;
        updateData.age = age;
        updateData.city = city;

        const student = await Student.findByIdAndUpdate(
            req.param.id,
        )
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Student updated successfully!!"

        })
    } catch (Error) {
        res.status(500).json({
            success: false,
            message: "Serve Error",
            error: error.message
        })
    }
}
//  API for deleing the sudent record
const deleteStudents = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        // return res.status(404).json({
        //     success: false,
        //     message: "Student do not exist"
        // })
        res.status(200).json({
            success: true,
            message: "Student deleted successfully!!"
        })
    } catch (error) {

    }
}

module.exports = { addStudent, getAllStudents, getStudentID, updateStudents, deleteStudents };