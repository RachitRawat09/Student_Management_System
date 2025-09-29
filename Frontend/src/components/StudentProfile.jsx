import React, { useEffect, useMemo, useState } from "react";
import { studentAPI } from "../services/api";

const StudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [student, setStudent] = useState(null);

  const authEmail = useMemo(() => {
    try { return localStorage.getItem('authEmail') || ''; } catch { return ''; }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        if (!authEmail) throw new Error('Not logged in');
        const res = await studentAPI.getByEmail(authEmail);
        if (isMounted) setStudent(res.data);
      } catch (e) {
        if (isMounted) setError(e?.response?.data?.message || e.message || 'Failed to load profile');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [authEmail]);

  const personalInfo = useMemo(() => {
    const fullName = student?.firstName || 'Student';
    return {
      fullName,
      studentId: student?.studentId || '—',
      email: student?.email || authEmail,
      phone: student?.phone || '—',
      dateOfBirth: student?.dateOfBirth ? new Date(student.dateOfBirth).toDateString() : '—',
      gender: student?.gender || '—',
      nationality: student?.nationality || '—',
      bloodGroup: '—',
      category: '—',
      profileImage: student?.documents?.profilePhoto || 'https://via.placeholder.com/80'
    };
  }, [student, authEmail]);

  const addressInfo = useMemo(() => {
    const a = student?.address || {};
    const permanent = [a.street, a.city, a.state, a.zipCode, a.country].filter(Boolean).join(', ');
    return {
      permanentAddress: permanent || '—',
      currentAddress: permanent || '—'
    };
  }, [student]);

  const parentInfo = useMemo(() => {
    const e = student?.emergencyContact || {};
    return {
      fatherName: e.name || '—',
      fatherOccupation: e.relationship || '—',
      fatherContact: e.phone || '—',
      motherName: '—',
      motherOccupation: '—',
      motherContact: '—',
      annualIncome: '—'
    };
  }, [student]);

  const academicInfo = useMemo(() => {
    const ai = student?.academicInfo || {};
    return {
      course: ai.course || '—',
      specialization: ai.specialization || '—',
      semester: ai.semester || '—',
      batch: '—',
      admissionDate: student?.approvedAt ? new Date(student.approvedAt).toDateString() : '—',
      rollNumber: '—',
      enrollmentNumber: '—'
    };
  }, [student]);

  const educationalBackground = useMemo(() => {
    const prev = student?.academicInfo?.previousEducation;
    if (!prev) return [];
    return [
      {
        qualification: prev.qualification,
        school: prev.institution,
        board: '',
        passingYear: String(prev.yearOfPassing || ''),
        percentage: prev.percentage != null ? `${prev.percentage}%` : '—'
      }
    ];
  }, [student]);

  const documents = useMemo(() => {
    const d = student?.documents || {};
    return [
      { name: "Profile Photo", status: d.profilePhoto ? "Uploaded" : "Missing", icon: "📷" },
      { name: "ID Proof", status: d.idProof ? "Uploaded" : "Missing", icon: "🆔" },
      { name: "Address Proof", status: d.addressProof ? "Uploaded" : "Missing", icon: "📄" },
      { name: "Academic Certificates", status: (d.academicCertificates||[]).length?"Uploaded":"Missing", icon: "📚" }
    ];
  }, [student]);

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center">
          <img 
            src={personalInfo.profileImage} 
            alt="Profile" 
            className="w-20 h-20 rounded-full border-4 border-white mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
            <p className="text-purple-100">
              {academicInfo.course} • {academicInfo.semester} • {academicInfo.batch}
            </p>
            <p className="text-purple-200 text-sm">
              Student ID: {personalInfo.studentId}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">👤</span>
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Full Name</span>
              <span className="font-semibold">{personalInfo.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Date of Birth</span>
              <span className="font-semibold">{personalInfo.dateOfBirth}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Gender</span>
              <span className="font-semibold">{personalInfo.gender}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Blood Group</span>
              <span className="font-semibold">{personalInfo.bloodGroup}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold">{personalInfo.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Phone</span>
              <span className="font-semibold">{personalInfo.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Nationality</span>
              <span className="font-semibold">{personalInfo.nationality}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Category</span>
              <span className="font-semibold">{personalInfo.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📍</span>
          Address Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Address</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{addressInfo.permanentAddress}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{addressInfo.currentAddress}</p>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">👨‍👩‍👧‍👦</span>
          Parent/Guardian Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Father's Details</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Name</span>
              <span className="font-semibold">{parentInfo.fatherName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Occupation</span>
              <span className="font-semibold">{parentInfo.fatherOccupation}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Contact</span>
              <span className="font-semibold">{parentInfo.fatherContact}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Mother's Details</h3>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Name</span>
              <span className="font-semibold">{parentInfo.motherName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Occupation</span>
              <span className="font-semibold">{parentInfo.motherOccupation}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Contact</span>
              <span className="font-semibold">{parentInfo.motherContact}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Annual Family Income</span>
            <span className="font-semibold">{parentInfo.annualIncome}</span>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🎓</span>
          Academic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Course</span>
              <span className="font-semibold">{academicInfo.course}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Specialization</span>
              <span className="font-semibold">{academicInfo.specialization}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Current Semester</span>
              <span className="font-semibold">{academicInfo.semester}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Batch</span>
              <span className="font-semibold">{academicInfo.batch}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Admission Date</span>
              <span className="font-semibold">{academicInfo.admissionDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Roll Number</span>
              <span className="font-semibold">{academicInfo.rollNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Enrollment Number</span>
              <span className="font-semibold">{academicInfo.enrollmentNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Student ID</span>
              <span className="font-semibold">{personalInfo.studentId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Background */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📚</span>
          Educational Background
        </h2>
        <div className="space-y-4">
          {educationalBackground.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.qualification}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.school || edu.exam} • {edu.board || edu.year}
                  </p>
                  <p className="text-sm text-gray-500">Passing Year: {edu.passingYear || edu.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    {edu.percentage || edu.score || edu.rank}
                  </p>
                  <p className="text-xs text-gray-500">
                    {edu.percentage ? 'Percentage' : edu.score ? 'Score' : 'Rank'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Status */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📄</span>
          Documents Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">{doc.icon}</div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{doc.name}</h3>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-blue-600 mr-3 mt-1">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Profile Information</h3>
            <p className="text-blue-800 text-sm">
              This profile contains your admission details and is read-only. 
              If you need to update any information, please contact the administration office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
