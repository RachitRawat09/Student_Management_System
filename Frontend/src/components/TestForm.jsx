import React, { useState } from 'react';
import { admissionAPI } from '../services/api';

const TestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTestSubmit = async () => {
    setIsSubmitting(true);
    setResult(null);

    try {
      // Create minimal test data
      const formData = new FormData();
      
      // Add required fields
      formData.append('firstName', 'John');
      formData.append('lastName', 'Doe');
      formData.append('email', `john.doe.test.${Date.now()}@example.com`);
      formData.append('phone', '+1234567890');
      formData.append('dateOfBirth', '2000-01-15');
      formData.append('gender', 'Male');
      formData.append('nationality', 'American');

      // Add address
      const addressData = {
        street: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'USA'
      };
      formData.append('address', JSON.stringify(addressData));

      // Add academic info
      const academicData = {
        course: 'Computer Science',
        semester: 'Fall 2024',
        previousEducation: {
          institution: 'Test High School',
          qualification: 'High School Diploma',
          yearOfPassing: 2020,
          percentage: 85.5
        }
      };
      formData.append('academicInfo', JSON.stringify(academicData));

      // Add emergency contact
      const emergencyData = {
        name: 'Jane Doe',
        relationship: 'Mother',
        phone: '+1234567891',
        email: 'jane.doe@example.com'
      };
      formData.append('emergencyContact', JSON.stringify(emergencyData));

      console.log('Test form data:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await admissionAPI.submitAdmission(formData);
      setResult({ type: 'success', data: response });
      
    } catch (error) {
      console.error('Test submission error:', error);
      setResult({ 
        type: 'error', 
        error: error.response?.data || error.message 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🧪 Test Form Submission</h2>
      
      <button
        onClick={handleTestSubmit}
        disabled={isSubmitting}
        className={`px-6 py-3 rounded-lg font-semibold ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isSubmitting ? 'Testing...' : 'Test Form Submission'}
      </button>

      {result && (
        <div className={`mt-4 p-4 rounded-lg ${
          result.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <h3 className="font-semibold mb-2">
            {result.type === 'success' ? '✅ Success!' : '❌ Error'}
          </h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result.data || result.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestForm;
