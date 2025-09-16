import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import StaffDashboard from "./Pages/StaffDashboard";

function App() {
  return (
    <Routes>
    
      <Route path="/" element={<Home/>} />

      <Route path="/login" element={<Login />} />

    
      <Route path="/student/*" element={<StudentDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/staff/*" element={<StaffDashboard />} />
    </Routes>
  );
}

export default App;
