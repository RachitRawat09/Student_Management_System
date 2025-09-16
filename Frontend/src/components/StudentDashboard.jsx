import React from "react";

const StudentDashboard = () => {
  // Dummy data for demonstration
  const studentData = {
    name: "John Doe",
    studentId: "STU2024001",
    course: "Computer Science Engineering",
    semester: "3rd Semester",
    batch: "2022-2026",
    cgpa: "8.5",
    attendance: "92%"
  };

  const academicInfo = {
    currentSemester: "3rd Semester",
    totalCredits: "120",
    completedCredits: "90",
    cgpa: "8.5",
    attendance: "92%",
    nextExam: "Mid-Term Exams",
    examDate: "March 15, 2024"
  };

  const hostelDetails = {
    roomNumber: "A-205",
    block: "Block A",
    floor: "2nd Floor",
    roomType: "Double Sharing",
    monthlyRent: "₹8,000",
    status: "Active",
    checkInDate: "August 15, 2022",
    amenities: ["WiFi", "Laundry", "Common Room", "Mess"]
  };

  const feesStatus = {
    totalFees: "₹1,50,000",
    paidFees: "₹1,20,000",
    pendingFees: "₹30,000",
    nextDueDate: "March 31, 2024",
    status: "Partially Paid",
    lastPayment: "₹30,000 on Jan 15, 2024"
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {studentData.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              {studentData.course} • {studentData.semester} • {studentData.batch}
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Student ID: {studentData.studentId}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-sm text-blue-100">Current CGPA</p>
              <p className="text-2xl font-bold">{studentData.cgpa}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">CGPA</p>
              <p className="text-2xl font-bold text-gray-900">{academicInfo.cgpa}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{academicInfo.attendance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hostel</p>
              <p className="text-2xl font-bold text-gray-900">{hostelDetails.roomNumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fees Status</p>
              <p className="text-2xl font-bold text-gray-900">{feesStatus.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Information */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">📚</span>
              Academic Information
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details →
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Current Semester</span>
              <span className="font-semibold">{academicInfo.currentSemester}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Credits</span>
              <span className="font-semibold">{academicInfo.totalCredits}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Completed Credits</span>
              <span className="font-semibold">{academicInfo.completedCredits}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Next Exam</span>
              <span className="font-semibold">{academicInfo.nextExam}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Exam Date</span>
              <span className="font-semibold text-red-600">{academicInfo.examDate}</span>
            </div>
          </div>
        </div>

        {/* Hostel Details */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">🏠</span>
              Hostel Details
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details →
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Room Number</span>
              <span className="font-semibold">{hostelDetails.roomNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Block & Floor</span>
              <span className="font-semibold">{hostelDetails.block}, {hostelDetails.floor}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Room Type</span>
              <span className="font-semibold">{hostelDetails.roomType}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Monthly Rent</span>
              <span className="font-semibold">{hostelDetails.monthlyRent}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-green-600">{hostelDetails.status}</span>
            </div>
          </div>
        </div>

        {/* Fees Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">💰</span>
              Fees Status
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Fees</p>
              <p className="text-2xl font-bold text-gray-900">{feesStatus.totalFees}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">{feesStatus.paidFees}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
              <p className="text-2xl font-bold text-red-600">{feesStatus.pendingFees}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Next Due Date</p>
                <p className="font-semibold text-red-600">{feesStatus.nextDueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Payment</p>
                <p className="font-semibold text-green-600">{feesStatus.lastPayment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Recent Activities
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Fee payment received</p>
              <p className="text-xs text-gray-600">₹30,000 paid on January 15, 2024</p>
            </div>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Assignment submitted</p>
              <p className="text-xs text-gray-600">Data Structures Assignment - 95%</p>
            </div>
            <span className="text-xs text-gray-500">1 week ago</span>
          </div>
          
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Hostel maintenance</p>
              <p className="text-xs text-gray-600">Room A-205 maintenance completed</p>
            </div>
            <span className="text-xs text-gray-500">2 weeks ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
