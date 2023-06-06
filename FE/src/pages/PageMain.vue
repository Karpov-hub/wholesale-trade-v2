<template>
  <q-page class="flex justify-center">
    <div class="q-pt-xl container full-width">
      <div class="text-h4 text-center">Популярные товары дня</div>
      <div v-if="$q.screen.lt.md" class="text-center">
        Можно листать пальцем
      </div>
      <q-carousel
        v-model="slide"
        class="q-pt-md"
        arrows
        :navigation="$q.screen.gt.xs"
        :swipeable="$q.screen.lt.md"
        control-color="deep-purple"
        control-type="filled"
        height="475px"
      >
        <template
          v-for="(slideProducts, index) in slideProductsChunks"
          :key="index"
        >
          <q-carousel-slide
            :name="index"
            class="q-gutter-xl row justify-center"
            style="margin-left: -24px"
          >
            <q-card
              class="card-small"
              v-for="product in slideProducts"
              :key="product.id"
            >
              <q-card-section>
                <q-img
                  src="../assets/img/placeholder.png"
                  :alt="product.name"
                />
              </q-card-section>
              <q-card-section>
                <div>{{ product.name }}</div>
                <div>{{ product.price }}</div>
              </q-card-section>
              <q-card-section>
                <q-btn
                  color="deep-purple"
                  rounded
                  label="Добавить в корзину"
                ></q-btn>
              </q-card-section>
            </q-card>
          </q-carousel-slide>
        </template>
      </q-carousel>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();

const slide = ref(1);
const products = [
  {
    id: 1,
    name: "Товар 1",
    image: "url-к-изображению-1",
    price: "100 руб.",
  },
  {
    id: 2,
    name: "Товар 2",
    image: "url-к-изображению-2",
    price: "200 руб.",
  },
  {
    id: 3,
    name: "Товар 3",
    image: "url-к-изображению-3",
    price: "300 руб.",
  },
  {
    id: 4,
    name: "Товар 4",
    image: "url-к-изображению-4",
    price: "400 руб.",
  },
  {
    id: 5,
    name: "Товар 5",
    image: "url-к-изображению-5",
    price: "500 руб.",
  },
  {
    id: 6,
    name: "Товар 6",
    image: "url-к-изображению-6",
    price: "600 руб.",
  },
  {
    id: 7,
    name: "Товар 7",
    image: "url-к-изображению-7",
    price: "700 руб.",
  },
  {
    id: 8,
    name: "Товар 8",
    image: "url-к-изображению-8",
    price: "800 руб.",
  },
  {
    id: 9,
    name: "Товар 9",
    image: "url-к-изображению-9",
    price: "900 руб.",
  },
  {
    id: 10,
    name: "Товар 10",
    image: "url-к-изображению-10",
    price: "1000 руб.",
  },
  {
    id: 11,
    name: "Товар 11",
    image: "url-к-изображению-11",
    price: "1100 руб.",
  },
  {
    id: 12,
    name: "Товар 12",
    image: "url-к-изображению-12",
    price: "1200 руб.",
  },
  {
    id: 13,
    name: "Товар 13",
    image: "url-к-изображению-13",
    price: "1300 руб.",
  },
  {
    id: 14,
    name: "Товар 14",
    image: "url-к-изображению-14",
    price: "1400 руб.",
  },
  {
    id: 15,
    name: "Товар 15",
    image: "url-к-изображению-15",
    price: "1500 руб.",
  },
];
const slideProductsChunks = computed(() => {
  let chunkSize = 4;
  if ($q.screen.md) chunkSize = 3;
  if ($q.screen.sm) chunkSize = 2;
  if ($q.screen.xs) chunkSize = 1;
  const chunks = [];

  for (let i = 0; i < products.length; i += chunkSize) {
    chunks.push(products.slice(i, i + chunkSize));
  }

  return chunks;
});
</script>
