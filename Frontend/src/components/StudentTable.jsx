import React, { useMemo, useState } from "react";

const dummyStudents = [
  {
    id: "STU2024001",
    name: "John Doe",
    email: "john.doe@student.edu",
    phone: "+91 98765 43210",
    course: "B.Tech CSE",
    semester: "3",
    hostel: "A-205",
    feesDue: 0,
  },
  {
    id: "STU2024002",
    name: "Priya Sharma",
    email: "priya.sharma@student.edu",
    phone: "+91 98765 40010",
    course: "B.Sc Physics",
    semester: "1",
    hostel: "-",
    feesDue: 2500,
  },
  {
    id: "STU2024003",
    name: "Aman Verma",
    email: "aman.verma@student.edu",
    phone: "+91 98765 41111",
    course: "MBA",
    semester: "2",
    hostel: "B-110",
    feesDue: 0,
  },
];

export default function StudentTable() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dummyStudents;
    return dummyStudents.filter((s) =>
      [s.id, s.name, s.email, s.phone, s.course]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-bold">👥 Students</h2>
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

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-600">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Sem</th>
              <th className="py-3 px-4">Hostel</th>
              <th className="py-3 px-4">Fees</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{s.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.email} • {s.phone}</div>
                  </td>
                  <td className="py-3 px-4">{s.course}</td>
                  <td className="py-3 px-4">{s.semester}</td>
                  <td className="py-3 px-4">{s.hostel}</td>
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
                        onClick={() => setSelected(s)}
                        className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button className="px-3 py-1 rounded border text-blue-700 border-blue-300 hover:bg-blue-50">
                        Edit
                      </button>
                      <button className="px-3 py-1 rounded border text-red-700 border-red-300 hover:bg-red-50">
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

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Student Details</h3>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Student ID</div>
                <div className="font-semibold">{selected.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-semibold">{selected.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-semibold">{selected.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-semibold">{selected.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Course/Sem</div>
                <div className="font-semibold">{selected.course} • {selected.semester}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Hostel</div>
                <div className="font-semibold">{selected.hostel}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-gray-500">Fees</div>
                {selected.feesDue > 0 ? (
                  <div className="font-semibold text-red-600">Due ₹{selected.feesDue}</div>
                ) : (
                  <div className="font-semibold text-green-600">Clear</div>
                )}
              </div>
            </div>
            <div className="p-4 border-t flex items-center justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded border hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




