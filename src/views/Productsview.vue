<!-- src/views/ProductsView.vue -->
<template>
  <div class="container">
    <h2 style="color: var(--primary); margin-bottom: 16px;">Products</h2>

    <!-- Search bar -->
    <div style="display:flex; gap:8px; margin-bottom: 16px; flex-wrap: wrap;">
      <input v-model="searchQuery" type="text" placeholder="Search products..." />
      <button class="btn" @click="search">Search</button>
      <router-link to="/add-product">
        <button class="btn">Add Product</button>
      </router-link>
    </div>

    <!-- Loading -->
    <div v-if="loading">Loading products...</div>

    <!-- Product Grid -->
    <div
      v-if="!loading"
      style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;"
    >
      <div
        v-for="product in products"
        :key="product.id"
        style="border: 1px solid #ddd; border-radius: 6px; padding: 8px;"
      >
        <img
          :src="product.thumbnail || product.images?.[0]"
          alt="product"
          style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;"
        />
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }} USD</p>
        <router-link :to="`/products/${product.id}`" class="btn" style="display:inline-block; margin-top:6px;">
          View
        </router-link>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && total > limit" style="margin-top: 20px;">
      <button class="btn" @click="prev" :disabled="skip === 0">Prev</button>
      <button class="btn" @click="next" :disabled="skip + limit >= total">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/productStore';

const store = useProductStore();
const { products, total, loading, limit, skip } = store;
const searchQuery = ref('');

async function loadProducts() {
  await store.fetchProducts({ q: searchQuery.value, limit: 20, skip: skip });
}

function search() {
  store.fetchProducts({ q: searchQuery.value, limit: 20, skip: 0 });
}

function next() {
  store.fetchProducts({ q: searchQuery.value, limit: limit, skip: skip + limit });
}

function prev() {
  store.fetchProducts({ q: searchQuery.value, limit: limit, skip: Math.max(0, skip - limit) });
}

onMounted(() => {
  loadProducts();
});
</script>
