<template>
  <q-page>
    {{ productDetails }}
  </q-page>
</template>
<script setup>
import { getProductDetails } from "src/services/productService";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productDetails = ref(null);
const isProductDetailsLoading = ref(false);

async function fetchProductDetails() {
  try {
    isProductDetailsLoading.value = true;
    await getProductDetails(route.query.id);
  } finally {
    isProductDetailsLoading.value = false;
  }
}

onMounted(() => {
  fetchProductDetails();
});
</script>
