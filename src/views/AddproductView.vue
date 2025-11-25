<!-- src/views/AddProductView.vue -->
<template>
  <div class="container" style="max-width: 500px;">
    <h2 style="color: var(--primary); margin-bottom: 16px;">Add Product</h2>

    <form @submit.prevent="submit">
      <input v-model="title" type="text" placeholder="Title" required />
      <textarea v-model="description" placeholder="Description" rows="4"></textarea>
      <input v-model.number="price" type="number" placeholder="Price" required />
      <input v-model="category" type="text" placeholder="Category" />

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Adding...' : 'Create Product' }}
      </button>

      <p v-if="error" style="color:red; margin-top: 8px;">{{ error }}</p>
      <p v-if="success" style="color:green; margin-top: 8px;">Product created successfully!</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const title = ref('');
const description = ref('');
const price = ref(0);
const category = ref('');

const router = useRouter();
const store = useProductStore();

const loading = ref(false);
const error = ref('');
const success = ref(false);

async function submit() {
  loading.value = true;
  error.value = '';
  success.value = false;

  const payload = {
    title: title.value,
    description: description.value,
    price: price.value,
    category: category.value
  };

  const created = await store.addProduct(payload);

  loading.value = false;

  if (created && created.id) {
    success.value = true;
    router.push(`/products/${created.id}`);
  } else {
    error.value = 'Failed to create product';
  }
}
</script>
