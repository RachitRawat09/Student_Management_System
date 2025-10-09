const Fee = require('../models/Fee');
const Student = require('../models/Student');

// @desc    Create a new fee notice
// @route   POST /api/fees/create
// @access  Private (Staff)
const createFeeNotice = async (req, res) => {
  try {
    const {
      title,
      description,
      academicYear,
      semester,
      course,
      amount,
      dueDate,
      feeType,
      category,
      createdBy
    } = req.body;

    // Validate required fields
    if (!title || !academicYear || !semester || !course || !amount || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if due date is in the future
    if (new Date(dueDate) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Due date must be in the future'
      });
    }

    // Count total students for this semester and course
    const totalStudents = await Student.countDocuments({
      'academicInfo.semester': semester,
      'academicInfo.course': { $regex: course, $options: 'i' },
      admissionStatus: 'Approved'
    });

    const feeNotice = new Fee({
      title,
      description,
      academicYear,
      semester,
      course,
      amount,
      dueDate: new Date(dueDate),
      feeType: feeType || 'Tuition',
      category: category || 'Regular',
      createdBy: createdBy || 'Staff',
      totalStudents
    });

    await feeNotice.save();

    res.status(201).json({
      success: true,
      message: 'Fee notice created successfully',
      data: feeNotice
    });

  } catch (error) {
    console.error('Create fee notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Get all fee notices
// @route   GET /api/fees/list
// @access  Private (Staff)
const getAllFeeNotices = async (req, res) => {
  try {
    const { page = 1, limit = 10, semester, course, status } = req.query;
    
    const filter = {};
    if (semester) filter.semester = semester;
    if (course) filter.course = { $regex: course, $options: 'i' };
    if (status) filter.status = status;

    const fees = await Fee.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Fee.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        fees,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalFees: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get fee notices error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Get fee notices for a specific student
// @route   GET /api/fees/student/:email
// @access  Private (Student)
const getStudentFees = async (req, res) => {
  try {
    const { email } = req.params;
    
    // Get student information
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get fee notices for student's semester and course
    const feeNotices = await Fee.find({
      semester: student.academicInfo.semester,
      course: { $regex: student.academicInfo.course, $options: 'i' },
      status: 'Active',
      isVisible: true
    }).sort({ dueDate: 1 });

    // Add payment status for each fee
    const feesWithPaymentStatus = feeNotices.map(fee => {
      const payment = fee.payments.find(p => p.studentEmail === email);
      return {
        ...fee.toObject(),
        paymentStatus: payment ? payment.status : 'Pending',
        paymentDate: payment ? payment.paymentDate : null,
        transactionId: payment ? payment.transactionId : null,
        receiptNumber: payment ? payment.receiptNumber : null
      };
    });

    res.status(200).json({
      success: true,
      data: {
        student: {
          name: `${student.firstName} ${student.lastName || ''}`.trim(),
          email: student.email,
          course: student.academicInfo.course,
          semester: student.academicInfo.semester
        },
        fees: feesWithPaymentStatus
      }
    });

  } catch (error) {
    console.error('Get student fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Record a payment
// @route   POST /api/fees/pay
// @access  Private (Student)
const recordPayment = async (req, res) => {
  try {
    const {
      feeId,
      studentEmail,
      amount,
      paymentMethod,
      transactionId,
      notes
    } = req.body;

    // Validate required fields
    if (!feeId || !studentEmail || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Find the fee notice
    const fee = await Fee.findById(feeId);
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee notice not found'
      });
    }

    // Check if student exists
    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if payment already exists
    const existingPayment = fee.payments.find(p => p.studentEmail === studentEmail);
    if (existingPayment && existingPayment.status === 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment already recorded for this fee'
      });
    }

    // Generate receipt number
    const receiptNumber = `RCP${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const paymentData = {
      studentId: student._id,
      studentEmail,
      amount: parseFloat(amount),
      paymentMethod: paymentMethod || 'Online',
      transactionId: transactionId || '',
      paymentDate: new Date(),
      status: 'Completed',
      receiptNumber,
      notes: notes || ''
    };

    // Update or add payment
    if (existingPayment) {
      Object.assign(existingPayment, paymentData);
    } else {
      fee.payments.push(paymentData);
    }

    await fee.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      data: {
        payment: paymentData,
        fee: {
          title: fee.title,
          amount: fee.amount,
          dueDate: fee.dueDate
        }
      }
    });

  } catch (error) {
    console.error('Record payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Get fee statistics
// @route   GET /api/fees/stats
// @access  Private (Staff)
const getFeeStatistics = async (req, res) => {
  try {
    const { semester, course } = req.query;
    
    const filter = { status: 'Active' };
    if (semester) filter.semester = semester;
    if (course) filter.course = { $regex: course, $options: 'i' };

    const fees = await Fee.find(filter);
    
    const stats = {
      totalFees: fees.length,
      totalAmount: fees.reduce((sum, fee) => sum + fee.amount, 0),
      totalStudents: fees.reduce((sum, fee) => sum + fee.totalStudents, 0),
      totalPaid: fees.reduce((sum, fee) => sum + fee.paidStudents, 0),
      totalPending: fees.reduce((sum, fee) => sum + fee.pendingStudents, 0),
      collectionRate: 0
    };

    if (stats.totalStudents > 0) {
      stats.collectionRate = ((stats.totalPaid / stats.totalStudents) * 100).toFixed(2);
    }

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get fee statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// @desc    Update fee notice status
// @route   PUT /api/fees/:id/status
// @access  Private (Staff)
const updateFeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const fee = await Fee.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee notice not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Fee status updated successfully',
      data: fee
    });

  } catch (error) {
    console.error('Update fee status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createFeeNotice,
  getAllFeeNotices,
  getStudentFees,
  recordPayment,
  getFeeStatistics,
  updateFeeStatus
};
