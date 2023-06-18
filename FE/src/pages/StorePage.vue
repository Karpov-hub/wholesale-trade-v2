<template>
  <q-page class="flex">
    <section class="column col-grow">
      <div class="full-width">
        <w-input
          v-model="search"
          name="search"
          debounce="750"
          dense
          placeholder="Поиск"
          hide-bottom-space
          clearable
        >
          <template #append>
            <q-icon name="search" class="q-ml-xs"></q-icon>
          </template>
        </w-input>
      </div>
      <q-expansion-item
        v-model="isFiltersExpanded"
        icon="perm_identity"
        caption="John Doe"
        class="filters q-my-sm"
        dense
      >
        <template #header>
          <div class="flex flex-center q-item__text">
            <span> Фильтры </span>
          </div>
        </template>
        <q-card>
          <q-card-section class="filters__expanded-content">
            <span class="block text-caption q-mt-md"> Рейтинг </span>
            <q-slider
              v-model="filters.rating"
              dense
              color="orange"
              markers
              marker-labels
              marker-labels-class="text-orange"
              switch-marker-labels-side
              label
              :label-value="`>= ${filters.rating} ⭐`"
              :min="0"
              :max="5"
              @change="acceptRatingFilter()"
            />
            <span class="block text-caption q-mt-md"> Цена </span>
            <q-range
              v-model="filters.price"
              :min="0"
              :max="1000"
              :step="1"
              label
              snap
              :left-label-value="`>= ${filters.price.min} ₽`"
              :right-label-value="`>= ${filters.price.max} ₽`"
              @change="acceptPriceFilter()"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div
        v-if="products?.length === 0"
        class="flex flex-center col-grow text-h6"
      >
        По вашему запросу ничего не найдено 😢
      </div>

      <!-- products grid -->
      <div v-if="products?.length > 0" class="row q-col-gutter-md">
        <!-- product card -->
        <div
          v-for="(product, index) in products"
          :key="index"
          class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1"
        >
          <w-product-card :model-value="product" class="full-height">
            {{ product.name }}
          </w-product-card>
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

const isFiltersExpanded = ref(false);

const pagination = ref(DEFAULT_PAGINATION);

const isProductsLoading = ref(true);

const search = ref(null);
const filters = ref({
  rating: 0,
  acceptedRating: 0,
  price: {
    min: 0,
    max: 1000,
  },
  acceptedPrice: {
    min: 0,
    max: 50000,
  },
});

function acceptPriceFilter() {
  filters.value.acceptedPrice = filters.value.price;
}
function acceptRatingFilter() {
  filters.value.acceptedRating = filters.value.rating;
}

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
    name: search.value,
    categoryId: categoriesStore.categories.find((category) => {
      return category.name === route.query.category;
    })?.id,
    rating: filters.value.acceptedRating,
    priceMin: filters.value.acceptedPrice.min,
    priceMax: filters.value.acceptedPrice.max,
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
      return [
        route.query,
        isCategoriesLoaded.value,
        search.value,
        filters.value.acceptedRating,
        filters.value.acceptedPrice,
      ];
    }
    return [
      route.query,
      search.value,
      filters.value.acceptedRating,
      filters.value.acceptedPrice,
    ];
  },
  async () => {
    console.log("isCategoriesNeeded", isCategoriesNeeded.value);
    console.log("isCategoriesLoaded", isCategoriesLoaded.value);
    if (isCategoriesLoaded.value === false && route.query.category) {
      return;
    }
    resetPagination();
    fetchProducts();
    console.log("called");
  },
  {
    immediate: true,
  }
);

onMounted(async () => {
  pagination.value = DEFAULT_PAGINATION;
});
</script>
<style lang="scss" scoped>
.filters {
  :deep(.q-item__text) {
    margin-left: auto;
  }
  :deep(.q-item__section--side) {
    margin-right: auto;
    margin-left: 4px;
  }
  :deep(.q-item) {
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
  :deep(.filters__expanded-content) {
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }
  &.q-expansion-item--expanded {
    :deep(.q-item) {
      border-bottom: none;
    }
  }
}
</style>
