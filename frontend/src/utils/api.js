import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kinetic_access_token') || localStorage.getItem('kinetic_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear all auth data on unauthorized
      localStorage.removeItem('kinetic_user');
      localStorage.removeItem('kinetic_access_token');
      localStorage.removeItem('kinetic_token');
      // Redirect to login if not already there
      if (!window.location.pathname.endsWith('/login')) {
        window.location.href = '/kinetictech/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
