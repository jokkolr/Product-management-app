<!-- src/views/LoginView.vue -->
<template>
  <div class="container" style="max-width: 400px; margin-top: 60px;">
    <h2 style="color: var(--primary); margin-bottom: 20px;">Login</h2>

    <form @submit.prevent="submit">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="error" style="color:red; margin-top: 8px;">{{ error }}</p>

      <p style="margin-top: 16px; font-size: 0.9em;">
        Example user: <strong>kminchelle</strong> / <strong>0lelplR</strong>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const username = ref('');
const password = ref('');
const router = useRouter();
const auth = useAuthStore();

const loading = ref(false);
const error = ref('');

async function submit() {
  loading.value = true;
  error.value = '';
  const success = await auth.login(username.value, password.value);
  loading.value = false;

  if (success) {
    router.push('/products');
  } else {
    error.value = auth.error || 'Login failed';
  }
}
</script>
