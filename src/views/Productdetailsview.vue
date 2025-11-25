<!-- src/views/ProductDetailsView.vue -->
<template>
  <div class="container" v-if="product">
    <h2 style="color: var(--primary); margin-bottom: 16px;">{{ product.title }}</h2>

    <div style="display:flex; flex-wrap: wrap; gap: 20px;">
      <img
        :src="product.thumbnail || product.images?.[0]"
        alt="product"
        style="width: 320px; height: 240px; object-fit: cover; border-radius: 6px;"
      />

      <div style="flex: 1;">
        <p><strong>Price:</strong> {{ product.price }} USD</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Description:</strong></p>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <p>Loading product details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const route = useRoute();
const store = useProductStore();

const product = ref(null);

onMounted(async () => {
  const id = route.params.id;
  product.value = await store.fetchProductById(id);
});
</script>
