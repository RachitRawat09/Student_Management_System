import React, { useState } from "react";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    course: "",
    branch: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admission Form Submitted:", formData);
    alert("Admission form submitted successfully!");
    // TODO: Backend ko bhejna hai (API call)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        🎓 Admission Form
      </h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="text"
        name="rollNo"
        placeholder="Roll Number"
        value={formData.rollNo}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="text"
        name="course"
        placeholder="Course (e.g. B.Tech, B.Sc)"
        value={formData.course}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="text"
        name="branch"
        placeholder="Branch (e.g. CSE, ECE)"
        value={formData.branch}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year of Study"
        value={formData.year}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Admission Form
      </button>
    </form>
  );
};

export default AdmissionForm;
