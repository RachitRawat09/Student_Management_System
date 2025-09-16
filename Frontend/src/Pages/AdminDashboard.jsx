import React from "react";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          <p>Welcome, Admin. Manage users, approvals, and system settings here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

