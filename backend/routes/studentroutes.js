const express = require('express');
const { addStudent, getAllStudents, getStudentID, updateStudents, deleteStudents } = require('../controllers/studentcontroller.js');

const router = express.Router();

// Student management endpoints
router.post('/add', addStudent);
router.get('/all', getAllStudents);
router.get('/:id', getStudentID);
router.put('/:id', updateStudents);
router.delete('/:id', deleteStudents);

module.exports = router;
