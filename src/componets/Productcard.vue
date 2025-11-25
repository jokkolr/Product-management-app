<!-- src/components/ProductCard.vue -->
<template>
  <div style="border:1px solid #ddd; border-radius:6px; padding:8px;">
    <img
      :src="product.thumbnail || product.images?.[0]"
      alt="product"
      style="width:100%; height:150px; object-fit:cover; border-radius:4px;"
    />
    <h3>{{ product.title }}</h3>
    <p>{{ product.price }} USD</p>
    <router-link :to="`/products/${product.id}`" class="btn" style="display:inline-block; margin-top:6px;">
      View
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>
