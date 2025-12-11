import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082', // ✅ no /api here so sanctum/csrf-cookie works
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // ✅ required for Sanctum to send cookies
});

// Attach token to every request
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Initialize from localStorage on app load
const saved = localStorage.getItem('token');
if (saved) setAuthToken(saved);

// ✅ Enhanced logging for debugging
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("🔗 API Request →", {
    method: config.method.toUpperCase(),
    url: config.url,
    headers: config.headers,
    data: config.data,
  });

  return config;
});

export default api;
