<!-- src/components/Navbar.vue -->
<template>
  <nav
    style="background-color: var(--primary); color: white; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center;"
  >
    <div style="font-weight: bold; font-size: 1.2em;">
      PM App
    </div>

    <div style="display:flex; gap: 12px; align-items:center;">
      <router-link to="/products" style="color:white;">Products</router-link>
      <router-link to="/add-product" style="color:white;">Add Product</router-link>
      <button class="btn" @click="logout" style="background-color: white; color: var(--primary); padding: 6px 10px; border-radius: 4px;">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.logout();
  router.push('/login');
}
</script>
