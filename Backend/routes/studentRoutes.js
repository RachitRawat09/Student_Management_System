const express = require('express');
const { 
  getStudentByEmail, 
  getHostelInfo, 
  applyForHostel, 
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentById
} = require('../controllers/studentController');

const router = express.Router();

// Public for now; later protect with auth middleware
router.get('/all', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/by-email/:email', getStudentByEmail);
router.get('/hostel/:email', getHostelInfo);
router.post('/hostel/apply', applyForHostel);

module.exports = router;



