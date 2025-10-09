const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  // Fee Notice Information
  title: {
    type: String,
    required: [true, 'Fee title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // Academic Information
  academicYear: {
    type: String,
    required: [true, 'Academic year is required'],
    trim: true
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    trim: true
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  
  // Fee Details
  amount: {
    type: Number,
    required: [true, 'Fee amount is required'],
    min: [0, 'Fee amount cannot be negative']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  
  // Fee Type and Category
  feeType: {
    type: String,
    required: [true, 'Fee type is required'],
    enum: ['Tuition', 'Hostel', 'Library', 'Lab', 'Exam', 'Other'],
    default: 'Tuition'
  },
  category: {
    type: String,
    required: [true, 'Fee category is required'],
    enum: ['Regular', 'Late', 'Fine', 'Additional'],
    default: 'Regular'
  },
  
  // Status and Visibility
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Cancelled'],
    default: 'Active'
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  
  // Created by staff
  createdBy: {
    type: String,
    required: [true, 'Created by is required'],
    trim: true
  },
  
  // Payment tracking
  payments: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    studentEmail: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['Online', 'Cash', 'Cheque', 'Bank Transfer'],
      default: 'Online'
    },
    transactionId: {
      type: String,
      trim: true
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    receiptNumber: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true
    }
  }],
  
  // Statistics
  totalStudents: {
    type: Number,
    default: 0
  },
  paidStudents: {
    type: Number,
    default: 0
  },
  pendingStudents: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update statistics before saving
feeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  this.paidStudents = this.payments.filter(p => p.status === 'Completed').length;
  this.pendingStudents = this.totalStudents - this.paidStudents;
  next();
});

// Index for better query performance
feeSchema.index({ semester: 1, course: 1 });
feeSchema.index({ academicYear: 1, semester: 1 });
feeSchema.index({ status: 1, isVisible: 1 });
feeSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Fee', feeSchema);
