import React, { useState } from "react";
import ExamForm from "./ExamForm";

const ExamRecords = () => {
  const [records, setRecords] = useState([]);

  const handleAddExam = (exam) => {
    setRecords([...records, exam]);
  };

  return (
    <div>
      <ExamForm onAddExam={handleAddExam} />

      <h2 className="text-xl font-bold mb-4">📊 Exam Records</h2>
      {records.length === 0 ? (
        <p>No exam records available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Roll No</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Exam Date</th>
              <th className="border p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{record.rollNo}</td>
                <td className="border p-2">{record.subject}</td>
                <td className="border p-2">{record.examDate}</td>
                <td className="border p-2">
                  {record.marksObtained}/{record.totalMarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamRecords;
