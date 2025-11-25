// src/services/api.js
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically to every request
api.interceptors.request.use(
  (config) => {
    try {
      const auth = useAuthStore();
      const token = auth?.token || localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // Pinia might not be ready yet; ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
