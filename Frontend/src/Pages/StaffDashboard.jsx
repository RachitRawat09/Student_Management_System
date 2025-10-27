import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StudentTable from "../components/StudentTable";
import AdmissionForm from "../components/AdmissionForm";
import StaffHostel from "../components/StaffHostel";
import StaffFeeManagement from "../components/StaffFeeManagement";
import StudentAcademics from "../components/StudentAcademics";
import Notifications from "../components/Notifications";
import StaffSidebar from "../components/StaffSidebar";
import StaffAdmissions from "../components/StaffAdmissions";
import { dashboardAPI } from "../services/api";

const TABS = [
  { key: "students", label: "Students" },
  { key: "admission", label: "Admission" },
  { key: "hostel", label: "Hostel" },
  { key: "fees", label: "Fees" },
  { key: "academics", label: "Academics" },
  { key: "notifications", label: "Notifications" },
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
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        
        <StaffSidebar activeKey={activeTab} onSelect={setActiveTab} />
        <div className="flex-1 overflow-y-auto bg-gray-100 pt-20 md:pl-64">
          <div className="px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-xs text-gray-500">Total Students</div>
                {loading ? (
                  <div className="text-2xl font-bold text-gray-400">Loading...</div>
                ) : error ? (
                  <div className="text-2xl font-bold text-red-500">Error</div>
                ) : (
                  <div className="text-2xl font-bold">{dashboardStats.totalStudents.toLocaleString()}</div>
                )}
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-xs text-gray-500">Pending Admissions</div>
                {loading ? (
                  <div className="text-2xl font-bold text-gray-400">Loading...</div>
                ) : error ? (
                  <div className="text-2xl font-bold text-red-500">Error</div>
                ) : (
                  <div className="text-2xl font-bold text-orange-600">{dashboardStats.pendingAdmissions}</div>
                )}
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-xs text-gray-500">Hostel Occupancy</div>
                {loading ? (
                  <div className="text-2xl font-bold text-gray-400">Loading...</div>
                ) : error ? (
                  <div className="text-2xl font-bold text-red-500">Error</div>
                ) : (
                  <div className="text-2xl font-bold">{dashboardStats.hostelOccupancy}</div>
                )}
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-xs text-gray-500">Fees Collected (MoM)</div>
                {loading ? (
                  <div className="text-2xl font-bold text-gray-400">Loading...</div>
                ) : error ? (
                  <div className="text-2xl font-bold text-red-500">Error</div>
                ) : (
                  <div className="text-2xl font-bold text-green-600">{dashboardStats.feesCollected}</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 flex flex-wrap gap-2">
                <button onClick={() => setActiveTab("admission")} className="px-3 py-2 rounded border hover:bg-gray-50">New Admission</button>
                <button onClick={() => setActiveTab("fees")} className="px-3 py-2 rounded border hover:bg-gray-50">Collect Fees</button>
                <button onClick={() => setActiveTab("hostel")} className="px-3 py-2 rounded border hover:bg-gray-50">Allocate Hostel</button>
                <button onClick={() => setActiveTab("students")} className="px-3 py-2 rounded border hover:bg-gray-50">View Students</button>
                <button onClick={() => setActiveTab("notifications")} className="px-3 py-2 rounded border hover:bg-gray-50">Notifications</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="border-b px-4">
                <div className="flex flex-wrap gap-2">
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                        activeTab === t.key
                          ? "border-blue-600 text-blue-700"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
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

