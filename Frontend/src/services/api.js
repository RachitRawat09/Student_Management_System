import axios from 'axios';

// Create axios instance with base configuration
// NEW (production backend)
const api = axios.create({
  // baseURL: 'https://student-management-system-hz2g.onrender.com/',
  baseURL: 'http://localhost:5000/',
  // 
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});


// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed in the future
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API error:', error.response?.status, error.response?.data || error.message);
    
    // Handle common errors
    if (error.response?.status === 500) {
      console.error('Server error - please try again later');
    } else if (error.response?.status === 400) {
      console.error('Validation error:', error.response.data.message);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to server - make sure backend is running');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const admissionAPI = {
  // Submit admission form with file uploads
  submitAdmission: async (formData) => {
    try {
      const response = await api.post('/api/admission/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check admission status by email
  checkStatus: async (email) => {
    try {
      const response = await api.get(`/api/admission/status/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all applications (admin)
  getAllApplications: async (params = {}) => {
    try {
      const response = await api.get('/api/admission/applications', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single application (admin)
  getApplicationById: async (id) => {
    try {
      const response = await api.get(`/api/admission/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get application for screening with documents
  getApplicationForScreening: async (id) => {
    try {
      const response = await api.get(`/api/admission/applications/${id}/screening`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update admission status (admin)
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/api/admission/applications/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Approve application and create student + send email (if backend supports)
  approveApplication: async (id, { password }) => {
    try {
      const response = await api.post(`/api/admission/applications/${id}/approve`, { password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete application (admin)
  deleteApplication: async (id) => {
    try {
      const response = await api.delete(`/api/admission/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Student endpoints
export const studentAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/api/students/all', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/api/students/${id}`);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/api/students/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/api/students/${id}`);
    return response.data;
  },
  getByEmail: async (email) => {
    const response = await api.get(`/api/students/by-email/${encodeURIComponent(email)}`);
    return response.data;
  },
  getHostel: async (email) => {
    const response = await api.get(`/api/students/hostel/${encodeURIComponent(email)}`);
    return response.data;
  },
  applyHostel: async ({ email, preferences }) => {
    const response = await api.post('/api/students/hostel/apply', { email, preferences });
    return response.data;
  }
};

// Hostel (staff) endpoints
export const hostelAPI = {
  getStats: async () => {
    const res = await api.get('/api/hostel/stats');
    return res.data;
  },
  listApplications: async () => {
    const res = await api.get('/api/hostel/applications');
    return res.data;
  },
  allocate: async ({ email, roomType, roomNumber }) => {
    const res = await api.post('/api/hostel/allocate', { email, roomType, roomNumber });
    return res.data;
  },
};

// Fee endpoints
export const feeAPI = {
  // Staff endpoints
  createFeeNotice: async (feeData) => {
    const response = await api.post('/api/fees/create', feeData);
    return response.data;
  },
  getAllFeeNotices: async (params = {}) => {
    const response = await api.get('/api/fees/list', { params });
    return response.data;
  },
  getFeeStatistics: async (params = {}) => {
    const response = await api.get('/api/fees/stats', { params });
    return response.data;
  },
  updateFeeStatus: async (id, status) => {
    const response = await api.put(`/api/fees/${id}/status`, { status });
    return response.data;
  },
  
  // Student endpoints
  getStudentFees: async (email) => {
    const response = await api.get(`/api/fees/student/${encodeURIComponent(email)}`);
    return response.data;
  },
  recordPayment: async (paymentData) => {
    const response = await api.post('/api/fees/pay', paymentData);
    return response.data;
  }
};

// Dashboard endpoints
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/api/dashboard/stats');
    return response.data;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;





