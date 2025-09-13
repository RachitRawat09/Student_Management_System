import React, { useState } from "react";

const ExamForm = ({ onAddExam }) => {
  const [formData, setFormData] = useState({
    rollNo: "",
    subject: "",
    examDate: "",
    marksObtained: "",
    totalMarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExam(formData);
    setFormData({
      rollNo: "",
      subject: "",
      examDate: "",
      marksObtained: "",
      totalMarks: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-lg mb-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center"> Add Exam Record</h2>

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
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="date"
        name="examDate"
        value={formData.examDate}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="number"
        name="marksObtained"
        placeholder="Marks Obtained"
        value={formData.marksObtained}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <input
        type="number"
        name="totalMarks"
        placeholder="Total Marks"
        value={formData.totalMarks}
        onChange={handleChange}
        className="w-full p-2 border mb-3 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add Exam Record
      </button>
    </form>
  );
};

export default ExamForm;
