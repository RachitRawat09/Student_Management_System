# 🧪 API Testing Guide - Student Admission System

## ✅ System Status
- ✅ **Server**: Running on port 5000
- ✅ **Database**: MongoDB connected
- ✅ **Cloudinary**: Connected and working
- ✅ **File Uploads**: Configured and ready

## 🚀 Available Endpoints

### 1. Health Check
```bash
GET http://localhost:5000/api/health
```
**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-09-19T16:19:17.142Z"
}
```

### 2. Submit Admission Form
```bash
POST http://localhost:5000/api/admission/submit
Content-Type: multipart/form-data
```

**Form Data Structure:**
```
# Text Fields (JSON strings)
firstName: "John"
lastName: "Doe"
email: "john.doe@example.com"
phone: "+1234567890"
dateOfBirth: "2000-01-15"
gender: "Male"
nationality: "American"

# Address (JSON string)
address: {
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA"
}

# Academic Info (JSON string)
academicInfo: {
  "course": "Computer Science",
  "semester": "Fall 2024",
  "previousEducation": {
    "institution": "ABC High School",
    "qualification": "High School Diploma",
    "yearOfPassing": 2020,
    "percentage": 85.5
  }
}

# Emergency Contact (JSON string)
emergencyContact: {
  "name": "Jane Doe",
  "relationship": "Mother",
  "phone": "+1234567891",
  "email": "jane.doe@example.com"
}

# File Uploads
profilePhoto: [file]
idProof: [file]
addressProof: [file]
academicCertificates: [file1, file2, ...]
otherDocuments: [file1, file2, ...]
```

**Success Response:**
```json
{
  "success": true,
  "message": "Admission form submitted successfully",
  "data": {
    "studentId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "admissionStatus": "Pending",
    "submittedAt": "2025-09-19T16:19:17.142Z"
  }
}
```

### 3. Check Admission Status
```bash
GET http://localhost:5000/api/admission/status/john.doe@example.com
```

**Response:**
```json
{
  "success": true,
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "admissionStatus": "Pending",
    "studentId": null,
    "submittedAt": "2025-09-19T16:19:17.142Z",
    "reviewedAt": null,
    "approvedAt": null
  }
}
```

### 4. Get All Applications (Admin)
```bash
GET http://localhost:5000/api/admission/applications?page=1&limit=10&status=Pending
```

**Response:**
```json
{
  "success": true,
  "data": {
    "students": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalStudents": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 5. Get Single Application (Admin)
```bash
GET http://localhost:5000/api/admission/applications/64f8a1b2c3d4e5f6a7b8c9d0
```

### 6. Update Admission Status (Admin)
```bash
PUT http://localhost:5000/api/admission/applications/64f8a1b2c3d4e5f6a7b8c9d0/status
Content-Type: application/json

{
  "status": "Approved"
}
```

## 🧪 Testing with Postman/Thunder Client

### Test 1: Health Check
1. Create new GET request
2. URL: `http://localhost:5000/api/health`
3. Should return 200 with success message

### Test 2: Submit Admission (with files)
1. Create new POST request
2. URL: `http://localhost:5000/api/admission/submit`
3. Set Body to `form-data`
4. Add all text fields and files
5. Send request

### Test 3: Check Status
1. Create new GET request
2. URL: `http://localhost:5000/api/admission/status/test@example.com`
3. Should return student data

## 🔧 Frontend Integration

### JavaScript Fetch Example:
```javascript
// Submit admission form
const submitAdmission = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/admission/submit', {
      method: 'POST',
      body: formData // FormData object with files and text
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Admission submitted:', result.data);
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Check admission status
const checkStatus = async (email) => {
  try {
    const response = await fetch(`http://localhost:5000/api/admission/status/${email}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### React Form Example:
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  
  // Add text fields
  formData.append('firstName', formData.firstName);
  formData.append('lastName', formData.lastName);
  formData.append('email', formData.email);
  // ... other fields
  
  // Add JSON fields
  formData.append('address', JSON.stringify(addressData));
  formData.append('academicInfo', JSON.stringify(academicData));
  formData.append('emergencyContact', JSON.stringify(emergencyData));
  
  // Add files
  if (profilePhoto) formData.append('profilePhoto', profilePhoto);
  if (idProof) formData.append('idProof', idProof);
  // ... other files
  
  try {
    const result = await submitAdmission(formData);
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 📁 File Upload Requirements

### Supported File Types:
- **Images**: JPG, JPEG, PNG
- **Documents**: PDF, DOC, DOCX

### File Size Limits:
- **Maximum**: 10MB per file

### File Fields:
- `profilePhoto`: Student's profile photo (1 file)
- `idProof`: Government ID proof (1 file)
- `addressProof`: Address verification (1 file)
- `academicCertificates`: Academic certificates (up to 5 files)
- `otherDocuments`: Other documents (up to 3 files)

## 🚨 Error Handling

### Common Errors:
1. **Validation Error (400)**:
   ```json
   {
     "success": false,
     "message": "Validation failed",
     "errors": [...]
   }
   ```

2. **Duplicate Email (400)**:
   ```json
   {
     "success": false,
     "message": "Student with this email already exists"
   }
   ```

3. **File Upload Error (400)**:
   ```json
   {
     "success": false,
     "message": "Invalid file type. Only images, PDFs, and documents are allowed."
   }
   ```

4. **Server Error (500)**:
   ```json
   {
     "success": false,
     "message": "Internal server error"
   }
   ```

## 🎯 Next Steps

1. **Test the API** using the examples above
2. **Integrate with your frontend** using the provided code examples
3. **Handle errors** appropriately in your frontend
4. **Test file uploads** with different file types and sizes

Your backend is now fully ready for production use! 🚀

