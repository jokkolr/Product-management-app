<!-- src/components/ProductFilter.vue -->
<template>
  <div style="display:flex; gap:8px; flex-wrap: wrap; margin-bottom:16px;">
    <input v-model="search" type="text" placeholder="Search products..." />
    <select v-model="category">
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
    <input v-model.number="minPrice" type="number" placeholder="Min Price" />
    <input v-model.number="maxPrice" type="number" placeholder="Max Price" />
    <button class="btn" @click="applyFilters">Apply</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';

const emits = defineEmits(['filter']);

const props = defineProps({
  categories: { type: Array, default: () => [] },
});

const search = ref('');
const category = ref('');
const minPrice = ref(0);
const maxPrice = ref(0);

function applyFilters() {
  emits('filter', {
    search: search.value,
    category: category.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  });
}
</script>
