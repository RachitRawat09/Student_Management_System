const express = require('express');
const { getStudentByEmail, getHostelInfo, applyForHostel } = require('../controllers/studentController');

const router = express.Router();

// Public for now; later protect with auth middleware
router.get('/by-email/:email', getStudentByEmail);
router.get('/hostel/:email', getHostelInfo);
router.post('/hostel/apply', applyForHostel);

module.exports = router;



