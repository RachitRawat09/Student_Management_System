import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userId: "", password: "", role: "student" });

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder auth; replace with API call. Route by role.
    if (credentials.role === "admin") {
      navigate("/admin");
    } else if (credentials.role === "staff") {
      navigate("/staff");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input value={credentials.userId} onChange={(e)=>setCredentials({...credentials, userId: e.target.value})} type="text" placeholder="User ID / Email" className="w-full p-2 border mb-3" required />
        <input value={credentials.password} onChange={(e)=>setCredentials({...credentials, password: e.target.value})} type="password" placeholder="Password" className="w-full p-2 border mb-3" required />
        <select value={credentials.role} onChange={(e)=>setCredentials({...credentials, role: e.target.value})} className="w-full p-2 border mb-4">
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        
      </form>
    </div>
  );
};

export default Login;
