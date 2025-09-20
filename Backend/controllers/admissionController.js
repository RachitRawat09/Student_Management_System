const Student = require('../models/Student');
const { validationResult } = require('express-validator');

// @desc    Submit admission form
// @route   POST /api/admission/submit
// @access  Public
const submitAdmission = async (req, res) => {
  try {
    // Debug: Log request data
    console.log('=== ADMISSION SUBMISSION DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Extract data from request body
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      nationality,
      address,
      academicInfo,
      emergencyContact
    } = req.body;
    
    console.log('Extracted data:', {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      nationality,
      address: address ? 'Present' : 'Missing',
      academicInfo: academicInfo ? 'Present' : 'Missing',
      emergencyContact: emergencyContact ? 'Present' : 'Missing'
    });

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }

    // Handle file uploads
    const documents = {};
    
    if (req.files) {
      // Handle profile photo
      if (req.files.profilePhoto) {
        documents.profilePhoto = req.files.profilePhoto[0].path;
      }
      
      // Handle ID proof
      if (req.files.idProof) {
        documents.idProof = req.files.idProof[0].path;
      }
      
      // Handle address proof
      if (req.files.addressProof) {
        documents.addressProof = req.files.addressProof[0].path;
      }
      
      // Handle academic certificates
      if (req.files.academicCertificates) {
        documents.academicCertificates = req.files.academicCertificates.map(file => file.path);
      }
      
      // Handle other documents
      if (req.files.otherDocuments) {
        documents.otherDocuments = req.files.otherDocuments.map(file => file.path);
      }
    }

    // Create new student
    const student = new Student({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      nationality,
      address: JSON.parse(address),
      academicInfo: JSON.parse(academicInfo),
      emergencyContact: JSON.parse(emergencyContact),
      documents
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Admission form submitted successfully',
      data: {
        studentId: student._id,
        admissionStatus: student.admissionStatus,
        submittedAt: student.submittedAt
      }
    });

  } catch (error) {
    console.error('Admission submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Get all admission applications
// @route   GET /api/admission/applications
// @access  Private (Admin)
const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = {};
    if (status) {
      filter.admissionStatus = status;
    }

    const students = await Student.find(filter)
      .select('-documents') // Exclude documents for list view
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Student.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        students,
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
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Get single admission application
// @route   GET /api/admission/applications/:id
// @access  Private (Admin)
const getApplicationById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Update admission status
// @route   PUT /api/admission/applications/:id/status
// @access  Private (Admin)
const updateAdmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected', 'Under Review'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: Pending, Approved, Rejected, Under Review'
      });
    }

    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    student.admissionStatus = status;
    student.reviewedAt = new Date();
    
    if (status === 'Approved') {
      student.approvedAt = new Date();
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: `Admission status updated to ${status}`,
      data: {
        studentId: student._id,
        admissionStatus: student.admissionStatus,
        studentId: student.studentId,
        reviewedAt: student.reviewedAt
      }
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Check admission status by email
// @route   GET /api/admission/status/:email
// @access  Public
const checkAdmissionStatus = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email })
      .select('firstName lastName email admissionStatus studentId submittedAt reviewedAt approvedAt');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No application found with this email'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('Check status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Delete admission application
// @route   DELETE /api/admission/applications/:id
// @access  Private (Admin)
const deleteApplication = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // TODO: Delete files from Cloudinary if needed
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  submitAdmission,
  getAllApplications,
  getApplicationById,
  updateAdmissionStatus,
  checkAdmissionStatus,
  deleteApplication
};
