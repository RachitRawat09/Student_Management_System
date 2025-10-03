import React, { useEffect, useMemo, useState } from "react";
import { studentAPI } from "../services/api";

const StudentHostel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hostel, setHostel] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [preferences, setPreferences] = useState({ roomType: 'Double', blockPreference: '' });

  const authEmail = useMemo(() => {
    try { return localStorage.getItem('authEmail') || ''; } catch { return ''; }
  }, []);

  const loadHostel = async () => {
    setLoading(true);
    setError("");
    try {
      if (!authEmail) throw new Error('Not logged in');
      const res = await studentAPI.getHostel(authEmail);
      setHostel(res.data || {});
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to load hostel details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHostel();
  }, [authEmail]);

  const onApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await studentAPI.applyHostel({ email: authEmail, preferences });
      await loadHostel();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to apply');
    } finally {
      setSubmitting(false);
    }
  };

  const hostelInfo = useMemo(() => {
    const alloc = hostel?.allocation || {};
    return {
      roomNumber: alloc.roomNumber || '—',
      block: alloc.block || '—',
      floor: alloc.floor || '—',
      roomType: alloc.roomType || '—',
      monthlyRent: alloc.monthlyRent || '—',
      status: alloc.status || (hostel?.applied ? 'Pending' : 'Not Applied'),
      checkInDate: alloc.checkInDate ? new Date(alloc.checkInDate).toDateString() : '—',
      expectedCheckOut: alloc.expectedCheckOut ? new Date(alloc.expectedCheckOut).toDateString() : '—',
      roommates: hostel?.roommates || []
    };
  }, [hostel]);

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

  const monthlyPayments = useMemo(() => {
    return hostel?.payments && hostel.payments.length ? hostel.payments : [];
  }, [hostel]);

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

  if (loading) {
    return <div className="p-6">Loading hostel details...</div>;
  }
  return (
    <div className="p-6 space-y-6">
      {error ? <div className="text-red-600">{error}</div> : null}
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">🏠 Hostel Details</h1>
        <p className="text-green-100">
          Room {hostelInfo.roomNumber} • {hostelInfo.block} • {hostelInfo.floor}
        </p>
      </div>

      {/* Apply for Hostel (if not applied) */}
      {!hostel?.applied && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Apply for Hostel</h2>
          <form onSubmit={onApply} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Room Type</label>
              <select value={preferences.roomType} onChange={(e)=>setPreferences(p=>({...p, roomType: e.target.value}))} className="w-full p-2 border rounded">
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Block Preference (optional)</label>
              <input value={preferences.blockPreference} onChange={(e)=>setPreferences(p=>({...p, blockPreference: e.target.value}))} className="w-full p-2 border rounded" placeholder="e.g., Block A" />
            </div>
            <div className="md:col-span-3">
              <button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium">
                {submitting ? 'Submitting...' : 'Apply for Hostel'}
              </button>
            </div>
          </form>
        </div>
      )}

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
              <h3 className="font-semibold text-gray-900">Roommates</h3>
              <p className="text-sm text-gray-600">
                {hostelInfo.roommates && hostelInfo.roommates.length > 0 
                  ? `${hostelInfo.roommates.length} roommate(s) in your room` 
                  : 'Sharing Details'
                }
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {hostelInfo.roommates && hostelInfo.roommates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hostelInfo.roommates.map((roommate, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {roommate.firstName?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg">{roommate.firstName || 'Unknown'}</h4>
                        <p className="text-sm text-gray-600 mb-2">{roommate.academicInfo?.course || 'Course not specified'}</p>
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-2">📧</span>
                            <span className="truncate">{roommate.email}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-2">🏠</span>
                            <span>Room {hostelInfo.roomNumber}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors">
                            Message
                          </button>
                          <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors">
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🏠</div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  {hostelInfo.roomType === 'Single' ? 'Single Room' : 'No Roommates Yet'}
                </h4>
                <p className="text-gray-600">
                  {hostelInfo.roomType === 'Single' 
                    ? 'You have a single room - no roommates to share with.' 
                    : 'No roommates have been assigned to your room yet.'
                  }
                </p>
              </div>
            )}
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
            {/* <div className="flex justify-between">
              <span className="text-gray-600">Expected Check-out:</span>
              <span className="font-semibold">{hostelInfo.expectedCheckOut}</span>
            </div> */}
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold">4 Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roommates Section - More Prominent Display */}
      {hostelInfo.roommates && hostelInfo.roommates.length > 0 && (
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">👥 Your Roommates</h2>
              <p className="text-green-100">Meet the students sharing your room</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-sm text-green-100">Room Capacity</p>
                <p className="text-xl font-bold">
                  {hostelInfo.roommates.length + 1} / {hostelInfo.roomType === 'Single' ? '1' : hostelInfo.roomType === 'Double' ? '2' : '3'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hostelInfo.roommates.map((roommate, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {roommate.firstName?.charAt(0) || '?'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">{roommate.firstName || 'Unknown'}</h4>
                    <p className="text-green-100 text-sm">{roommate.academicInfo?.course || 'Course not specified'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-100">
                    <span className="mr-2">📧</span>
                    <span className="truncate">{roommate.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-100">
                    <span className="mr-2">🏠</span>
                    <span>Room {hostelInfo.roomNumber}</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                    💬 Message
                  </button>
                  <button className="flex-1 bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                    📞 Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              {monthlyPayments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">No payments yet</td>
                </tr>
              ) : monthlyPayments.map((payment, index) => (
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
            <span className="text-lg font-bold text-red-600">—</span>
          </div>
        </div>
      </div>

      {/* Maintenance Requests */}
      {/* <div className="bg-white rounded-xl p-6 shadow-lg">
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
      </div> */}

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
