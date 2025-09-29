const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  },
  
  // Address Information
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    }
  },

  // Academic Information
  academicInfo: {
    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      trim: true
    },
    previousEducation: {
      institution: {
        type: String,
        required: [true, 'Previous institution is required'],
        trim: true
      },
      qualification: {
        type: String,
        required: [true, 'Previous qualification is required'],
        trim: true
      },
      yearOfPassing: {
        type: Number,
        required: [true, 'Year of passing is required']
      },
      percentage: {
        type: Number,
        required: [true, 'Percentage is required'],
        min: 0,
        max: 100
      }
    }
  },

  // Documents
  documents: {
    profilePhoto: {
      type: String,
      default: ''
    },
    idProof: {
      type: String,
      default: ''
    },
    addressProof: {
      type: String,
      default: ''
    },
    academicCertificates: [{
      type: String
    }],
    otherDocuments: [{
      type: String
    }]
  },

  // Emergency Contact
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required'],
      trim: true
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true
    }
  },

  // Admission Status
  admissionStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Under Review'],
    default: 'Pending'
  },
  
  // Student ID (generated after approval)
  studentId: {
    type: String,
    unique: true,
    sparse: true
  },

  // Authentication
  passwordHash: {
    type: String,
  },

  // Hostel Information
  hostel: {
    applied: {
      type: Boolean,
      default: false
    },
    application: {
      preferences: {
        roomType: { type: String, enum: ['Single', 'Double', 'Triple'], default: 'Double' },
        blockPreference: { type: String, default: '' }
      },
      appliedAt: { type: Date }
    },
    allocation: {
      roomNumber: { type: String, default: '' },
      block: { type: String, default: '' },
      floor: { type: String, default: '' },
      roomType: { type: String, default: '' },
      monthlyRent: { type: String, default: '' },
      status: { type: String, enum: ['Active', 'Inactive', 'Pending'], default: 'Pending' },
      checkInDate: { type: Date },
      expectedCheckOut: { type: Date },
    },
    payments: [
      {
        month: String,
        amount: String,
        status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
        date: String
      }
    ]
  },

  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate student ID before saving
studentSchema.pre('save', function(next) {
  if (this.admissionStatus === 'Approved' && !this.studentId) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.studentId = `STU${year}${randomNum}`;
  }
  next();
});

// Index for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ studentId: 1 });
studentSchema.index({ admissionStatus: 1 });

module.exports = mongoose.model('Student', studentSchema);

