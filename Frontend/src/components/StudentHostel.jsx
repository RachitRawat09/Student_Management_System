import React from "react";

const StudentHostel = () => {
  // Dummy data for hostel details
  const hostelInfo = {
    roomNumber: "A-205",
    block: "Block A",
    floor: "2nd Floor",
    roomType: "Double Sharing",
    monthlyRent: "₹8,000",
    status: "Active",
    checkInDate: "August 15, 2022",
    expectedCheckOut: "May 30, 2026",
    roommate: "Alex Johnson"
  };

  const amenities = [
    { name: "WiFi", available: true, icon: "📶" },
    { name: "Laundry Service", available: true, icon: "👕" },
    { name: "Common Room", available: true, icon: "🛋️" },
    { name: "Mess Facility", available: true, icon: "🍽️" },
    { name: "Gym", available: true, icon: "💪" },
    { name: "Library Access", available: true, icon: "📚" },
    { name: "Parking", available: true, icon: "🚗" },
    { name: "Security", available: true, icon: "🔒" }
  ];

  const monthlyPayments = [
    { month: "January 2024", amount: "₹8,000", status: "Paid", date: "Jan 1, 2024" },
    { month: "December 2023", amount: "₹8,000", status: "Paid", date: "Dec 1, 2023" },
    { month: "November 2023", amount: "₹8,000", status: "Paid", date: "Nov 1, 2023" },
    { month: "October 2023", amount: "₹8,000", status: "Paid", date: "Oct 1, 2023" },
    { month: "September 2023", amount: "₹8,000", status: "Paid", date: "Sep 1, 2023" }
  ];

  const maintenanceRequests = [
    {
      id: "REQ001",
      issue: "WiFi Connection Problem",
      status: "Resolved",
      date: "Feb 10, 2024",
      priority: "Medium"
    },
    {
      id: "REQ002",
      issue: "Room Cleaning Request",
      status: "In Progress",
      date: "Feb 15, 2024",
      priority: "Low"
    },
    {
      id: "REQ003",
      issue: "AC Repair",
      status: "Resolved",
      date: "Jan 25, 2024",
      priority: "High"
    }
  ];

  const hostelRules = [
    "No smoking or alcohol consumption in hostel premises",
    "Visitors allowed only during visiting hours (4 PM - 8 PM)",
    "Lights out at 11 PM on weekdays and 12 AM on weekends",
    "Keep rooms clean and maintain hygiene standards",
    "Report any maintenance issues immediately",
    "Follow mess timings strictly",
    "No cooking in rooms (use common kitchen if available)",
    "Respect other residents and maintain peace"
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">🏠 Hostel Details</h1>
        <p className="text-green-100">
          Room {hostelInfo.roomNumber} • {hostelInfo.block} • {hostelInfo.floor}
        </p>
      </div>

      {/* Hostel Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <span className="text-2xl">🏠</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Room Details</h3>
              <p className="text-sm text-gray-600">Accommodation Info</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Room Type:</span>
              <span className="font-semibold">{hostelInfo.roomType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Rent:</span>
              <span className="font-semibold">{hostelInfo.monthlyRent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">{hostelInfo.status}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Roommate</h3>
              <p className="text-sm text-gray-600">Sharing Details</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold">{hostelInfo.roommate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Course:</span>
              <span className="font-semibold">CSE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year:</span>
              <span className="font-semibold">3rd Year</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Stay Duration</h3>
              <p className="text-sm text-gray-600">Timeline</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-semibold">{hostelInfo.checkInDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expected Check-out:</span>
              <span className="font-semibold">{hostelInfo.expectedCheckOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold">4 Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🏢 Available Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl mr-3">{amenity.icon}</span>
              <div>
                <p className="font-medium text-gray-900">{amenity.name}</p>
                <p className={`text-xs ${amenity.available ? 'text-green-600' : 'text-red-600'}`}>
                  {amenity.available ? 'Available' : 'Not Available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">💰 Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Month</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {monthlyPayments.map((payment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{payment.month}</td>
                  <td className="py-3 px-4 font-semibold">{payment.amount}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Next Payment Due:</span>
            <span className="text-lg font-bold text-red-600">March 1, 2024</span>
          </div>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">🔧 Maintenance Requests</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            New Request
          </button>
        </div>
        <div className="space-y-3">
          {maintenanceRequests.map((request, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{request.issue}</h3>
                  <p className="text-sm text-gray-600">Request ID: {request.id}</p>
                  <p className="text-sm text-gray-500">Date: {request.date}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Priority: {request.priority}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hostel Rules */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Hostel Rules & Regulations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hostelRules.map((rule, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600 mr-3 mt-1">•</span>
              <p className="text-sm text-gray-700">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHostel;
