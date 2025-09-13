import { useState } from "react";

export default function FeeForm() {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    course: "",
    feeType: "",
    amount: "",
    paymentMode: "cash",
    transactionId: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fee Data:", formData);
    alert("Fee form submitted (backend connect later)");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">Fee Collection</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input type="text" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="course" placeholder="Course/Department" value={formData.course} onChange={handleChange} className="border p-2 rounded" />
        <select name="feeType" value={formData.feeType} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Fee Type</option>
          <option value="admission">Admission Fee</option>
          <option value="tuition">Tuition Fee</option>
          <option value="hostel">Hostel Fee</option>
          <option value="exam">Exam Fee</option>
        </select>
        <input type="number" name="amount" placeholder="Amount Paid" value={formData.amount} onChange={handleChange} className="border p-2 rounded" required />
        <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="border p-2 rounded">
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
          <option value="netbanking">Net Banking</option>
        </select>
        <input type="text" name="transactionId" placeholder="Transaction/Receipt No." value={formData.transactionId} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit Fee</button>
      </form>
    </div>
  );
}
