# Student Management System - Backend

This is the backend API for the Student Management System, built with Node.js, Express, and MongoDB.

## Features

- Student admission form submission with file uploads
- Cloudinary integration for document storage
- Comprehensive validation
- Admin panel for managing applications
- Status tracking for admission applications

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the Backend directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/student_management

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT Secret (for future authentication)
JWT_SECRET=your_jwt_secret_key
```

### 2. Cloudinary Setup

1. Sign up for a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add these credentials to your `.env` file

### 3. Database Setup

Make sure MongoDB is running on your system. You can:
- Install MongoDB locally
- Use MongoDB Atlas (cloud)
- Use Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### Admission Routes

#### Submit Admission Form
- **POST** `/api/admission/submit`
- **Description**: Submit student admission form with file uploads
- **Access**: Public
- **Body**: Form data with files and JSON fields

#### Get All Applications
- **GET** `/api/admission/applications`
- **Description**: Get all admission applications with pagination
- **Access**: Private (Admin)
- **Query Parameters**: 
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `status` (optional): Filter by status

#### Get Application by ID
- **GET** `/api/admission/applications/:id`
- **Description**: Get specific admission application
- **Access**: Private (Admin)

#### Update Admission Status
- **PUT** `/api/admission/applications/:id/status`
- **Description**: Update admission status
- **Access**: Private (Admin)
- **Body**: `{ "status": "Approved|Rejected|Pending|Under Review" }`

#### Check Admission Status
- **GET** `/api/admission/status/:email`
- **Description**: Check admission status by email
- **Access**: Public

#### Delete Application
- **DELETE** `/api/admission/applications/:id`
- **Description**: Delete admission application
- **Access**: Private (Admin)

### Health Check
- **GET** `/api/health`
- **Description**: Server health check

## File Upload Support

The system supports uploading the following document types:
- **Images**: JPG, JPEG, PNG
- **Documents**: PDF, DOC, DOCX

Maximum file size: 10MB per file

### Supported File Fields:
- `profilePhoto`: Student's profile photo
- `idProof`: Government ID proof
- `addressProof`: Address verification document
- `academicCertificates`: Academic certificates (up to 5 files)
- `otherDocuments`: Other relevant documents (up to 3 files)

## Data Model

### Student Schema
```javascript
{
  // Personal Information
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  dateOfBirth: Date,
  gender: String (Male|Female|Other),
  nationality: String,
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // Academic Information
  academicInfo: {
    course: String,
    semester: String,
    previousEducation: {
      institution: String,
      qualification: String,
      yearOfPassing: Number,
      percentage: Number
    }
  },
  
  // Documents (Cloudinary URLs)
  documents: {
    profilePhoto: String,
    idProof: String,
    addressProof: String,
    academicCertificates: [String],
    otherDocuments: [String]
  },
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  
  // Status
  admissionStatus: String (Pending|Approved|Rejected|Under Review),
  studentId: String (auto-generated after approval),
  
  // Timestamps
  submittedAt: Date,
  reviewedAt: Date,
  approvedAt: Date
}
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors (if any)
}
```

## Validation

All input data is validated using express-validator:
- Email format validation
- Phone number validation
- Age validation (16-100 years)
- Required field validation
- File type and size validation

## Security Features

- CORS configuration
- File type validation
- File size limits
- Input sanitization
- Error message sanitization in production

## Development

The server runs on port 5000 by default. Make sure your frontend is configured to make requests to `http://localhost:5000/api/`.

For development with auto-restart, use:
```bash
npm run dev
```

