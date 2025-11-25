// src/stores/authStore.js
import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  actions: {
    async login(username, password) {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.post('/auth/login', {
          username,
          password,
        });

        this.token = res.data.token;
        this.user = res.data;

        // Save token to localStorage
        localStorage.setItem('token', this.token);

        return true; // login success
      } catch (err) {
        this.error = "Invalid login credentials";
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});
