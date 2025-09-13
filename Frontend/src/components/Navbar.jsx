import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear auth token/session
    navigate("/login");
  };

  return (
    <div className="w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">College ERP</h1>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
