import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
   
    navigate("/dashboard/profile");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border mb-3" required />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-3" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="text-center mt-3">
          Don’t have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
