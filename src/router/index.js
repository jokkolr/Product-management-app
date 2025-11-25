// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

import LoginView from '../views/LoginView.vue';
import ProductsView from '../views/ProductsView.vue';
import ProductDetailsView from '../views/ProductDetailsView.vue';
import AddProductView from '../views/AddProductView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/products/:id', name: 'product-details', component: ProductDetailsView },
    { path: '/add-product', name: 'add-product', component: AddProductView },
    { path: '/', redirect: '/login' }
  ]
});

// Route Protection
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const protectedRoutes = ['/products', '/add-product'];

  if (protectedRoutes.includes(to.path) && !auth.token) {
    return next('/login');
  }

  next();
});

export default router;
