const express = require('express');
const { body } = require('express-validator');
const {
  submitAdmission,
  getAllApplications,
  getApplicationById,
  updateAdmissionStatus,
  checkAdmissionStatus,
  deleteApplication
} = require('../controllers/admissionController');
const { uploadFields } = require('../middlewares/upload');

const router = express.Router();

// Validation middleware
const admissionValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16 || age > 100) {
        throw new Error('Age must be between 16 and 100 years');
      }
      return true;
    }),
  
  body('gender')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  
  body('nationality')
    .trim()
    .notEmpty()
    .withMessage('Nationality is required'),
  
  body('address')
    .custom((value) => {
      try {
        const address = JSON.parse(value);
        if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
          throw new Error('All address fields are required');
        }
        return true;
      } catch (error) {
        throw new Error('Invalid address format');
      }
    }),
  
  body('academicInfo')
    .custom((value) => {
      try {
        const academicInfo = JSON.parse(value);
        if (!academicInfo.course || !academicInfo.semester || !academicInfo.previousEducation) {
          throw new Error('All academic information fields are required');
        }
        const prevEdu = academicInfo.previousEducation;
        if (!prevEdu.institution || !prevEdu.qualification || !prevEdu.yearOfPassing || !prevEdu.percentage) {
          throw new Error('All previous education fields are required');
        }
        if (prevEdu.percentage < 0 || prevEdu.percentage > 100) {
          throw new Error('Percentage must be between 0 and 100');
        }
        return true;
      } catch (error) {
        throw new Error('Invalid academic information format');
      }
    }),
  
  body('emergencyContact')
    .custom((value) => {
      try {
        const emergencyContact = JSON.parse(value);
        if (!emergencyContact.name || !emergencyContact.relationship || !emergencyContact.phone) {
          throw new Error('All emergency contact fields are required');
        }
        return true;
      } catch (error) {
        throw new Error('Invalid emergency contact format');
      }
    })
];

// File upload configuration
const fileUploadConfig = [
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'addressProof', maxCount: 1 },
  { name: 'academicCertificates', maxCount: 5 },
  { name: 'otherDocuments', maxCount: 3 }
];

// Routes

// @route   POST /api/admission/submit
// @desc    Submit admission form with file uploads
// @access  Public
router.post('/submit', 
  uploadFields(fileUploadConfig),
  admissionValidation,
  submitAdmission
);

// @route   GET /api/admission/applications
// @desc    Get all admission applications (with pagination and filtering)
// @access  Private (Admin)
router.get('/applications', getAllApplications);

// @route   GET /api/admission/applications/:id
// @desc    Get single admission application by ID
// @access  Private (Admin)
router.get('/applications/:id', getApplicationById);

// @route   PUT /api/admission/applications/:id/status
// @desc    Update admission status
// @access  Private (Admin)
router.put('/applications/:id/status', 
  [
    body('status')
      .isIn(['Pending', 'Approved', 'Rejected', 'Under Review'])
      .withMessage('Invalid status')
  ],
  updateAdmissionStatus
);

// @route   GET /api/admission/status/:email
// @desc    Check admission status by email
// @access  Public
router.get('/status/:email', checkAdmissionStatus);

// @route   DELETE /api/admission/applications/:id
// @desc    Delete admission application
// @access  Private (Admin)
router.delete('/applications/:id', deleteApplication);

module.exports = router;

