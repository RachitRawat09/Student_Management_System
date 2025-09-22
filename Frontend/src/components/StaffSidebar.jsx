import React from "react";

const items = [
  { key: "overview", label: "Overview", icon: "🏠" },
  { key: "students", label: "Students", icon: "👥" },
  { key: "admission", label: "Admission", icon: "🎓" },
  { key: "hostel", label: "Hostel", icon: "🏨" },
  { key: "fees", label: "Fees", icon: "💳" },
  { key: "academics", label: "Academics", icon: "📚" },
  { key: "notifications", label: "Notifications", icon: "🔔" },
  { key: "reports", label: "Reports", icon: "📈" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

export default function StaffSidebar({ activeKey, onSelect }) {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 fixed top-16 bottom-0 left-0">
      <div className="px-4 py-3 border-b">
        <div className="text-xs uppercase tracking-wider text-gray-500">Staff Panel</div>
        <div className="text-sm text-gray-700">College ERP</div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-colors ${
              activeKey === item.key
                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-3 border-t text-xs text-gray-500">
        v1.0 • © ERP
      </div>
    </aside>
  );
}




