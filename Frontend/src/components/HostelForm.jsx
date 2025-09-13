import { useState } from "react";

export default function HostelForm() {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    course: "",
    gender: "male",
    block: "",
    roomType: "",
    roomNumber: "",
    allotmentDate: "",
    status: "allocated",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hostel Data:", formData);
    alert("Hostel form submitted (backend connect later)");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Hostel Allocation</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input type="text" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="course" placeholder="Course/Department" value={formData.course} onChange={handleChange} className="border p-2 rounded" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select name="block" value={formData.block} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Hostel Block</option>
          <option value="A">Block A</option>
          <option value="B">Block B</option>
          <option value="C">Block C</option>
        </select>
        <select name="roomType" value={formData.roomType} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Room Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
        </select>
        <input type="text" name="roomNumber" placeholder="Room Number" value={formData.roomNumber} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="allotmentDate" value={formData.allotmentDate} onChange={handleChange} className="border p-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
          <option value="allocated">Allocated</option>
          <option value="waiting">Waiting List</option>
        </select>
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Allocate Hostel</button>
      </form>
    </div>
  );
}
