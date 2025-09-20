import React, { useMemo, useState } from "react";
import { admissionAPI } from "../services/api";

const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    // 1) Personal Details
    fullName: "",
    dob: "",
    gender: "",
    nationality: "",
    category: "",
    bloodGroup: "",
    contactNumber: "",
    altContactNumber: "",
    email: "",
    permanentAddress: "",
    currentAddress: "",

    // 2) Parent / Guardian Details
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    fatherContact: "",
    motherOccupation: "",
    motherContact: "",
    guardianName: "",
    guardianContact: "",
    annualIncome: "",

    // 3) Educational Details
    prevInstitute: "",
    lastQualification: "",
    passingYear: "",
    boardUniversity: "",
    lastPercentage: "",
    chosenCourse: "",
    specialization: "",

    // 4) Admission Details
    admissionType: "",
    academicSession: "",
    admissionMode: "",
    entranceExamName: "",
    entranceRollNo: "",
    entranceRank: "",

    // 5) Documents Upload (store File or string for preview refs)
    photo: null,
    signature: null,
    idProof: null, // Aadhaar/ID
    marksheet10: null,
    marksheet12: null,
    graduationMarksheet: null,
    tcMigration: null,
    casteCertificate: null,
    incomeCertificate: null,
    examScoreCard: null,

    // 6) Hostel & Transport (Optional)
    needHostel: "no",
    needTransport: "no",
    busStop: "",

    // 7) Declaration
    declarationAccepted: false,
  });

  const progressPercent = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((p) => ({ ...p, [name]: checked }));
    } else if (type === "file") {
      setFormData((p) => ({ ...p, [name]: files && files[0] ? files[0] : null }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const validateStep = () => {
    if (step === 1) {
      const required = [
        "fullName",
        "dob",
        "gender",
        "nationality",
        "category",
        "contactNumber",
        "email",
        "permanentAddress",
      ];
      return required.every((k) => String(formData[k] || "").trim().length > 0);
    }
    if (step === 2) {
      const required = ["fatherName", "motherName", "annualIncome"];
      return required.every((k) => String(formData[k] || "").trim().length > 0);
    }
    if (step === 3) {
      const required = ["lastQualification", "passingYear", "chosenCourse"];
      return required.every((k) => String(formData[k] || "").trim().length > 0);
    }
    if (step === 4) {
      const required = ["admissionType", "academicSession", "admissionMode"];
      return required.every((k) => String(formData[k] || "").trim().length > 0);
    }
    if (step === 7) {
      return formData.declarationAccepted;
    }
    return true;
  };

  const onNext = () => {
    if (!validateStep()) {
      alert("Please complete the required fields before proceeding.");
      return;
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  const onPrev = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      alert("Please complete the required fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare form data for backend
      const formDataToSend = new FormData();

      // Add personal information
      formDataToSend.append('firstName', formData.fullName.split(' ')[0] || '');
      formDataToSend.append('lastName', formData.fullName.split(' ').slice(1).join(' ') || '');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.contactNumber);
      formDataToSend.append('dateOfBirth', formData.dob);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('nationality', formData.nationality);

      // Add address information
      const addressData = {
        street: formData.permanentAddress || formData.currentAddress || "Address not provided",
        city: "City", // Default city
        state: "State", // Default state
        zipCode: "00000", // Default zip code
        country: formData.nationality || "Country not specified"
      };
      formDataToSend.append('address', JSON.stringify(addressData));

      // Add academic information
      const academicData = {
        course: formData.chosenCourse || "Course not specified",
        semester: formData.academicSession || "Semester not specified",
        previousEducation: {
          institution: formData.prevInstitute || "Previous Institution",
          qualification: formData.lastQualification || "Qualification not specified",
          yearOfPassing: parseInt(formData.passingYear) || new Date().getFullYear(),
          percentage: parseFloat(formData.lastPercentage) || 0
        }
      };
      formDataToSend.append('academicInfo', JSON.stringify(academicData));

      // Add emergency contact
      const emergencyData = {
        name: formData.fatherName || formData.motherName || "Emergency Contact",
        relationship: "Parent",
        phone: formData.fatherContact || formData.motherContact || formData.contactNumber,
        email: formData.email || ""
      };
      formDataToSend.append('emergencyContact', JSON.stringify(emergencyData));

      // Add files
      if (formData.photo) {
        formDataToSend.append('profilePhoto', formData.photo);
      }
      if (formData.idProof) {
        formDataToSend.append('idProof', formData.idProof);
      }
      
      // Add academic certificates as individual files
      if (formData.marksheet10) {
        formDataToSend.append('academicCertificates', formData.marksheet10);
      }
      if (formData.marksheet12) {
        formDataToSend.append('academicCertificates', formData.marksheet12);
      }
      if (formData.graduationMarksheet) {
        formDataToSend.append('academicCertificates', formData.graduationMarksheet);
      }
      
      // Add other documents
      if (formData.tcMigration) {
        formDataToSend.append('otherDocuments', formData.tcMigration);
      }
      if (formData.casteCertificate) {
        formDataToSend.append('otherDocuments', formData.casteCertificate);
      }
      if (formData.incomeCertificate) {
        formDataToSend.append('otherDocuments', formData.incomeCertificate);
      }

      // Debug: Log form data being sent
      console.log('Form data being sent:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      // Submit to backend
      const response = await admissionAPI.submitAdmission(formDataToSend);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Admission form submitted successfully!',
          data: response.data
        });
        console.log('Admission submitted successfully:', response.data);
      } else {
        throw new Error(response.message || 'Failed to submit admission form');
      }

    } catch (error) {
      console.error('Error submitting admission:', error);
      
      // Show detailed error information
      let errorMessage = 'Failed to submit admission form. Please try again.';
      
      if (error.response?.data) {
        console.log('Backend error response:', error.response.data);
        
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          // Show validation errors
          errorMessage = 'Validation errors:\n' + error.response.data.errors.map(err => `• ${err.msg || err.message}`).join('\n');
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Status Messages */}
      {submitStatus && (
        <div className={`mb-4 p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex items-center">
            <span className="text-lg mr-2">
              {submitStatus.type === 'success' ? '✅' : '❌'}
            </span>
            <div>
              <p className="font-semibold">{submitStatus.message}</p>
              {submitStatus.data && (
                <p className="text-sm mt-1">
                  Application ID: {submitStatus.data.studentId} | 
                  Status: {submitStatus.data.admissionStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">🎓 Student Admission</h2>
          <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="bg-blue-600 h-2 rounded" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {step === 1 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border">
          <h3 className="md:col-span-2 text-lg font-semibold">1) Personal Details</h3>
          <input className="border p-2 rounded" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input className="border p-2 rounded" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <select className="border p-2 rounded" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input className="border p-2 rounded" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} required />
          <select className="border p-2 rounded" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Category</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            <option value="EWS">EWS</option>
          </select>
          <input className="border p-2 rounded" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} />
          <input className="border p-2 rounded" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
          <input className="border p-2 rounded" name="altContactNumber" placeholder="Alternate Contact (Parent/Guardian)" value={formData.altContactNumber} onChange={handleChange} />
          <input className="border p-2 rounded" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <textarea className="border p-2 rounded md:col-span-2" name="permanentAddress" placeholder="Permanent Address" value={formData.permanentAddress} onChange={handleChange} required />
          <textarea className="border p-2 rounded md:col-span-2" name="currentAddress" placeholder="Current Address" value={formData.currentAddress} onChange={handleChange} />
        </section>
      )}

      {step === 2 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border">
          <h3 className="md:col-span-2 text-lg font-semibold">2) Parent / Guardian Details</h3>
          <input className="border p-2 rounded" name="fatherName" placeholder="Father’s Name" value={formData.fatherName} onChange={handleChange} required />
          <input className="border p-2 rounded" name="motherName" placeholder="Mother’s Name" value={formData.motherName} onChange={handleChange} required />
          <input className="border p-2 rounded" name="fatherOccupation" placeholder="Father’s Occupation" value={formData.fatherOccupation} onChange={handleChange} />
          <input className="border p-2 rounded" name="fatherContact" placeholder="Father’s Contact Number" value={formData.fatherContact} onChange={handleChange} />
          <input className="border p-2 rounded" name="motherOccupation" placeholder="Mother’s Occupation" value={formData.motherOccupation} onChange={handleChange} />
          <input className="border p-2 rounded" name="motherContact" placeholder="Mother’s Contact Number" value={formData.motherContact} onChange={handleChange} />
          <input className="border p-2 rounded" name="guardianName" placeholder="Guardian Name (if applicable)" value={formData.guardianName} onChange={handleChange} />
          <input className="border p-2 rounded" name="guardianContact" placeholder="Guardian Contact Number" value={formData.guardianContact} onChange={handleChange} />
          <input className="border p-2 rounded" type="number" name="annualIncome" placeholder="Annual Family Income" value={formData.annualIncome} onChange={handleChange} required />
        </section>
      )}

      {step === 3 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border">
          <h3 className="md:col-span-2 text-lg font-semibold">3) Educational Details</h3>
          <input className="border p-2 rounded" name="prevInstitute" placeholder="Previous School/College Name" value={formData.prevInstitute} onChange={handleChange} />
          <select className="border p-2 rounded" name="lastQualification" value={formData.lastQualification} onChange={handleChange} required>
            <option value="">Last Qualification</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Diploma">Diploma</option>
            <option value="Graduation">Graduation</option>
          </select>
          <input className="border p-2 rounded" type="number" name="passingYear" placeholder="Year of Passing" value={formData.passingYear} onChange={handleChange} required />
          <input className="border p-2 rounded" name="boardUniversity" placeholder="Board/University Name" value={formData.boardUniversity} onChange={handleChange} />
          <input className="border p-2 rounded" name="lastPercentage" placeholder="Percentage/CGPA in Last Exam" value={formData.lastPercentage} onChange={handleChange} />
          <input className="border p-2 rounded" name="chosenCourse" placeholder="Chosen Course (e.g., B.Tech, B.Sc, MBA)" value={formData.chosenCourse} onChange={handleChange} required />
          <input className="border p-2 rounded" name="specialization" placeholder="Specialization / Branch (e.g., CSE, Mechanical)" value={formData.specialization} onChange={handleChange} />
        </section>
      )}

      {step === 4 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border">
          <h3 className="md:col-span-2 text-lg font-semibold">4) Admission Details</h3>
          <select className="border p-2 rounded" name="admissionType" value={formData.admissionType} onChange={handleChange} required>
            <option value="">Admission Type</option>
            <option value="Regular">Regular</option>
            <option value="Lateral Entry">Lateral Entry</option>
            <option value="Management Quota">Management Quota</option>
          </select>
          <input className="border p-2 rounded" name="academicSession" placeholder="Session/Academic Year (e.g., 2025–2026)" value={formData.academicSession} onChange={handleChange} required />
          <select className="border p-2 rounded" name="admissionMode" value={formData.admissionMode} onChange={handleChange} required>
            <option value="">Mode of Admission</option>
            <option value="Entrance Exam">Entrance Exam</option>
            <option value="Direct">Direct</option>
          </select>
          <input className="border p-2 rounded" name="entranceExamName" placeholder="Entrance Exam Name (if any)" value={formData.entranceExamName} onChange={handleChange} />
          <input className="border p-2 rounded" name="entranceRollNo" placeholder="Entrance Exam Roll No" value={formData.entranceRollNo} onChange={handleChange} />
          <input className="border p-2 rounded" name="entranceRank" placeholder="Entrance Exam Rank" value={formData.entranceRank} onChange={handleChange} />
        </section>
      )}

      {step === 5 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border">
          <h3 className="md:col-span-2 text-lg font-semibold">5) Documents Upload (Scanned Copies)</h3>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Passport Size Photograph</label>
            <input className="border p-2 rounded" type="file" name="photo" accept="image/*" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Signature</label>
            <input className="border p-2 rounded" type="file" name="signature" accept="image/*" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Aadhaar / National ID Proof</label>
            <input className="border p-2 rounded" type="file" name="idProof" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">10th Marksheet</label>
            <input className="border p-2 rounded" type="file" name="marksheet10" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">12th Marksheet</label>
            <input className="border p-2 rounded" type="file" name="marksheet12" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Graduation Marksheet (if PG course)</label>
            <input className="border p-2 rounded" type="file" name="graduationMarksheet" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Transfer/Migration Certificate</label>
            <input className="border p-2 rounded" type="file" name="tcMigration" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Caste Certificate (if applicable)</label>
            <input className="border p-2 rounded" type="file" name="casteCertificate" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Income Certificate (for scholarship/EWS)</label>
            <input className="border p-2 rounded" type="file" name="incomeCertificate" onChange={handleChange} />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-gray-700 mb-1">Entrance Exam Score Card (if applicable)</label>
            <input className="border p-2 rounded" type="file" name="examScoreCard" onChange={handleChange} />
          </div>
        </section>
      )}

      {step === 6 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border">
          <h3 className="md:col-span-2 text-lg font-semibold">6) Hostel & Transport (Optional)</h3>
          <select className="border p-2 rounded" name="needHostel" value={formData.needHostel} onChange={handleChange}>
            <option value="no">Require Hostel? No</option>
            <option value="yes">Require Hostel? Yes</option>
          </select>
          <select className="border p-2 rounded" name="needTransport" value={formData.needTransport} onChange={handleChange}>
            <option value="no">Require Transport? No</option>
            <option value="yes">Require Transport? Yes</option>
          </select>
          {formData.needTransport === "yes" && (
            <input className="border p-2 rounded md:col-span-2" name="busStop" placeholder="Nearest Bus Stop / Pickup Point" value={formData.busStop} onChange={handleChange} />
          )}
        </section>
      )}

      {step === 7 && (
        <section className="bg-white p-4 rounded border">
          <h3 className="text-lg font-semibold mb-2">7) Declaration & Confirmation</h3>
          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="checkbox" name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleChange} className="mt-1" />
            <span>
              I hereby declare that all the information provided is true to the best of my knowledge. I understand that false information may lead to cancellation of admission.
            </span>
          </label>
        </section>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={onPrev} disabled={step === 1} className={`px-4 py-2 rounded border ${step === 1 ? 'border-gray-300 text-gray-300' : 'border-gray-400 text-gray-700 hover:bg-gray-50'}`}>
          Previous
        </button>
        {step < totalSteps ? (
          <button type="button" onClick={onNext} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Next
          </button>
        ) : (
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Application'
            )}
          </button>
        )}
      </div>
    </form>
    </div>
  );
};

export default AdmissionForm;

