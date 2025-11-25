<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar v-if="showNavbar" />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

// Hide navbar on login page
const route = useRoute();
const showNavbar = computed(() => route.path !== '/login');
</script>

<style>
#app {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: #f8f8ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 20px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}
</style>
