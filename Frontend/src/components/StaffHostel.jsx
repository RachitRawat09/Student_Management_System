import React, { useEffect, useState } from "react";
import { hostelAPI } from "../services/api";

export default function StaffHostel() {
  const [stats, setStats] = useState([]);
  const [apps, setApps] = useState([]);
  const [allocForm, setAllocForm] = useState({ email: "", roomType: "Single", roomNumber: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allocating, setAllocating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [s, a] = await Promise.all([hostelAPI.getStats(), hostelAPI.listApplications()]);
      setStats(s.data || []);
      setApps(a.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submitAllocation = async (e) => {
    e.preventDefault();
    setAllocating(true);
    setError("");
    try {
      await hostelAPI.allocate(allocForm);
      setAllocForm({ email: "", roomType: "Single", roomNumber: "" });
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to allocate');
    } finally {
      setAllocating(false);
    }
  };

  if (loading) return <div>Loading hostel data...</div>;

  return (
    <div className="space-y-6">
      {error ? <div className="text-red-600">{error}</div> : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-600">
            <div className="text-sm text-gray-500">{s.type} Rooms</div>
            <div className="mt-2 flex items-end gap-3">
              <div className="text-3xl font-bold">{s.filled}/{s.total}</div>
              <div className="text-sm text-green-600">Empty: {s.empty}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-3">Pending Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Name</th>
                <th className="text-left py-2 px-2">Email</th>
                <th className="text-left py-2 px-2">Course</th>
                <th className="text-left py-2 px-2">Preferred Type</th>
                <th className="text-left py-2 px-2">Applied At</th>
              </tr>
            </thead>
            <tbody>
              {apps.length === 0 ? (
                <tr><td colSpan={5} className="py-4 text-center text-gray-500">No applications</td></tr>
              ) : apps.map((a, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2">{a.firstName || '—'}</td>
                  <td className="py-2 px-2">{a.email}</td>
                  <td className="py-2 px-2">{a.academicInfo?.course || '—'}</td>
                  <td className="py-2 px-2">{a.hostel?.application?.preferences?.roomType || '—'}</td>
                  <td className="py-2 px-2">{a.hostel?.application?.appliedAt ? new Date(a.hostel.application.appliedAt).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-3">Allocate Room</h3>
        <form onSubmit={submitAllocation} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="border p-2 rounded" placeholder="Student Email" value={allocForm.email} onChange={(e)=>setAllocForm(f=>({...f, email: e.target.value}))} required />
          <select className="border p-2 rounded" value={allocForm.roomType} onChange={(e)=>setAllocForm(f=>({...f, roomType: e.target.value}))}>
            <option>Single</option>
            <option>Double</option>
            <option>Triple</option>
          </select>
          <input className="border p-2 rounded" placeholder="Room Number" value={allocForm.roomNumber} onChange={(e)=>setAllocForm(f=>({...f, roomNumber: e.target.value}))} required />
          <button disabled={allocating} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            {allocating ? 'Allocating...' : 'Allocate'}
          </button>
        </form>
      </div>
    </div>
  );
}



