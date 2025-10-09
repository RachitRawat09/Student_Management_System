import React, { useMemo, useState, useEffect } from "react";
import { studentAPI } from "../services/api";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [fullProfile, setFullProfile] = useState(null);
  const [filters, setFilters] = useState({
    course: "",
    semester: "",
    admissionStatus: "Approved"
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalStudents: 0
  });

  // Fetch students from API
  const fetchStudents = async (searchQuery = "", filterParams = {}) => {
    setLoading(true);
    setError("");
    try {
      const params = {
        page: pagination.currentPage,
        limit: 20,
        ...filterParams
      };
      
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const response = await studentAPI.getAll(params);
      if (response.success) {
        setStudents(response.data.students || []);
        setPagination(response.data.pagination || pagination);
      } else {
        setError(response.message || "Failed to fetch students");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch students");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load students on component mount and when filters change
  useEffect(() => {
    fetchStudents(query, filters);
  }, [pagination.currentPage, filters]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pagination.currentPage !== 1) {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
      } else {
        fetchStudents(query, filters);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  // Handle view full profile
  const handleViewProfile = async (studentId) => {
    setLoading(true);
    setError("");
    try {
      const response = await studentAPI.getById(studentId);
      if (response.success) {
        setFullProfile(response.data);
      } else {
        setError(response.message || "Failed to load student profile");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load student profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit student
  const handleEditStudent = async (studentId) => {
    setLoading(true);
    setError("");
    try {
      const response = await studentAPI.getById(studentId);
      if (response.success) {
        setEditingStudent(response.data);
      } else {
        setError(response.message || "Failed to load student data");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load student data");
    } finally {
      setLoading(false);
    }
  };

  // Handle update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await studentAPI.update(editingStudent._id, editingStudent);
      if (response.success) {
        setSuccess("Student updated successfully!");
        setEditingStudent(null);
        loadData(); // Refresh the list
      } else {
        setError(response.message || "Failed to update student");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete student
  const handleDeleteStudent = async (studentId, studentName) => {
    if (!window.confirm(`Are you sure you want to delete ${studentName}? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await studentAPI.delete(studentId);
      if (response.success) {
        setSuccess("Student deleted successfully!");
        loadData(); // Refresh the list
      } else {
        setError(response.message || "Failed to delete student");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to delete student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-bold">👥 Students ({pagination.totalStudents})</h2>
        <div className="flex items-center gap-2">
          <input
            className="border p-2 rounded w-64"
            placeholder="Search by name, id, course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            + Add Student
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Course:</label>
          <select
            className="border p-2 rounded text-sm"
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
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Semester:</label>
          <select
            className="border p-2 rounded text-sm"
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

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select
            className="border p-2 rounded text-sm"
            value={filters.admissionStatus}
            onChange={(e) => handleFilterChange('admissionStatus', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-600">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Sem</th>
              <th className="py-3 px-4">Hostel</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Fees</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="py-8 px-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading students...</span>
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 px-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{s.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold">{s.name || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{s.email} • {s.phone}</div>
                  </td>
                  <td className="py-3 px-4">{s.course}</td>
                  <td className="py-3 px-4">{s.semester}</td>
                  <td className="py-3 px-4">{s.hostel}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      s.admissionStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                      s.admissionStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      s.admissionStatus === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {s.admissionStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {s.feesDue > 0 ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        Due ₹{s.feesDue}
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Clear
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleViewProfile(s._id)}
                        className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditStudent(s._id)}
                        className="px-3 py-1 rounded border text-blue-700 border-blue-300 hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(s._id, s.name)}
                        className="px-3 py-1 rounded border text-red-700 border-red-300 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((pagination.currentPage - 1) * 20) + 1} to {Math.min(pagination.currentPage * 20, pagination.totalStudents)} of {pagination.totalStudents} students
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Full Profile Modal */}
      {fullProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Complete Student Profile</h3>
              <button
                onClick={() => setFullProfile(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Student ID</div>
                    <div className="font-semibold">{fullProfile.studentId || fullProfile._id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-semibold">{fullProfile.firstName} {fullProfile.lastName || ''}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold">{fullProfile.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-semibold">{fullProfile.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Gender</div>
                    <div className="font-semibold">{fullProfile.gender || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date of Birth</div>
                    <div className="font-semibold">
                      {fullProfile.dateOfBirth ? new Date(fullProfile.dateOfBirth).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Nationality</div>
                    <div className="font-semibold">{fullProfile.nationality || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              {fullProfile.address && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Address Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Street</div>
                      <div className="font-semibold">{fullProfile.address.street}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">City</div>
                      <div className="font-semibold">{fullProfile.address.city}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">State</div>
                      <div className="font-semibold">{fullProfile.address.state}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ZIP Code</div>
                      <div className="font-semibold">{fullProfile.address.zipCode}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm text-gray-500">Country</div>
                      <div className="font-semibold">{fullProfile.address.country}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Information */}
              {fullProfile.academicInfo && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Academic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Course</div>
                      <div className="font-semibold">{fullProfile.academicInfo.course}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Semester</div>
                      <div className="font-semibold">{fullProfile.academicInfo.semester}</div>
                    </div>
                    {fullProfile.academicInfo.previousEducation && (
                      <>
                        <div>
                          <div className="text-sm text-gray-500">Previous Institution</div>
                          <div className="font-semibold">{fullProfile.academicInfo.previousEducation.institution}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Previous Qualification</div>
                          <div className="font-semibold">{fullProfile.academicInfo.previousEducation.qualification}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Year of Passing</div>
                          <div className="font-semibold">{fullProfile.academicInfo.previousEducation.yearOfPassing}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Percentage</div>
                          <div className="font-semibold">{fullProfile.academicInfo.previousEducation.percentage}%</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {fullProfile.emergencyContact && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Contact Name</div>
                      <div className="font-semibold">{fullProfile.emergencyContact.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Relationship</div>
                      <div className="font-semibold">{fullProfile.emergencyContact.relationship}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-semibold">{fullProfile.emergencyContact.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-semibold">{fullProfile.emergencyContact.email || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hostel Information */}
              {fullProfile.hostel && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Hostel Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Applied for Hostel</div>
                      <div className="font-semibold">{fullProfile.hostel.applied ? 'Yes' : 'No'}</div>
                    </div>
                    {fullProfile.hostel.allocation && fullProfile.hostel.allocation.roomNumber && (
                      <>
                        <div>
                          <div className="text-sm text-gray-500">Room Number</div>
                          <div className="font-semibold">{fullProfile.hostel.allocation.roomNumber}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Block</div>
                          <div className="font-semibold">{fullProfile.hostel.allocation.block || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Room Type</div>
                          <div className="font-semibold">{fullProfile.hostel.allocation.roomType || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Status</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            fullProfile.hostel.allocation.status === 'Active' ? 'bg-green-100 text-green-700' :
                            fullProfile.hostel.allocation.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {fullProfile.hostel.allocation.status}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Status Information */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Status Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Admission Status</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      fullProfile.admissionStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                      fullProfile.admissionStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      fullProfile.admissionStatus === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {fullProfile.admissionStatus}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Submitted At</div>
                    <div className="font-semibold">
                      {fullProfile.submittedAt ? new Date(fullProfile.submittedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Approved At</div>
                    <div className="font-semibold">
                      {fullProfile.approvedAt ? new Date(fullProfile.approvedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex items-center justify-end gap-2">
              <button
                onClick={() => setFullProfile(null)}
                className="px-4 py-2 rounded border hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setFullProfile(null);
                  handleEditStudent(fullProfile._id);
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Student Profile</h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdateStudent} className="p-6">
              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.firstName || ''}
                      onChange={(e) => setEditingStudent(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={editingStudent.lastName || ''}
                      onChange={(e) => setEditingStudent(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.email || ''}
                      onChange={(e) => setEditingStudent(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.phone || ''}
                      onChange={(e) => setEditingStudent(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                    <select
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.gender || ''}
                      onChange={(e) => setEditingStudent(prev => ({ ...prev, gender: e.target.value }))}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.dateOfBirth ? new Date(editingStudent.dateOfBirth).toISOString().split('T')[0] : ''}
                      onChange={(e) => setEditingStudent(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.nationality || ''}
                      onChange={(e) => setEditingStudent(prev => ({ ...prev, nationality: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Address Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.address?.street || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, street: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.address?.city || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, city: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.address?.state || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, state: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.address?.zipCode || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, zipCode: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.address?.country || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, country: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Academic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                    <select
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.academicInfo?.course || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        academicInfo: { ...prev.academicInfo, course: e.target.value }
                      }))}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                    <select
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.academicInfo?.semester || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        academicInfo: { ...prev.academicInfo, semester: e.target.value }
                      }))}
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
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.emergencyContact?.name || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                    <input
                      type="text"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.emergencyContact?.relationship || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      className="w-full border p-2 rounded"
                      value={editingStudent.emergencyContact?.phone || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full border p-2 rounded"
                      value={editingStudent.emergencyContact?.email || ''}
                      onChange={(e) => setEditingStudent(prev => ({ 
                        ...prev, 
                        emergencyContact: { ...prev.emergencyContact, email: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Admission Status */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Admission Status</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    required
                    className="w-full border p-2 rounded"
                    value={editingStudent.admissionStatus || ''}
                    onChange={(e) => setEditingStudent(prev => ({ ...prev, admissionStatus: e.target.value }))}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




