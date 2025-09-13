import React from "react";
import { useParams } from "react-router-dom";
import AdmissionForm from "./AdmissionForm";
import FeeForm from "./FeeForm";
import HostelForm from "./HostelForm";
import ExamRecords from "./ExamRecords";
import Notifications from "./Notifications"; 

const DashboardContent = () => {
  const { section } = useParams();

  return (
    <div className="p-6">
      {section === "profile" && (
        <div>
          <h2 className="text-xl font-bold mb-2"> Student Profile</h2>
          <p>Basic student details will appear here.</p>
        </div>
      )}

      {section === "admission" && (
        <div>
          <AdmissionForm />
        </div>
      )}

      {section === "fee" && (
        <div>
         <FeeForm/>
        </div>
      )}

      {section === "hostel" && (
        <div>
         <HostelForm/>
        </div>
      )}

    {section === "exams" && <ExamRecords />} 

   {section === "notifications" && <Notifications />}
    </div>
  );
};

export default DashboardContent;
