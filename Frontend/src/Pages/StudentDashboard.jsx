import React from "react";
import StudentNavbar from "../components/StudentNavbar";
import DashboardContent from "../components/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />
      
      {/* Page Content */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path=":section" element={<DashboardContent />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
