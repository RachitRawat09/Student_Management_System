import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Student</h2>
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          <li><Link to="/dashboard/profile" className="hover:text-blue-400">👤 Profile</Link></li>
          <li><Link to="/dashboard/admission" className="hover:text-blue-400">🎓 Admission</Link></li>
          <li><Link to="/dashboard/fee" className="hover:text-blue-400"> Fee</Link></li>
          <li><Link to="/dashboard/hostel" className="hover:text-blue-400"> Hostel</Link></li>
          <li><Link to="/dashboard/exams" className="hover:text-blue-400"> Exams</Link></li>
          <li><Link to="/dashboard/notifications" className="hover:text-blue-400"> Notifications</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
