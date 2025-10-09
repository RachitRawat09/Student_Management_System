import React, { useState, useEffect } from "react";
import { feeAPI } from "../services/api";

export default function StaffFeeManagement() {
  const [activeTab, setActiveTab] = useState("create");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Fee creation form
  const [feeForm, setFeeForm] = useState({
    title: "",
    description: "",
    academicYear: new Date().getFullYear().toString(),
    semester: "",
    course: "",
    amount: "",
    dueDate: "",
    feeType: "Tuition",
    category: "Regular"
  });

  // Fee list and statistics
  const [fees, setFees] = useState([]);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    semester: "",
    course: "",
    status: "Active"
  });

  // Load fees and statistics
  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [feesResponse, statsResponse] = await Promise.all([
        feeAPI.getAllFeeNotices(filters),
        feeAPI.getFeeStatistics(filters)
      ]);

      if (feesResponse.success) {
        setFees(feesResponse.data.fees || []);
      }
      if (statsResponse.success) {
        setStats(statsResponse.data || {});
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  // Handle fee creation
  const handleCreateFee = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await feeAPI.createFeeNotice({
        ...feeForm,
        amount: parseFloat(feeForm.amount),
        createdBy: "Staff" // TODO: Get from auth context
      });

      if (response.success) {
        setSuccess("Fee notice created successfully!");
        setFeeForm({
          title: "",
          description: "",
          academicYear: new Date().getFullYear().toString(),
          semester: "",
          course: "",
          amount: "",
          dueDate: "",
          feeType: "Tuition",
          category: "Regular"
        });
        loadData(); // Refresh the list
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to create fee notice");
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (feeId, newStatus) => {
    try {
      const response = await feeAPI.updateFeeStatus(feeId, newStatus);
      if (response.success) {
        setSuccess(`Fee status updated to ${newStatus}`);
        loadData();
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to update status");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">💰 Fee Management</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded ${
              activeTab === "create" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Create Fee Notice
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-4 py-2 rounded ${
              activeTab === "manage" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Manage Fees
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {activeTab === "manage" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-500">Total Fee Notices</div>
            <div className="text-2xl font-bold">{stats.totalFees || 0}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-500">Total Amount</div>
            <div className="text-2xl font-bold text-green-600">₹{stats.totalAmount || 0}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-500">Collection Rate</div>
            <div className="text-2xl font-bold text-blue-600">{stats.collectionRate || 0}%</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-500">Pending Payments</div>
            <div className="text-2xl font-bold text-orange-600">{stats.totalPending || 0}</div>
          </div>
        </div>
      )}

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

      {/* Create Fee Notice Form */}
      {activeTab === "create" && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Create New Fee Notice</h3>
          <form onSubmit={handleCreateFee} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fee Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border p-2 rounded"
                  placeholder="e.g., Semester 1 Tuition Fee"
                  value={feeForm.title}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border p-2 rounded"
                  placeholder="2024"
                  value={feeForm.academicYear}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, academicYear: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full border p-2 rounded"
                rows="3"
                placeholder="Additional details about the fee..."
                value={feeForm.description}
                onChange={(e) => setFeeForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semester *
                </label>
                <select
                  required
                  className="w-full border p-2 rounded"
                  value={feeForm.semester}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, semester: e.target.value }))}
                >
                  <option value="">Select Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course *
                </label>
                <select
                  required
                  className="w-full border p-2 rounded"
                  value={feeForm.course}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, course: e.target.value }))}
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech CSE">B.Tech CSE</option>
                  <option value="B.Tech ECE">B.Tech ECE</option>
                  <option value="B.Tech ME">B.Tech ME</option>
                  <option value="B.Sc Physics">B.Sc Physics</option>
                  <option value="B.Sc Chemistry">B.Sc Chemistry</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full border p-2 rounded"
                  placeholder="50000"
                  value={feeForm.amount}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full border p-2 rounded"
                  value={feeForm.dueDate}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fee Type
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={feeForm.feeType}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, feeType: e.target.value }))}
                >
                  <option value="Tuition">Tuition</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Library">Library</option>
                  <option value="Lab">Lab</option>
                  <option value="Exam">Exam</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={feeForm.category}
                  onChange={(e) => setFeeForm(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="Regular">Regular</option>
                  <option value="Late">Late</option>
                  <option value="Fine">Fine</option>
                  <option value="Additional">Additional</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Fee Notice"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Manage Fees */}
      {activeTab === "manage" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                <select
                  className="border p-2 rounded"
                  value={filters.semester}
                  onChange={(e) => handleFilterChange('semester', e.target.value)}
                >
                  <option value="">All Semesters</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                  <option value="5">5th</option>
                  <option value="6">6th</option>
                  <option value="7">7th</option>
                  <option value="8">8th</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  className="border p-2 rounded"
                  value={filters.course}
                  onChange={(e) => handleFilterChange('course', e.target.value)}
                >
                  <option value="">All Courses</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="border p-2 rounded"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fees List */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Course/Sem</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Students</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : fees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 px-4 text-center text-gray-500">
                      No fee notices found
                    </td>
                  </tr>
                ) : (
                  fees.map((fee) => (
                    <tr key={fee._id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-semibold">{fee.title}</div>
                        <div className="text-xs text-gray-500">{fee.feeType} • {fee.category}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>{fee.course}</div>
                        <div className="text-xs text-gray-500">Sem {fee.semester}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold">₹{fee.amount}</td>
                      <td className="py-3 px-4">
                        {new Date(fee.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>Total: {fee.totalStudents}</div>
                          <div className="text-green-600">Paid: {fee.paidStudents}</div>
                          <div className="text-orange-600">Pending: {fee.pendingStudents}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          fee.status === 'Active' ? 'bg-green-100 text-green-700' :
                          fee.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {fee.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <select
                            className="text-xs border rounded px-2 py-1"
                            value={fee.status}
                            onChange={(e) => handleStatusUpdate(fee._id, e.target.value)}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
