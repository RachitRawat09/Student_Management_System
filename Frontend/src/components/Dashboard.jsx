import React from "react";
import { useParams } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import StudentFees from "./StudentFees";
import StudentHostel from "./StudentHostel";
import StudentAcademics from "./StudentAcademics";
import StudentProfile from "./StudentProfile";

const DashboardContent = () => {
  const { section } = useParams();

  return (
    <div>
      {section === "dashboard" && <StudentDashboard />}
      {section === "fees" && <StudentFees />}
      {section === "hostel" && <StudentHostel />}
      {section === "academics" && <StudentAcademics />}
      {section === "profile" && <StudentProfile />}
    </div>
  );
};

export default DashboardContent;
