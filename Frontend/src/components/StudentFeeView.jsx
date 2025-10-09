import React, { useState, useEffect } from "react";
import { feeAPI } from "../services/api";

export default function StudentFeeView() {
  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    paymentMethod: "Online",
    transactionId: "",
    notes: ""
  });

  // Get student email from localStorage (from login)
  const studentEmail = localStorage.getItem('authEmail') || '';

  // Load student fees
  const loadStudentFees = async () => {
    if (!studentEmail) {
      setError("Student email not found. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await feeAPI.getStudentFees(studentEmail);
      if (response.success) {
        setStudent(response.data.student);
        setFees(response.data.fees || []);
      } else {
        setError(response.message || "Failed to load fees");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load fees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentFees();
  }, []);

  // Handle payment
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!selectedFee) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await feeAPI.recordPayment({
        feeId: selectedFee._id,
        studentEmail,
        amount: parseFloat(paymentForm.amount),
        paymentMethod: paymentForm.paymentMethod,
        transactionId: paymentForm.transactionId,
        notes: paymentForm.notes
      });

      if (response.success) {
        setSuccess("Payment recorded successfully!");
        setSelectedFee(null);
        setPaymentForm({
          amount: "",
          paymentMethod: "Online",
          transactionId: "",
          notes: ""
        });
        loadStudentFees(); // Refresh the list
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to record payment");
    } finally {
      setLoading(false);
    }
  };

  // Open payment modal
  const openPaymentModal = (fee) => {
    setSelectedFee(fee);
    setPaymentForm(prev => ({
      ...prev,
      amount: fee.amount.toString()
    }));
  };

  // Calculate totals
  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = fees
    .filter(fee => fee.paymentStatus === 'Completed')
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">💰 Fee Management</h2>
        <div className="text-sm text-gray-600">
          Welcome, {student?.name || 'Student'}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500">Total Fees</div>
          <div className="text-2xl font-bold">₹{totalAmount}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500">Paid Amount</div>
          <div className="text-2xl font-bold text-green-600">₹{paidAmount}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-sm text-gray-500">Pending Amount</div>
          <div className="text-2xl font-bold text-orange-600">₹{pendingAmount}</div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Fees List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Fee Notices</h3>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading fees...</span>
            </div>
          </div>
        ) : fees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No fee notices found for your semester and course.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                  <th className="py-3 px-4">Fee Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-semibold">{fee.title}</div>
                      {fee.description && (
                        <div className="text-xs text-gray-500 mt-1">{fee.description}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {fee.feeType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">₹{fee.amount}</td>
                    <td className="py-3 px-4">
                      <div>{new Date(fee.dueDate).toLocaleDateString()}</div>
                      {new Date(fee.dueDate) < new Date() && fee.paymentStatus !== 'Completed' && (
                        <div className="text-xs text-red-600">Overdue</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        fee.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700' :
                        fee.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {fee.paymentStatus}
                      </span>
                      {fee.paymentDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Paid: {new Date(fee.paymentDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {fee.paymentStatus === 'Completed' ? (
                        <div className="text-sm">
                          <div className="text-green-600 font-semibold">✓ Paid</div>
                          {fee.receiptNumber && (
                            <div className="text-xs text-gray-500">
                              Receipt: {fee.receiptNumber}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => openPaymentModal(fee)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedFee && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Make Payment</h3>
              <button
                onClick={() => setSelectedFee(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <div className="font-semibold">{selectedFee.title}</div>
                <div className="text-sm text-gray-600">
                  {selectedFee.course} • Semester {selectedFee.semester}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  Amount: ₹{selectedFee.amount}
                </div>
                <div className="text-sm text-gray-500">
                  Due: {new Date(selectedFee.dueDate).toLocaleDateString()}
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    className="w-full border p-2 rounded"
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  >
                    <option value="Online">Online Payment</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full border p-2 rounded"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction ID / Reference
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Enter transaction ID or reference number"
                    value={paymentForm.transactionId}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, transactionId: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    className="w-full border p-2 rounded"
                    rows="2"
                    placeholder="Any additional notes..."
                    value={paymentForm.notes}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedFee(null)}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Record Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
