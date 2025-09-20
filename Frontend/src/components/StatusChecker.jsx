import React, { useState } from 'react';
import { admissionAPI } from '../services/api';

const StatusChecker = () => {
  const [email, setEmail] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStatusData(null);

    try {
      const response = await admissionAPI.checkStatus(email);
      if (response.success) {
        setStatusData(response.data);
      } else {
        setError(response.message || 'Failed to fetch status');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setError(error.response?.data?.message || error.message || 'Failed to check status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600 bg-green-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      case 'Under Review':
        return 'text-yellow-600 bg-yellow-100';
      case 'Pending':
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return '✅';
      case 'Rejected':
        return '❌';
      case 'Under Review':
        return '🔍';
      case 'Pending':
      default:
        return '⏳';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">📋 Check Admission Status</h2>
      
      <form onSubmit={handleCheckStatus} className="mb-6">
        <div className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg font-semibold ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </span>
            ) : (
              'Check Status'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex items-center">
            <span className="text-lg mr-2">❌</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {statusData && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Application Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-gray-900">{statusData.firstName} {statusData.lastName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{statusData.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Status</label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(statusData.admissionStatus)}`}>
                <span className="mr-2">{getStatusIcon(statusData.admissionStatus)}</span>
                {statusData.admissionStatus}
              </span>
            </div>
            
            {statusData.studentId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <p className="text-gray-900 font-mono">{statusData.studentId}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Submitted On</label>
              <p className="text-gray-900">
                {new Date(statusData.submittedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            {statusData.reviewedAt && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reviewed On</label>
                <p className="text-gray-900">
                  {new Date(statusData.reviewedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}
          </div>

          {statusData.admissionStatus === 'Approved' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h4>
              <p className="text-green-700">
                Your admission has been approved! You can now proceed with the enrollment process.
                Please contact the administration office for further instructions.
              </p>
            </div>
          )}

          {statusData.admissionStatus === 'Rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-red-800 mb-2">Application Not Approved</h4>
              <p className="text-red-700">
                Unfortunately, your application was not approved. Please contact the administration office for more details.
              </p>
            </div>
          )}

          {statusData.admissionStatus === 'Under Review' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">Under Review</h4>
              <p className="text-yellow-700">
                Your application is currently being reviewed by our team. We will notify you once the review is complete.
              </p>
            </div>
          )}

          {statusData.admissionStatus === 'Pending' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Application Received</h4>
              <p className="text-blue-700">
                Your application has been received and is in the queue for review. Please wait for further updates.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusChecker;

