import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7024/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
