
const express = require('express');

const router =express.Router();
const {addStudent, getAllStudents, getStudentID, updateStudents, deleteStudents} = require('../controllers/studentcontroller.js');

router.post('/add', addStudent);
router.get('/showstudents', getAllStudents);
router.get('/student/:id',getStudentID);
router.put('/updatestudent/:id', updateStudents);
router.delete('/deletestudent/:id', deleteStudents);

module.exports= router;