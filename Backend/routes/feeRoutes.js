const express = require('express');
const {
  createFeeNotice,
  getAllFeeNotices,
  getStudentFees,
  recordPayment,
  getFeeStatistics,
  updateFeeStatus
} = require('../controllers/feeController');

const router = express.Router();

// Staff routes
router.post('/create', createFeeNotice);
router.get('/list', getAllFeeNotices);
router.get('/stats', getFeeStatistics);
router.put('/:id/status', updateFeeStatus);

// Student routes
router.get('/student/:email', getStudentFees);
router.post('/pay', recordPayment);

module.exports = router;
