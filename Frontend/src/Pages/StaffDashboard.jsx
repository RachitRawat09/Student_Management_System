import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StudentTable from "../components/StudentTable";
import AdmissionForm from "../components/AdmissionForm";
import StaffHostel from "../components/StaffHostel";
import StaffFeeManagement from "../components/StaffFeeManagement";
import StudentAcademics from "../components/StudentAcademics";
import StaffSidebar from "../components/StaffSidebar";
import StaffAdmissions from "../components/StaffAdmissions";
import { dashboardAPI } from "../services/api";

const TABS = [
<<<<<<< HEAD
  { key: "students", label: "Students" },
  { key: "admission", label: "Admission" },
  { key: "hostel", label: "Hostel" },
  { key: "fees", label: "Fees" },
  { key: "academics", label: "Academics" }
=======
  { key: "students", label: "Students", icon: "👥" },
  { key: "admission", label: "Admission", icon: "📝" },
  { key: "hostel", label: "Hostel", icon: "🏠" },
  { key: "fees", label: "Fees", icon: "💰" },
  { key: "academics", label: "Academics", icon: "📚" },
>>>>>>> c0ffcbf412160658007dd742d36ae281445bac5d
];

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 0,
    pendingAdmissions: 0,
    hostelOccupancy: "0%",
    feesCollected: "₹0L"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await dashboardAPI.getStats();
        if (response.success) {
          setDashboardStats(response.data);
        } else {
          setError('Failed to fetch dashboard statistics');
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="flex-1 flex flex-col">
        <StaffSidebar activeKey={activeTab} onSelect={setActiveTab} />
        <div className="flex-1 overflow-y-auto pt-20 md:pl-64">
          <div className="px-4 py-8 max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-700 mb-2">Staff Dashboard</h1>
              <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Students Card */}
              <div className="group relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="text-blue-700 text-sm font-medium">Total Students</div>
                  </div>
                  {loading ? (
                    <div className="text-3xl font-bold text-blue-600 animate-pulse">---</div>
                  ) : error ? (
                    <div className="text-3xl font-bold text-red-500">Error</div>
                  ) : (
                    <div className="text-3xl font-bold text-blue-700">{dashboardStats.totalStudents.toLocaleString()}</div>
                  )}
                  <div className="mt-2 text-blue-600 text-sm">Active students</div>
                </div>
              </div>

              {/* Pending Admissions Card */}
              <div className="group relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-orange-200">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-500/10 rounded-xl">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <div className="text-orange-700 text-sm font-medium">Pending</div>
                  </div>
                  {loading ? (
                    <div className="text-3xl font-bold text-orange-600 animate-pulse">---</div>
                  ) : error ? (
                    <div className="text-3xl font-bold text-red-500">Error</div>
                  ) : (
                    <div className="text-3xl font-bold text-orange-700">{dashboardStats.pendingAdmissions}</div>
                  )}
                  <div className="mt-2 text-orange-600 text-sm">Awaiting review</div>
                </div>
              </div>

              {/* Hostel Occupancy Card */}
              <div className="group relative bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <div className="text-green-700 text-sm font-medium">Hostel</div>
                  </div>
                  {loading ? (
                    <div className="text-3xl font-bold text-green-600 animate-pulse">---</div>
                  ) : error ? (
                    <div className="text-3xl font-bold text-red-500">Error</div>
                  ) : (
                    <div className="text-3xl font-bold text-green-700">{dashboardStats.hostelOccupancy}</div>
                  )}
                  <div className="mt-2 text-green-600 text-sm">Occupancy rate</div>
                </div>
              </div>

              {/* Fees Collected Card */}
              <div className="group relative bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="text-purple-700 text-sm font-medium">Fees</div>
                  </div>
                  {loading ? (
                    <div className="text-3xl font-bold text-purple-600 animate-pulse">---</div>
                  ) : error ? (
                    <div className="text-3xl font-bold text-red-500">Error</div>
                  ) : (
                    <div className="text-3xl font-bold text-purple-700">{dashboardStats.feesCollected}</div>
                  )}
                  <div className="mt-2 text-purple-600 text-sm">This month</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700">Quick Actions</h3>
                <p className="text-gray-500 text-sm">Access frequently used features</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <button 
                    onClick={() => setActiveTab("admission")} 
                    className="group flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 border border-blue-200"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📝</div>
                    <span className="text-sm font-medium text-blue-700">New Admission</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("fees")} 
                    className="group flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105 border border-green-200"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💰</div>
                    <span className="text-sm font-medium text-green-700">Collect Fees</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("hostel")} 
                    className="group flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 transform hover:scale-105 border border-orange-200"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🏠</div>
                    <span className="text-sm font-medium text-orange-700">Allocate Hostel</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("students")} 
                    className="group flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 border border-purple-200"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">👥</div>
                    <span className="text-sm font-medium text-purple-700">View Students</span>
                  </button>
                  
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="px-6 py-2">
                  <div className="flex flex-wrap gap-1">
                    {TABS.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`group flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                          activeTab === t.key
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-105"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-lg">{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "students" && <StudentTable />}
                {activeTab === "admission" && <StaffAdmissions />}
                {activeTab === "hostel" && <StaffHostel />}
                {activeTab === "fees" && <StaffFeeManagement />}
                {activeTab === "academics" && <StudentAcademics />}
                {activeTab === "notifications" && <Notifications />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

