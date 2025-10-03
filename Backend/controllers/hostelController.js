const Student = require('../models/Student');
const { sendHostelAllocationEmail } = require('../services/emailService');

// GET /api/hostel/stats
// single block with 100 single, 100 double, 100 triple
module.exports.getHostelStats = async (req, res) => {
  try {
    const totals = { Single: 100, Double: 100, Triple: 100 };
    // Count unique rooms (not individual students)
    const allocations = await Student.aggregate([
      { $match: { 'hostel.allocation.roomType': { $in: ['Single','Double','Triple'] }, 'hostel.allocation.status': 'Active' } },
      { $group: { _id: { roomType: '$hostel.allocation.roomType', roomNumber: '$hostel.allocation.roomNumber' } } },
      { $group: { _id: '$_id.roomType', count: { $sum: 1 } } }
    ]);
    const filled = allocations.reduce((acc, cur) => { acc[cur._id] = cur.count; return acc; }, {});
    const stats = ['Single','Double','Triple'].map(type => ({
      type,
      total: totals[type],
      filled: filled[type] || 0,
      empty: totals[type] - (filled[type] || 0)
    }));
    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// GET /api/hostel/applications
module.exports.listApplications = async (req, res) => {
  try {
    const apps = await Student.find({ 'hostel.applied': true })
      .select('firstName email academicInfo.course hostel.application');
    return res.status(200).json({ success: true, data: apps });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// POST /api/hostel/allocate
// body: { email, roomType, roomNumber }
module.exports.allocateRoom = async (req, res) => {
  try {
    const { email, roomType, roomNumber } = req.body || {};
    if (!email || !roomType || !roomNumber) {
      return res.status(400).json({ success: false, message: 'email, roomType and roomNumber are required' });
    }
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    // Activate allocation
    student.hostel = student.hostel || {};
    student.hostel.allocation = {
      ...(student.hostel.allocation || {}),
      roomType,
      roomNumber,
      block: 'Main',
      floor: '',
      monthlyRent: roomType === 'Single' ? '₹10,000' : roomType === 'Double' ? '₹8,000' : '₹6,000',
      status: 'Active',
      checkInDate: new Date()
    };
    await student.save();

    try {
      await sendHostelAllocationEmail({ toEmail: student.email, firstName: student.firstName, roomNumber, roomType });
    } catch (e) {
      // log and continue
      console.error('Allocation email error:', e.message);
    }
    return res.status(200).json({ success: true, message: 'Room allocated', data: student.hostel.allocation });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};


