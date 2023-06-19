<template>
  <q-page class="column">
    <div class="text-h5 q-mb-sm">Избранное ❤️</div>

    <div
      v-if="isFavoritesEmpty"
      class="flex flex-center col-grow text-weight-medium text-center"
    >
      Список избранного пуст 💔
    </div>
    <div v-else>
      <w-card v-for="(product, index) in favoritesStore.favorites" :key="index">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-auto col-shrink flex flex-center">
            <q-img
              :src="product.images?.[0]?.link || JSON.parse(product.image)[0]"
              :ratio="3 / 4"
              spinner-color="primary"
              spinner-size="82px"
              width="140px"
              style="min-width: 140px"
            />
          </div>
          <div class="col-xs-12 col-sm-auto col-sm-6">
            <div class="text-weight-medium">
              {{ product.name }}
            </div>
            <div class="text-caption">
              {{ product.description }}
            </div>
          </div>
          <div class="col-sm-auto q-ml-auto column justify-between" column>
            <q-btn
              rounded
              outline
              :loading="loadingRemoveBtns.includes(product.id)"
              color="red"
              icon="favorite"
              size="0.85em"
              label="Убрать"
              @click="removeFromFavorites(product.id)"
            />
          </div>
        </q-card-section>
      </w-card>
      <div class="q-mt-sm flex justify-end">
        <w-btn>Купить</w-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useFavoritesStore } from "src/stores/favoritesStore";
import { computed, ref } from "vue";

const favoritesStore = useFavoritesStore();

const loadingRemoveBtns = ref([]);

async function removeFromFavorites(productId) {
  try {
    loadingRemoveBtns.value.push(productId);
    await favoritesStore.removeFromFavorites(productId);
    await favoritesStore.fetchFavoriteProducts();
  } finally {
    loadingRemoveBtns.value = loadingRemoveBtns.value.filter((value) => {
      return value !== productId;
    });
  }
}

const isFavoritesEmpty = computed(() => {
  return favoritesStore.favorites.length === 0;
});
</script>
