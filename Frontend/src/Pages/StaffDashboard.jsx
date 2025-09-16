import React from "react";
import Navbar from "../components/Navbar";

const StaffDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4">Staff Dashboard</h2>
          <p>Welcome, Staff. Manage student records, exams, and notifications here.</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

