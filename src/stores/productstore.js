// src/stores/productStore.js
import { defineStore } from 'pinia';
import api from '../services/api';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    total: 0,
    loading: false,
    lastQuery: '',
    filters: {
      category: '',
      minPrice: 0,
      maxPrice: 0
    },
    limit: 20,
    skip: 0,
  }),

  actions: {
    async fetchProducts({ q = '', filters = {}, limit = 20, skip = 0 } = {}) {
      this.loading = true;
      this.limit = limit;
      this.skip = skip;
      this.lastQuery = q;

      try {
        let res;
        if (q && q.trim().length > 0) {
          res = await api.get(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`);
        } else {
          res = await api.get(`/products?limit=${limit}&skip=${skip}`);
        }

        let items = res.data.products;
        this.total = res.data.total;

        // Apply client-side filters
        if (filters.category) {
          items = items.filter(p => p.category === filters.category);
        }
        if (filters.minPrice) {
          items = items.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
          items = items.filter(p => p.price <= filters.maxPrice);
        }

        this.products = items;
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id) {
      try {
        const res = await api.get(`/products/${id}`);
        return res.data;
      } catch (err) {
        console.error('Error fetching product:', err);
        return null;
      }
    },

    async addProduct(payload) {
      try {
        const res = await api.post('/products/add', payload);
        return res.data;
      } catch (err) {
        console.error('Error adding product:', err);
        return null;
      }
    }
  }
});
