const Student = require('../models/Student');

// GET /api/students/by-email/:email
module.exports.getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// GET /api/students/hostel/:email
module.exports.getHostelInfo = async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email }).select('email firstName hostel');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    
    let hostelData = student.hostel || {};
    
    // If student has allocation, find roommates
    if (hostelData.allocation && hostelData.allocation.status === 'Active' && hostelData.allocation.roomNumber) {
      const roommates = await Student.find({
        'hostel.allocation.roomNumber': hostelData.allocation.roomNumber,
        'hostel.allocation.roomType': hostelData.allocation.roomType,
        'hostel.allocation.status': 'Active',
        email: { $ne: email } // Exclude current student
      }).select('firstName email academicInfo.course');
      
      hostelData.roommates = roommates;
    }
    
    return res.status(200).json({ success: true, data: hostelData });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// POST /api/students/hostel/apply
// body: { email, preferences: { roomType, blockPreference } }
module.exports.applyForHostel = async (req, res) => {
  try {
    const { email, preferences } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (student.hostel?.applied && student.hostel?.application?.appliedAt) {
      return res.status(200).json({ success: true, message: 'Already applied', data: student.hostel });
    }

    student.hostel = student.hostel || {};
    student.hostel.applied = true;
    student.hostel.application = {
      preferences: {
        roomType: preferences?.roomType || 'Double'
      },
      appliedAt: new Date()
    };
    // Allocation can be done later by admin; keep status pending
    student.hostel.allocation = {
      ...(student.hostel.allocation || {}),
      status: 'Pending'
    };
    await student.save();

    return res.status(200).json({ success: true, message: 'Hostel application submitted', data: student.hostel });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};



