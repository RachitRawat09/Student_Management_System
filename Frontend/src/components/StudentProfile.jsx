import React from "react";

const StudentProfile = () => {
  // Dummy data for student profile (read-only admission details)
  const personalInfo = {
    fullName: "John Doe",
    studentId: "STU2024001",
    email: "john.doe@student.edu",
    phone: "+91 98765 43210",
    dateOfBirth: "March 15, 2002",
    gender: "Male",
    nationality: "Indian",
    bloodGroup: "O+",
    category: "General",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  };

  const addressInfo = {
    permanentAddress: "123 Main Street, Sector 15, New Delhi, Delhi - 110001",
    currentAddress: "Room A-205, Block A, University Hostel, Campus Area, New Delhi - 110016"
  };

  const parentInfo = {
    fatherName: "Robert Doe",
    fatherOccupation: "Software Engineer",
    fatherContact: "+91 98765 43211",
    motherName: "Sarah Doe",
    motherOccupation: "Teacher",
    motherContact: "+91 98765 43212",
    annualIncome: "₹8,00,000"
  };

  const academicInfo = {
    course: "Computer Science Engineering",
    specialization: "Software Engineering",
    semester: "3rd Semester",
    batch: "2022-2026",
    admissionDate: "August 15, 2022",
    rollNumber: "CSE2022001",
    enrollmentNumber: "ENR2022001"
  };

  const educationalBackground = [
    {
      qualification: "10th Standard",
      school: "Delhi Public School",
      board: "CBSE",
      passingYear: "2018",
      percentage: "92%"
    },
    {
      qualification: "12th Standard",
      school: "Delhi Public School",
      board: "CBSE",
      passingYear: "2020",
      percentage: "88%"
    },
    {
      qualification: "JEE Main",
      exam: "Joint Entrance Examination",
      year: "2022",
      rank: "15,000",
      score: "285/300"
    }
  ];

  const documents = [
    { name: "Profile Photo", status: "Uploaded", icon: "📷" },
    { name: "Signature", status: "Uploaded", icon: "✍️" },
    { name: "Aadhaar Card", status: "Uploaded", icon: "🆔" },
    { name: "10th Marksheet", status: "Uploaded", icon: "📄" },
    { name: "12th Marksheet", status: "Uploaded", icon: "📄" },
    { name: "JEE Score Card", status: "Uploaded", icon: "📊" },
    { name: "Transfer Certificate", status: "Uploaded", icon: "📋" },
    { name: "Migration Certificate", status: "Uploaded", icon: "📋" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center">
          <img 
            src={personalInfo.profileImage} 
            alt="Profile" 
            className="w-20 h-20 rounded-full border-4 border-white mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
            <p className="text-purple-100">
              {academicInfo.course} • {academicInfo.semester} • {academicInfo.batch}
            </p>
            <p className="text-purple-200 text-sm">
              Student ID: {personalInfo.studentId}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">👤</span>
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Full Name</span>
              <span className="font-semibold">{personalInfo.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Date of Birth</span>
              <span className="font-semibold">{personalInfo.dateOfBirth}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Gender</span>
              <span className="font-semibold">{personalInfo.gender}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Blood Group</span>
              <span className="font-semibold">{personalInfo.bloodGroup}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold">{personalInfo.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Phone</span>
              <span className="font-semibold">{personalInfo.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Nationality</span>
              <span className="font-semibold">{personalInfo.nationality}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Category</span>
              <span className="font-semibold">{personalInfo.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📍</span>
          Address Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Address</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{addressInfo.permanentAddress}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{addressInfo.currentAddress}</p>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">👨‍👩‍👧‍👦</span>
          Parent/Guardian Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Father's Details</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Name</span>
              <span className="font-semibold">{parentInfo.fatherName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Occupation</span>
              <span className="font-semibold">{parentInfo.fatherOccupation}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Contact</span>
              <span className="font-semibold">{parentInfo.fatherContact}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Mother's Details</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Name</span>
              <span className="font-semibold">{parentInfo.motherName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Occupation</span>
              <span className="font-semibold">{parentInfo.motherOccupation}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Contact</span>
              <span className="font-semibold">{parentInfo.motherContact}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Annual Family Income</span>
            <span className="font-semibold">{parentInfo.annualIncome}</span>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🎓</span>
          Academic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Course</span>
              <span className="font-semibold">{academicInfo.course}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Specialization</span>
              <span className="font-semibold">{academicInfo.specialization}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Current Semester</span>
              <span className="font-semibold">{academicInfo.semester}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Batch</span>
              <span className="font-semibold">{academicInfo.batch}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Admission Date</span>
              <span className="font-semibold">{academicInfo.admissionDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Roll Number</span>
              <span className="font-semibold">{academicInfo.rollNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Enrollment Number</span>
              <span className="font-semibold">{academicInfo.enrollmentNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Student ID</span>
              <span className="font-semibold">{personalInfo.studentId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Background */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📚</span>
          Educational Background
        </h2>
        <div className="space-y-4">
          {educationalBackground.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.qualification}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.school || edu.exam} • {edu.board || edu.year}
                  </p>
                  <p className="text-sm text-gray-500">Passing Year: {edu.passingYear || edu.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    {edu.percentage || edu.score || edu.rank}
                  </p>
                  <p className="text-xs text-gray-500">
                    {edu.percentage ? 'Percentage' : edu.score ? 'Score' : 'Rank'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Status */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📄</span>
          Documents Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">{doc.icon}</div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{doc.name}</h3>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-blue-600 mr-3 mt-1">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Profile Information</h3>
            <p className="text-blue-800 text-sm">
              This profile contains your admission details and is read-only. 
              If you need to update any information, please contact the administration office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
