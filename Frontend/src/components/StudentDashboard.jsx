import React, { useState, useEffect } from "react";
import { studentAPI } from "../services/api";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [hostelData, setHostelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  // Get student email from localStorage (same as other components)
  const getStudentEmail = () => {
    try {
      const authEmail = localStorage.getItem('authEmail');
      if (authEmail) return authEmail;
      
      // If no auth email found, redirect to login
      console.warn('No student email found in localStorage');
      return null;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  };
  
  const studentEmail = getStudentEmail();

  useEffect(() => {
    // If no student email found, redirect to login
    if (!studentEmail) {
      console.warn('No student email found, redirecting to login');
      window.location.href = '/login';
      return;
    }

    const fetchStudentData = async () => {
      try {
        setLoading(true);
        console.log('Fetching data for student:', studentEmail);
        
        const [studentResponse, hostelResponse] = await Promise.all([
          studentAPI.getByEmail(studentEmail),
          studentAPI.getHostel(studentEmail)
        ]);
        
        console.log('Student response:', studentResponse);
        console.log('Hostel response:', hostelResponse);
        
        if (studentResponse.success) {
          setStudentData(studentResponse.data);
        } else {
          console.warn('Student data fetch failed:', studentResponse.message);
          // Don't set error for student data failure, just use defaults
        }
        
        if (hostelResponse.success) {
          setHostelData(hostelResponse.data);
        } else {
          console.warn('Hostel data fetch failed:', hostelResponse.message);
          // Don't set error for hostel data failure, just use defaults
        }
      } catch (err) {
        console.error('Error fetching student data:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
        setError(`Failed to load student data: ${errorMessage}. Please check if the backend server is running.`);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentEmail]);

  // Default data structure for fallback
  const defaultStudentData = {
    firstName: "Student",
    studentId: "STU2024001",
    academicInfo: {
      course: "Computer Science Engineering",
      semester: "3rd Semester"
    },
    cgpa: "8.5",
    attendance: "92%"
  };

  const defaultAcademicInfo = {
    currentSemester: "3rd Semester",
    totalCredits: "120",
    completedCredits: "90",
    cgpa: "8.5",
    attendance: "92%",
    nextExam: "Mid-Term Exams",
    examDate: "March 15, 2024"
  };

  const defaultFeesStatus = {
    totalFees: "₹1,50,000",
    paidFees: "₹1,20,000",
    pendingFees: "₹30,000",
    nextDueDate: "March 31, 2024",
    status: "Partially Paid",
    lastPayment: "₹30,000 on Jan 15, 2024"
  };

  // Show loading if no student email (redirecting to login)
  if (!studentEmail) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg mb-2">{error}</p>
          <p className="text-gray-600 text-sm mb-4">Student Email: {studentEmail || 'Not found'}</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
            <button 
              onClick={() => {
                setError(null);
                setLoading(true);
                // Retry fetching data
                const fetchStudentData = async () => {
                  try {
                    const [studentResponse, hostelResponse] = await Promise.all([
                      studentAPI.getByEmail(studentEmail),
                      studentAPI.getHostel(studentEmail)
                    ]);
                    
                    if (studentResponse.success) setStudentData(studentResponse.data);
                    if (hostelResponse.success) setHostelData(hostelResponse.data);
                  } catch (err) {
                    setError(`Failed to load student data: ${err.message}`);
                  } finally {
                    setLoading(false);
                  }
                };
                fetchStudentData();
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use actual data or fallback to defaults
  const currentStudentData = studentData || defaultStudentData;
  const currentAcademicInfo = defaultAcademicInfo; // You can make this dynamic too
  const currentFeesStatus = defaultFeesStatus; // You can make this dynamic too

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentStudentData.firstName}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              {currentStudentData.academicInfo?.course || 'Course'} • {currentStudentData.academicInfo?.semester || 'Semester'}
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Student ID: {currentStudentData.studentId || 'N/A'}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-sm text-blue-100">Current CGPA</p>
              <p className="text-2xl font-bold">{currentStudentData.cgpa || 'N/A'}</p>
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
              <p className="text-2xl font-bold text-gray-900">{currentAcademicInfo.cgpa}</p>
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
              <p className="text-2xl font-bold text-gray-900">{currentAcademicInfo.attendance}</p>
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
              <p className="text-2xl font-bold text-gray-900">
                {hostelData?.allocation?.roomNumber || 'Not Allocated'}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">{currentFeesStatus.status}</p>
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
              <span className="font-semibold">{currentAcademicInfo.currentSemester}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Credits</span>
              <span className="font-semibold">{currentAcademicInfo.totalCredits}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Completed Credits</span>
              <span className="font-semibold">{currentAcademicInfo.completedCredits}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Next Exam</span>
              <span className="font-semibold">{currentAcademicInfo.nextExam}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Exam Date</span>
              <span className="font-semibold text-red-600">{currentAcademicInfo.examDate}</span>
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
          
          {hostelData?.allocation?.status === 'Active' ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Room Number</span>
                <span className="font-semibold">{hostelData.allocation.roomNumber}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Block & Floor</span>
                <span className="font-semibold">{hostelData.allocation.block}, {hostelData.allocation.floor}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Room Type</span>
                <span className="font-semibold">{hostelData.allocation.roomType}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Monthly Rent</span>
                <span className="font-semibold">{hostelData.allocation.monthlyRent}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Status</span>
                <span className="font-semibold text-green-600">{hostelData.allocation.status}</span>
              </div>
              
              {/* Roommates Section */}
              {hostelData.roommates && hostelData.roommates.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 font-medium">Roommates ({hostelData.roommates.length})</span>
                    <span className="text-xs text-blue-600">👥</span>
                  </div>
                  <div className="space-y-2">
                    {hostelData.roommates.map((roommate, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {roommate.firstName?.charAt(0) || '?'}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{roommate.firstName || 'Unknown'}</p>
                            <p className="text-xs text-gray-600">{roommate.academicInfo?.course || 'Course not specified'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : hostelData?.applied ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Hostel Application Pending</h3>
              <p className="text-gray-600 mb-4">Your hostel application is under review. You will be notified once allocation is complete.</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Applied on:</strong> {new Date(hostelData.application?.appliedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-yellow-800">
                  <strong>Room Preference:</strong> {hostelData.application?.preferences?.roomType}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Hostel Request</h3>
              <p className="text-gray-600 mb-4">You haven't applied for hostel accommodation yet.</p>
              <button 
                onClick={() => {
                  // Navigate to hostel application page
                  window.location.href = '/student/hostel';
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Make Hostel Request
              </button>
            </div>
          )}
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
              <p className="text-2xl font-bold text-gray-900">{currentFeesStatus.totalFees}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">{currentFeesStatus.paidFees}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
              <p className="text-2xl font-bold text-red-600">{currentFeesStatus.pendingFees}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Next Due Date</p>
                <p className="font-semibold text-red-600">{currentFeesStatus.nextDueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Payment</p>
                <p className="font-semibold text-green-600">{currentFeesStatus.lastPayment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Debug Information</h3>
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
            >
              {showDebug ? 'Hide' : 'Show'} Debug
            </button>
          </div>
          
          {showDebug && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Student Email:</h4>
                <p className="text-sm text-gray-600 font-mono">{studentEmail || 'Not found'}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Source: localStorage.getItem('authEmail')
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Student Data:</h4>
                <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                  {JSON.stringify(studentData, null, 2)}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Hostel Data:</h4>
                <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                  {JSON.stringify(hostelData, null, 2)}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Loading State:</h4>
                <p className="text-sm text-gray-600">{loading ? 'Loading...' : 'Loaded'}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Error State:</h4>
                <p className="text-sm text-gray-600">{error || 'No errors'}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
