import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

    
      <Route path="/dashboard/*" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
