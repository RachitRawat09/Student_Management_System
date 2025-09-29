const express = require('express');
const { getHostelStats, listApplications, allocateRoom } = require('../controllers/hostelController');

const router = express.Router();

router.get('/stats', getHostelStats);
router.get('/applications', listApplications);
router.post('/allocate', allocateRoom);

module.exports = router;



