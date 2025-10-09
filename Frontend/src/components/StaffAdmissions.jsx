import React, { useEffect, useMemo, useState } from "react";
import { admissionAPI } from "../services/api";

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800",
  "Under Review": "bg-blue-100 text-blue-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const frontendToBackendStatus = {
  pending: "Pending",
  screening: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

function generateStudentPassword(fullName) {
  // first name + 2 special characters + 3 numbers
  const base = (fullName || "student").split(" ")[0].replace(/\s+/g, "");
  const specials = "@#";
  const rand = String(Math.floor(100 + Math.random() * 900));
  return `${base}${specials}${rand}`;
}

export default function StaffAdmissions() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [updatingId, setUpdatingId] = useState("");
  const [screeningApplication, setScreeningApplication] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const status = frontendToBackendStatus[statusFilter] || undefined;
        const resp = await admissionAPI.getAllApplications({ status });
        const students = resp?.data?.students || resp?.students || [];
        if (mounted) setApplications(Array.isArray(students) ? students : []);
      } catch (e) {
        if (mounted) setError(e?.response?.data?.message || e.message || "Failed to load applications");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [statusFilter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = Array.isArray(applications) ? applications : [];
    if (!q) return list;
    return list.filter((a) =>
      [a?.firstName, a?.lastName, a?.email, a?.phone, a?._id]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [applications, query]);

  async function setStatus(id, statusKey) {
    try {
      setUpdatingId(id);
      setError("");
      setSuccess("");
      const status = frontendToBackendStatus[statusKey] || statusKey;
      await admissionAPI.updateStatus(id, status);
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, admissionStatus: status } : a)));
      setSuccess(`Status updated to ${status}`);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to update status");
    } finally {
      setUpdatingId("");
    }
  }

  // Handle screening - load full application data
  const handleScreening = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await admissionAPI.getApplicationForScreening(id);
      if (response.success) {
        setScreeningApplication(response.data);
        // Also update status to "Under Review"
        await setStatus(id, "screening");
      } else {
        setError(response.message || "Failed to load application for screening");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load application for screening");
    } finally {
      setLoading(false);
    }
  };

  async function approve(id, fullName, email) {
    if (!window.confirm(`Approve admission for ${fullName || email}?`)) return;
    const password = generateStudentPassword(fullName);
    try {
      setUpdatingId(id);
      setError("");
      setSuccess("");
      // Use dedicated approve endpoint to persist password and send email
      await admissionAPI.approveApplication(id, { password });
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, admissionStatus: "Approved" } : a)));
      setSuccess(`Approved. Credentials emailed to: ${email}`);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to approve application");
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="screening">Screening</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            className="border p-2 rounded w-64"
            placeholder="Search name, email, phone, id"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-600">{filtered.length} application(s)</div>
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
              <th className="py-3 px-4">Applicant</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 px-4 text-center text-gray-500">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="py-6 px-4 text-center text-red-600">{error}</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 px-4 text-center text-gray-500">No applications found</td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-semibold">{a.firstName} {a.lastName}</div>
                    <div className="text-xs text-gray-500 font-mono">{a._id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{a.email}</div>
                    <div className="text-xs text-gray-500">{a.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    {a?.academicInfo?.course || a.course || "-"}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[a.admissionStatus] || "bg-gray-100 text-gray-800"}`}>
                      {String(a.admissionStatus || "Pending")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 justify-end">
                      {a.admissionStatus === 'Approved' ? (
                        <span className="text-sm text-gray-500 italic">Status locked</span>
                      ) : (
                        <>
                          <button
                            disabled={updatingId === a._id}
                            onClick={() => handleScreening(a._id)}
                            className="px-3 py-1 rounded border text-blue-700 border-blue-300 hover:bg-blue-50 disabled:opacity-60"
                          >
                            Screening
                          </button>
                          <button
                            disabled={updatingId === a._id}
                            onClick={() => setStatus(a._id, "pending")}
                            className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100 disabled:opacity-60"
                          >
                            Pending
                          </button>
                          <button
                            disabled={updatingId === a._id}
                            onClick={() => approve(a._id, `${a.firstName} ${a.lastName}`.trim(), a.email)}
                            className="px-3 py-1 rounded border text-green-700 border-green-300 hover:bg-green-50 disabled:opacity-60"
                          >
                            Approve
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Screening Modal */}
      {screeningApplication && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Screening Application - {screeningApplication.firstName} {screeningApplication.lastName}</h3>
              <button
                onClick={() => setScreeningApplication(null)}
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
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-semibold">{screeningApplication.firstName} {screeningApplication.lastName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold">{screeningApplication.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-semibold">{screeningApplication.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Gender</div>
                    <div className="font-semibold">{screeningApplication.gender}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date of Birth</div>
                    <div className="font-semibold">
                      {screeningApplication.dateOfBirth ? new Date(screeningApplication.dateOfBirth).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Nationality</div>
                    <div className="font-semibold">{screeningApplication.nationality}</div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              {screeningApplication.address && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Address Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Street</div>
                      <div className="font-semibold">{screeningApplication.address.street}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">City</div>
                      <div className="font-semibold">{screeningApplication.address.city}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">State</div>
                      <div className="font-semibold">{screeningApplication.address.state}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ZIP Code</div>
                      <div className="font-semibold">{screeningApplication.address.zipCode}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm text-gray-500">Country</div>
                      <div className="font-semibold">{screeningApplication.address.country}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Information */}
              {screeningApplication.academicInfo && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Academic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Course</div>
                      <div className="font-semibold">{screeningApplication.academicInfo.course}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Semester</div>
                      <div className="font-semibold">{screeningApplication.academicInfo.semester}</div>
                    </div>
                    {screeningApplication.academicInfo.previousEducation && (
                      <>
                        <div>
                          <div className="text-sm text-gray-500">Previous Institution</div>
                          <div className="font-semibold">{screeningApplication.academicInfo.previousEducation.institution}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Previous Qualification</div>
                          <div className="font-semibold">{screeningApplication.academicInfo.previousEducation.qualification}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Year of Passing</div>
                          <div className="font-semibold">{screeningApplication.academicInfo.previousEducation.yearOfPassing}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Percentage</div>
                          <div className="font-semibold">{screeningApplication.academicInfo.previousEducation.percentage}%</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {screeningApplication.emergencyContact && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Contact Name</div>
                      <div className="font-semibold">{screeningApplication.emergencyContact.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Relationship</div>
                      <div className="font-semibold">{screeningApplication.emergencyContact.relationship}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-semibold">{screeningApplication.emergencyContact.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-semibold">{screeningApplication.emergencyContact.email || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents */}
              {screeningApplication.documents && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3 text-blue-600">Uploaded Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {screeningApplication.documents.profilePhoto && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Profile Photo</div>
                        <div className="border rounded p-2">
                          <img 
                            src={screeningApplication.documents.profilePhoto} 
                            alt="Profile Photo" 
                            className="w-full h-32 object-cover rounded"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                          <div style={{display: 'none'}} className="text-center text-gray-500 py-8">
                            <a href={screeningApplication.documents.profilePhoto} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              View Profile Photo
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {screeningApplication.documents.idProof && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">ID Proof</div>
                        <div className="border rounded p-2">
                          <a href={screeningApplication.documents.idProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View ID Proof Document
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {screeningApplication.documents.addressProof && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Address Proof</div>
                        <div className="border rounded p-2">
                          <a href={screeningApplication.documents.addressProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View Address Proof Document
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {screeningApplication.documents.academicCertificates && screeningApplication.documents.academicCertificates.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Academic Certificates</div>
                        <div className="border rounded p-2">
                          {screeningApplication.documents.academicCertificates.map((cert, index) => (
                            <div key={index} className="mb-1">
                              <a href={cert} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Certificate {index + 1}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {screeningApplication.documents.otherDocuments && screeningApplication.documents.otherDocuments.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Other Documents</div>
                        <div className="border rounded p-2">
                          {screeningApplication.documents.otherDocuments.map((doc, index) => (
                            <div key={index} className="mb-1">
                              <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Document {index + 1}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Application Status */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3 text-blue-600">Application Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Current Status</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[screeningApplication.admissionStatus] || "bg-gray-100 text-gray-800"}`}>
                      {screeningApplication.admissionStatus}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Submitted At</div>
                    <div className="font-semibold">
                      {screeningApplication.submittedAt ? new Date(screeningApplication.submittedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Reviewed At</div>
                    <div className="font-semibold">
                      {screeningApplication.reviewedAt ? new Date(screeningApplication.reviewedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex items-center justify-end gap-2">
              <button
                onClick={() => setScreeningApplication(null)}
                className="px-4 py-2 rounded border hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setScreeningApplication(null);
                  approve(screeningApplication._id, `${screeningApplication.firstName} ${screeningApplication.lastName}`.trim(), screeningApplication.email);
                }}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Approve Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


