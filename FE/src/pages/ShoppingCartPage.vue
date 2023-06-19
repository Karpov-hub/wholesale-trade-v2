<template>
  <q-page>
    <div class="text-h5 q-mb-sm">Корзина <q-icon name="shopping_cart" /></div>

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
        <div class="col-sm-auto q-ml-auto">
          {{ `${product.productQuantity} единиц` }}
        </div>
      </q-card-section>
    </w-card>
    <div class="q-mt-sm flex justify-end">
      <w-btn>Купить</w-btn>
    </div>
  </q-page>
</template>

<script setup>
import { useShoppingCartStore } from "src/stores/shoppingCartStore";

const shoppingCartStore = useShoppingCartStore();
</script>

<style lang="scss" scoped></style>
