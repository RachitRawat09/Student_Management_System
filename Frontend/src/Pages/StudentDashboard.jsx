import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardContent from "../components/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<Navigate to="profile" />} />
            <Route path=":section" element={<DashboardContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
