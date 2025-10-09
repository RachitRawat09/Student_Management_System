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

// GET /api/students/all - Get all students for staff dashboard
module.exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, course, semester, admissionStatus } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Search filter
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Course filter
    if (course) {
      filter['academicInfo.course'] = { $regex: course, $options: 'i' };
    }
    
    // Semester filter
    if (semester) {
      filter['academicInfo.semester'] = semester;
    }
    
    // Admission status filter
    if (admissionStatus) {
      filter.admissionStatus = admissionStatus;
    }

    // Only show approved students by default
    if (!admissionStatus) {
      filter.admissionStatus = 'Approved';
    }

    const students = await Student.find(filter)
      .select('-documents -passwordHash') // Exclude sensitive data
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Student.countDocuments(filter);

    // Transform data for frontend
    const transformedStudents = students.map(student => ({
      id: student.studentId || student._id,
      name: `${student.firstName || ''} ${student.lastName || ''}`.trim(),
      email: student.email,
      phone: student.phone,
      course: student.academicInfo?.course || 'N/A',
      semester: student.academicInfo?.semester || 'N/A',
      hostel: student.hostel?.allocation?.roomNumber || '-',
      feesDue: 0, // TODO: Calculate actual fees due
      admissionStatus: student.admissionStatus,
      gender: student.gender,
      dateOfBirth: student.dateOfBirth,
      createdAt: student.createdAt,
      _id: student._id
    }));

    res.status(200).json({
      success: true,
      data: {
        students: transformedStudents,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalStudents: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private (Staff)
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.passwordHash;
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const student = await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });

  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Staff)
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });

  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private (Staff)
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).select('-passwordHash');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports.updateStudent = updateStudent;
module.exports.deleteStudent = deleteStudent;
module.exports.getStudentById = getStudentById;



