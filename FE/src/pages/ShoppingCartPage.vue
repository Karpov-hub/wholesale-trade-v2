<template>
  <q-page class="flex">
    <div class="text-h5 q-mb-sm">Корзина <q-icon name="shopping_cart" /></div>

    <div
      v-if="isShoppingCartEmpty"
      class="flex flex-center col-grow text-weight-medium"
    >
      Корзина пуста, вперед за покупками 🌞
    </div>
    <div v-else>
      <w-card
        v-for="(product, index) in shoppingCartStore.shoppingCart"
        :key="index"
      >
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
            <div>
              {{ `${product.productQuantity} ед.` }}
            </div>
            <q-btn
              class="q-mt-sm"
              outline
              size="sm"
              color="primary"
              icon="remove_shopping_cart"
              label="Убрать"
              :loading="loadingRemoveBtns.includes(product.id)"
              @click="removeFromShoppingCart(product.id)"
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
import { useShoppingCartStore } from "src/stores/shoppingCartStore";
import { ref, computed } from "vue";

const shoppingCartStore = useShoppingCartStore();

const loadingRemoveBtns = ref([]);

async function removeFromShoppingCart(productId) {
  try {
    loadingRemoveBtns.value.push(productId);
    await shoppingCartStore.removeFromShoppingCart(productId);
    await shoppingCartStore.fetchShoppingCart();
  } finally {
    loadingRemoveBtns.value = loadingRemoveBtns.value.filter((value) => {
      return value !== productId;
    });
  }
}

const isShoppingCartEmpty = computed(() => {
  return shoppingCartStore.shoppingCart.length === 0;
});
</script>

<style lang="scss" scoped></style>
