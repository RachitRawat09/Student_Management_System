import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
   
    navigate("/login"); 
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input type="text" placeholder="Full Name" className="w-full p-2 border mb-3" required />
        <input type="email" placeholder="Email" className="w-full p-2 border mb-3" required />
        <input type="text" placeholder="Roll No" className="w-full p-2 border mb-3" required />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-3" required />
        <button type="submit" className="w-full  bg-blue-600 text-white py-2 rounded">Signup</button>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
