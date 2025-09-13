import React, { useState } from "react";

const Notifications = () => {
  // Dummy notifications data (baad me backend se fetch hoga)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Exam Form Deadline",
      message: "Fill exam form before 20 Sept.",
      date: "2025-09-12",
      priority: "urgent",
      read: false,
    },
    {
      id: 2,
      title: "Hostel Maintenance",
      message: "Hostel A water supply off on 15 Sept.",
      date: "2025-09-11",
      priority: "normal",
      read: true,
    },
    {
      id: 3,
      title: "Fee Reminder",
      message: "Submit fee before 30 Sept.",
      date: "2025-09-10",
      priority: "urgent",
      read: false,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>

      <button
        onClick={markAllAsRead}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Mark All as Read
      </button>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-4 rounded shadow ${
                n.priority === "urgent"
                  ? "border-l-4 border-red-500 bg-red-50"
                  : "border-l-4 border-gray-400 bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">
                    {n.title}{" "}
                    {!n.read && (
                      <span className="text-green-600 ml-2 text-sm">● New</span>
                    )}
                  </h3>
                  <p className="text-gray-700">{n.message}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(n.date).toDateString()}
                  </p>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
