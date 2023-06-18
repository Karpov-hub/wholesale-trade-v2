<template>
  <q-page class="flex">
    <section class="column col-grow">
      <div v-if="products?.length > 0" class="row q-col-gutter-md">
        <!-- product card -->
        <div
          v-for="(product, index) in products"
          :key="index"
          class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1"
        >
          <WProductCard :model-value="product" class="full-height">
            {{ product.name }}
          </WProductCard>
        </div>
        <!-- pagination -->
        <div class="flex justify-end col-12">
          <q-pagination
            v-model="pagination.page"
            :max="pagination.maxPages"
            direction-links
            push
            active-design="push"
            active-color="orange"
            @update:model-value="fetchProducts()"
          />
        </div>
      </div>
      <div
        v-if="products?.length === 0"
        class="flex flex-center col-12 full-height text-h6"
      >
        Товары сейчас отсутствуют 😢
      </div>
    </section>
  </q-page>
</template>
<script setup>
import { getProduct } from "src/services/productService";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import WProductCard from "src/components/WProductCard.vue";
import { useCategoriesStore } from "src/stores/categoriesStore";

const DEFAULT_PAGINATION = {
  page: 1,
  perPage: 5,
  maxPages: 5,
};

const route = useRoute();
const categoriesStore = useCategoriesStore();

const products = ref(null);

const pagination = ref(DEFAULT_PAGINATION);

const isProductsLoading = ref(true);

async function fetchProducts() {
  isProductsLoading.value = true;

  const startRow = (pagination.value.page - 1) * pagination.value.perPage;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  const response = await getProduct({
    start: startRow,
    limit: pagination.value.perPage,
    categoryId: categoriesStore.categories.find((category) => {
      return category.name === route.query.category;
    })?.id,
  });
  products.value = response.rows;

  pagination.value.maxPages = response.count / pagination.value.perPage;

  isProductsLoading.value = false;
}

function resetPagination() {
  return null;
}

const isCategoriesLoaded = computed(() => {
  return categoriesStore.categories.length > 0;
});

const isCategoriesNeeded = computed(() => {
  return !!route.query.category;
});

watch(
  () => {
    if (isCategoriesNeeded.value) {
      return [route.query, isCategoriesLoaded.value];
    }
    return route.query;
  },
  async () => {
    if (isCategoriesLoaded.value === false && route.query.category) {
      return;
    }
    resetPagination();

    fetchProducts();
  },
  {
    immediate: true,
  }
);

onMounted(async () => {
  pagination.value = DEFAULT_PAGINATION;
});
</script>
