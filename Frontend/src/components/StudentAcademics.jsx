import React from "react";

const StudentAcademics = () => {
  // Dummy data for academic details
  const academicData = {
    studentId: "STU2024001",
    name: "John Doe",
    course: "Computer Science Engineering",
    specialization: "Software Engineering",
    currentSemester: "3rd Semester",
    batch: "2022-2026",
    cgpa: "8.5",
    totalCredits: "120",
    completedCredits: "90"
  };

  const semesterResults = [
    {
      semester: "1st Semester",
      subjects: [
        { name: "Mathematics I", credits: 4, grade: "A", points: 8.5 },
        { name: "Physics", credits: 4, grade: "A-", points: 8.0 },
        { name: "Chemistry", credits: 3, grade: "B+", points: 7.5 },
        { name: "Programming Fundamentals", credits: 4, grade: "A", points: 8.5 },
        { name: "English Communication", credits: 2, grade: "A-", points: 8.0 }
      ],
      sgpa: "8.1",
      credits: 17
    },
    {
      semester: "2nd Semester",
      subjects: [
        { name: "Mathematics II", credits: 4, grade: "A", points: 8.5 },
        { name: "Data Structures", credits: 4, grade: "A+", points: 9.0 },
        { name: "Digital Electronics", credits: 3, grade: "B+", points: 7.5 },
        { name: "Engineering Graphics", credits: 2, grade: "A-", points: 8.0 },
        { name: "Environmental Studies", credits: 2, grade: "A", points: 8.5 }
      ],
      sgpa: "8.3",
      credits: 15
    },
    {
      semester: "3rd Semester",
      subjects: [
        { name: "Algorithms", credits: 4, grade: "A", points: 8.5 },
        { name: "Database Management", credits: 4, grade: "A-", points: 8.0 },
        { name: "Computer Networks", credits: 3, grade: "B+", points: 7.5 },
        { name: "Operating Systems", credits: 4, grade: "A", points: 8.5 },
        { name: "Software Engineering", credits: 3, grade: "A-", points: 8.0 }
      ],
      sgpa: "8.2",
      credits: 18
    }
  ];

  const upcomingExams = [
    {
      subject: "Algorithms",
      examType: "Mid-Term",
      date: "March 15, 2024",
      time: "10:00 AM - 12:00 PM",
      venue: "Hall A-101"
    },
    {
      subject: "Database Management",
      examType: "Mid-Term",
      date: "March 18, 2024",
      time: "10:00 AM - 12:00 PM",
      venue: "Hall A-102"
    },
    {
      subject: "Computer Networks",
      examType: "Mid-Term",
      date: "March 20, 2024",
      time: "10:00 AM - 12:00 PM",
      venue: "Hall A-103"
    }
  ];

  const attendance = {
    overall: "92%",
    subjects: [
      { name: "Algorithms", attended: 23, total: 25, percentage: "92%" },
      { name: "Database Management", attended: 22, total: 24, percentage: "92%" },
      { name: "Computer Networks", attended: 21, total: 23, percentage: "91%" },
      { name: "Operating Systems", attended: 24, total: 26, percentage: "92%" },
      { name: "Software Engineering", attended: 22, total: 24, percentage: "92%" }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">📚 Academic Details</h1>
        <p className="text-blue-100">
          {academicData.course} • {academicData.currentSemester} • {academicData.batch}
        </p>
      </div>

      {/* Academic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{academicData.cgpa}</div>
          <div className="text-sm text-gray-600">Current CGPA</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{academicData.completedCredits}</div>
          <div className="text-sm text-gray-600">Completed Credits</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{academicData.totalCredits}</div>
          <div className="text-sm text-gray-600">Total Credits</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{attendance.overall}</div>
          <div className="text-sm text-gray-600">Overall Attendance</div>
        </div>
      </div>

      {/* Current Semester Results */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Semester Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Credits</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Points</th>
              </tr>
            </thead>
            <tbody>
              {semesterResults[2].subjects.map((subject, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{subject.name}</td>
                  <td className="py-3 px-4 text-center">{subject.credits}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      subject.grade === 'A+' ? 'bg-green-100 text-green-800' :
                      subject.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                      subject.grade === 'A-' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {subject.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-semibold">{subject.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="font-semibold text-gray-700">Semester GPA (SGPA):</span>
          <span className="text-xl font-bold text-blue-600">{semesterResults[2].sgpa}</span>
        </div>
      </div>

      {/* Academic History */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Academic History</h2>
        <div className="space-y-4">
          {semesterResults.map((semester, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">{semester.semester}</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-600">SGPA: <span className="font-semibold text-blue-600">{semester.sgpa}</span></div>
                  <div className="text-sm text-gray-600">Credits: <span className="font-semibold">{semester.credits}</span></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {semester.subjects.map((subject, subIndex) => (
                  <div key={subIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{subject.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      subject.grade === 'A+' ? 'bg-green-100 text-green-800' :
                      subject.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                      subject.grade === 'A-' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {subject.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Upcoming Exams</h2>
        <div className="space-y-3">
          {upcomingExams.map((exam, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exam.subject}</h3>
                  <p className="text-sm text-gray-600">{exam.examType}</p>
                  <p className="text-sm text-gray-500">Venue: {exam.venue}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">{exam.date}</p>
                  <p className="text-sm text-gray-600">{exam.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Details */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Attendance Details</h2>
        <div className="space-y-3">
          {attendance.subjects.map((subject, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900">{subject.name}</span>
                <p className="text-sm text-gray-600">{subject.attended}/{subject.total} classes</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  parseInt(subject.percentage) >= 90 ? 'bg-green-100 text-green-800' :
                  parseInt(subject.percentage) >= 75 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {subject.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAcademics;
