import axios from 'axios';

// Create axios instance with base configuration
// NEW (production backend)
const api = axios.create({
  baseURL: 'https://student-management-system-hz2g.onrender.com',
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
      const response = await api.post('/admission/submit', formData, {
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
      const response = await api.get(`/admission/status/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all applications (admin)
  getAllApplications: async (params = {}) => {
    try {
      const response = await api.get('/admission/applications', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single application (admin)
  getApplicationById: async (id) => {
    try {
      const response = await api.get(`/admission/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update admission status (admin)
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/admission/applications/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Approve application and create student + send email (if backend supports)
  approveApplication: async (id, { password }) => {
    try {
      const response = await api.post(`/admission/applications/${id}/approve`, { password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete application (admin)
  deleteApplication: async (id) => {
    try {
      const response = await api.delete(`/admission/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Student endpoints
export const studentAPI = {
  getByEmail: async (email) => {
    const response = await api.get(`/students/by-email/${encodeURIComponent(email)}`);
    return response.data;
  },
  getHostel: async (email) => {
    const response = await api.get(`/students/hostel/${encodeURIComponent(email)}`);
    return response.data;
  },
  applyHostel: async ({ email, preferences }) => {
    const response = await api.post('/students/hostel/apply', { email, preferences });
    return response.data;
  }
};

// Hostel (staff) endpoints
export const hostelAPI = {
  getStats: async () => {
    const res = await api.get('/hostel/stats');
    return res.data;
  },
  listApplications: async () => {
    const res = await api.get('/hostel/applications');
    return res.data;
  },
  allocate: async ({ email, roomType, roomNumber }) => {
    const res = await api.post('/hostel/allocate', { email, roomType, roomNumber });
    return res.data;
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;





