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
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [updatingId, setUpdatingId] = useState("");

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
      const status = frontendToBackendStatus[statusKey] || statusKey;
      await admissionAPI.updateStatus(id, status);
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, admissionStatus: status } : a)));
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Failed to update status");
    } finally {
      setUpdatingId("");
    }
  }

  async function approve(id, fullName, email) {
    if (!window.confirm(`Approve admission for ${fullName || email}?`)) return;
    const password = generateStudentPassword(fullName);
    try {
      setUpdatingId(id);
      // Use dedicated approve endpoint to persist password and send email
      await admissionAPI.approveApplication(id, { password });
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, admissionStatus: "Approved" } : a)));
      alert(`Approved. Credentials emailed to: ${email}`);
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "Failed to approve application");
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
                      <button
                        disabled={updatingId === a._id}
                        onClick={() => setStatus(a._id, "screening")}
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
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


