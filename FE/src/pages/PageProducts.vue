<template>
  <q-page class="container q-py-xl q-px-md">
    <q-btn
      v-if="route.query.category || route.query.name"
      class="q-mb-xl"
      color="blue"
      rounded
      unelevated
      outline
      icon="arrow_back"
      label="Назад"
      @click="router.push({ name: 'products' })"
    ></q-btn>
    <div class="q-mb-md text-h4">
      {{
        route.query.category
          ? route.query.category == "Скидки"
            ? "Товары по скидке"
            : route.query.category
          : "Все товары"
      }}
    </div>
    <q-separator class="q-mb-lg"></q-separator>
    <div
      class="no-wrap"
      :class="{ row: $q.screen.gt.sm, column: $q.screen.lt.md }"
    >
      <div class="col-5 q-pr-md column">
        <div class="q-mb-xl text-h5">Фильтры</div>
        <div class="row q-gutter-md items-center">
          <div>Цена:</div>
          <q-range
            v-model="state.filters.price"
            class="col-grow"
            label-always
            snap
            markers
            :min="state.priceMin"
            :max="state.priceMax"
          ></q-range>
        </div>
        <div class="q-mt-lg q-gutter-md row justify-between items-center">
          <div>Рейтинг:</div>
          <q-select
            v-model="state.filters.rating"
            :options="state.ratings"
            menu
            class="col-2"
            dense
            filled
          ></q-select>
          <q-rating
            v-model="state.filters.rating"
            size="30px"
            color="yellow"
          ></q-rating>
        </div>
        <q-separator class="q-mt-lg"></q-separator>
        <div class="q-mt-sm q-gutter-md row justify-end">
          <q-btn :disable="!isFiltered" color="red" @click="resetFilters"
            >Отменить</q-btn
          >
          <q-btn :disable="isFiltered" color="green" @click="applyFilters"
            >Применить</q-btn
          >
        </div>
      </div>
      <q-separator class="q-mx-xs" vertical />
      <div
        v-if="state.products.length == 0"
        class="col-grow row justify-center items-center"
        :class="{ 'q-mt-xl': $q.screen.lt.md }"
      >
        <div class="text-h6">Товары не найдены :(</div>
      </div>
      <div
        v-else
        class="col-grow column"
        :class="{ 'q-mt-xl': $q.screen.lt.md }"
      >
        <q-card
          v-for="product in state.products"
          :key="product"
          class="q-ma-sm q-pa-md elevation cursor-pointer"
        >
          <q-badge
            v-if="product.discount > 0"
            class="glossy text-h6"
            color="purple-5"
            floating
            >Скидка! {{ product.discount }}%</q-badge
          >
          <div
            class="q-mt-md row"
            :class="{
              'items-center': $q.screen.lt.md,
              column: $q.screen.lt.sm,
            }"
          >
            <img
              src="../assets/img/placeholder.png"
              style="width: 200px"
              @click="showProductCard(product)"
            />
            <q-separator v-if="$q.screen.gt.sm" class="q-mx-md" vertical />
            <div class="col-grow column q-gutter-sm">
              <div class="text-h6">{{ product.name }}</div>
              <div v-if="product.discount > 0" class="row items-center">
                <div>Стоимость:</div>
                <div class="q-ml-xs q-px-xs text-strike">
                  {{ product.price }}
                </div>
                <div class="q-ml-xs q-px-xs bg-purple-3">
                  {{
                    (
                      product.price -
                      product.price * (product.discount / 100)
                    ).toFixed(2)
                  }}
                </div>
              </div>
              <div v-else>Стоимость: {{ product.price }}</div>
              <div>Количество: {{ product.product_quantity }}</div>
              <div class="row items-center no-wrap">
                <div>{{ product.rating }}</div>
                <q-separator class="q-mx-sm" vertical></q-separator>
                <q-rating
                  v-model="product.rating"
                  readonly
                  size="25px"
                  color="yellow"
                ></q-rating>
              </div>
              <div
                class="q-mt-xl row justify-end"
                :class="{ 'justify-center': $q.screen.lt.sm }"
              >
                <q-btn
                  :disabled="product.quantity == 0"
                  color="green"
                  @click="showProductCard(product)"
                  >Добавить в корзину</q-btn
                >
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="isShownModalProduct">
      <q-card class="q-pa-xs" style="width: 600px">
        <q-card-section>
          <div class="row items-start justify-between">
            <img
              src="../assets/img/placeholder.png"
              style="max-width: 250px; max-height: 250px"
            />
            <q-btn
              round
              flat
              icon="close"
              @click="isShownModalProduct = false"
            ></q-btn>
          </div>

          <q-separator class="q-mx-md" vertical />
          <q-card-section class="q-pt-none"
            ><div class="row items-center">
              <div class="col text-h6 ellipsis">
                {{ state.selectedProduct.name }}
              </div>
              <div>{{ state.selectedProduct.price }}</div>
            </div>
            <q-rating
              v-model="state.selectedProduct.rating"
              :max="5.0"
              size="32px"
            />
          </q-card-section>
          <q-card-section>
            <div class="text-caption text-grey">
              {{ state.selectedProduct.description }}
            </div>
          </q-card-section>
          <div class="q-mb-md row justify-between">
            <div class="col-grow row q-gutter-sm items-center">
              <div>Количество:</div>
              <q-input
                v-model.number="state.quantity"
                class="col-6"
                min="1"
                :max="state.selectedProduct.product_quantity"
                outlined
                rounded
                dense
                type="number"
              ></q-input>
            </div>
            <q-btn
              :disable="state.selectedProduct.quantity == 0"
              class="col-grow"
              :class="{
                'q-mt-lg': $q.screen.lt.sm,
                row: $q.screen.lt.sm,
                'justify-center': $q.screen.lt.sm,
              }"
              color="green"
              label="Добавить в корзину"
              @click="addProductToCart(state.selectedProduct)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { Loading, Notify } from "quasar";
import { getCategories } from "src/services/service-category";
import {
  addProductShoppingCartList,
  getProductShoppingCartList,
} from "src/services/service-choppingCart";
import { getProductDetails } from "src/services/service-products";
import { getProducts } from "src/services/service-products";
import { reactive, ref, watch, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { getData } from "src/services/service-profile";

const router = useRouter();
const route = useRoute();

const storeCart = inject("storeCart");

const isShownModalProduct = ref(false);
const isFiltered = ref(false);

const state = reactive({
  filters: {
    rating: 0,
    price: { min: -Infinity, max: Infinity },
  },
  quantity: 1,
  ratings: [0, 1, 2, 3, 4, 5],
  priceMin: -Infinity,
  priceMax: Infinity,
  selectedProduct: {},
  products: [],
});
onMounted(async () => {
  if (route.query.name) {
    Loading.show();
    const res = await getProducts({ start: 0, name: route.query.name });
    if (res.success) {
      state.products = res.rows;
      calculatePriceRange();
    } else state.products = [];
    Loading.hide();
    return;
  }
  Loading.show();
  if (!route.query.category) {
    const res = await getProducts({ start: 0 });
    state.products = res.rows;
    calculatePriceRange();
    Loading.hide();
    return;
  }
  if (route.query.category == "Скидки") {
    const res = await getProducts({ start: 0 });
    state.products = res.rows.filter((product) => product.discount > 0);
    calculatePriceRange();
    Loading.hide();
    return;
  }

  const res = await getCategories();

  for (const category of res.rows) {
    if (category.name == route.query.category) {
      const res = await getProducts({ category_id: category.id });
      state.products = res.rows;
    }
  }
  calculatePriceRange();
  Loading.hide();
});

watch(async () => {
  if (route.query.name) return;
  Loading.show();
  if (!route.query.category) {
    const res = await getProducts({ start: 0 });
    state.products = res.rows;
    calculatePriceRange();
    Loading.hide();
    return;
  }
  if (route.query.category == "Скидки") {
    const res = await getProducts({ start: 0 });
    state.products = res.rows.filter((product) => product.discount > 0);
    calculatePriceRange();
    Loading.hide();
    return;
  }

  const res = await getCategories();

  for (const category of res.rows) {
    if (category.name == route.query.category) {
      const res = await getProducts({ category_id: category.id });
      state.products = res.rows;
    }
  }
  calculatePriceRange();
  Loading.hide();
});
watch(async () => {
  Loading.show();
  const res = await getProducts({ start: 0, name: route.query.name });
  if (res.success) {
    state.products = res.rows;
    calculatePriceRange();
  } else state.products = [];
  Loading.hide();
});

function calculatePriceRange() {
  let min = Infinity;
  let max = -Infinity;

  for (const product of state.products) {
    const price = product.price;
    if (parseFloat(price) < min) {
      min = price;
    }
    if (parseFloat(price) > max) {
      max = price;
    }
  }

  state.priceMin = parseFloat(min);
  state.priceMax = parseFloat(max);
  state.filters.price.min = parseFloat(min);
  state.filters.price.max = parseFloat(max);
}
async function applyFilters() {
  Loading.show();
  if (!route.query.category) {
    const res = await getProducts({
      start: 0,
      price_min: state.filters.price.min.toString(),
      price_max: state.filters.price.max.toString(),
      rating: state.filters.rating,
    });
    state.products = res.rows;
    calculatePriceRange();
    isFiltered.value = true;
    Loading.hide();
    return;
  }
  if (route.query.category == "Скидки") {
    const res = await getProducts({
      start: 0,
      price_min: state.filters.price.min.toString(),
      price_max: state.filters.price.max.toString(),
      rating: state.filters.rating,
    });
    state.products = res.rows.filter((product) => product.discount > 0);
    calculatePriceRange();
    isFiltered.value = true;
    Loading.hide();
    return;
  }

  const res = await getCategories();

  for (const category of res.rows) {
    if (category.name == route.query.category) {
      const res = await getProducts({
        category_id: category.id,
        price_min: state.filters.price.min.toString(),
        price_max: state.filters.price.max.toString(),
        rating: state.filters.rating,
      });
      state.products = res.rows;
    }
  }
  calculatePriceRange();
  isFiltered.value = true;
  Loading.hide();
}
async function resetFilters() {
  Loading.show();
  if (!route.query.category) {
    const res = await getProducts({ start: 0 });
    state.products = res.rows;
    calculatePriceRange();
    isFiltered.value = false;
    Loading.hide();
    return;
  }
  if (route.query.category == "Скидки") {
    const res = await getProducts({ start: 0 });
    state.products = res.rows.filter((product) => product.discount > 0);
    calculatePriceRange();
    isFiltered.value = false;
    Loading.hide();
    return;
  }

  const res = await getCategories();

  for (const category of res.rows) {
    if (category.name == route.query.category) {
      const res = await getProducts({ category_id: category.id });
      state.products = res.rows;
    }
  }
  calculatePriceRange();
  state.filters.rating = 0;
  isFiltered.value = false;
  Loading.hide();
}
async function showProductCard(product) {
  Loading.show();
  const res = await getProductDetails({ product_id: product.id });
  if (!res.success) {
    Notify.create({
      message: "Произошла ошибка",
      icon: "error",
      color: "negative",
      position: "bottom",
    });
    return;
  }
  state.selectedProduct = res.product;
  isShownModalProduct.value = true;
  Loading.hide();
}
async function addProductToCart(product) {
  Loading.show();

  product.product_quantity = state.quantity;
  storeCart.addProduct(product);
  state.cartCount = storeCart.countProduct();
  state.quantity = 1;
  isShownModalProduct.value = false;

  if (localStorage.getItem("token") == "") {
    Loading.hide();
    return;
  }

  await addProductShoppingCartList({
    session_token: localStorage.getItem("token"),
    id_prod: product.id,
    quantity: state.quantity,
  });
  await getProductShoppingCartList({
    session_token: localStorage.getItem("token"),
    start: 0,
  });

  state.quantity = 1;
  isShownModalProduct.value = false;
  Loading.hide();
}
</script>

<style lang="scss" scoped></style>
