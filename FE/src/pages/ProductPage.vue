<template>
  <q-page>
    <div v-if="productDetails && isProductDetailsLoading === false">
      <w-card class="row justify-center full-width">
        <!-- photos -->
        <div class="col-xs-12 col-sm-6">
          <q-carousel
            v-model="currentImageTab"
            control-color="white"
            control-text-color="black"
            control-type="push"
            animated
            navigation
            infinite
            :autoplay="false"
            arrows
            transition-prev="slide-right"
            transition-next="slide-left"
            style="height: 400px"
            @mouseenter="carouselAutoplay = false"
            @mouseleave="carouselAutoplay = true"
          >
            <q-carousel-slide
              v-for="(image, index) in productDetails.images"
              :key="index"
              :name="image.id"
              :img-src="image.link"
              class="carousel-image"
            >
            </q-carousel-slide>
          </q-carousel>

          <!-- <q-tab-panels
            v-model="currentImageTab"
            animated
            swipeable
            infinite
            class="bordered rounded-borders"
          >
            <q-tab-panel
              v-for="(image, index) in productDetails.images"
              :key="index"
              :name="index"
              class="flex flex-center"
            >

            </q-tab-panel>
          </q-tab-panels> -->
        </div>

        <!-- data -->
        <q-card-section class="col-xs-12 col-sm-6 column">
          <div
            class="full-width bordered rounded-borders text-body1 text-weight-bold q-pa-sm"
          >
            <span class="q-mr-sm">
              {{ `${productDetails.price} $` }}
            </span>
            <span class="text-grey-9 text-strike" style="font-size: 0.85em">
              {{ `${productWithoutDiscount} $` }}
            </span>
          </div>
          <div class="text-weight-medium q-mt-sm text-h6 text-weight-medium">
            {{ productDetails.name }}
          </div>

          <div class="row q-gutter-xs no-wrap overflow-x-scroll">
            <div class="text-body2 bordered rounded-borders q-pa-xs col-auto">
              <div>
                {{ `На складе: ${productDetails.productQuantity}` }}
              </div>
              <div class="text-grey-9">единиц товара</div>
            </div>

            <div
              class="text-body2 bordered rounded-borders q-pa-xs col-auto cursor-pointer"
            >
              <div>
                {{ `${productDetails.reviews.length} отзывов` }}
              </div>
              <div class="text-grey-9">
                <q-rating
                  v-model="productDetails.rating"
                  readonly
                  size="12px"
                  color="yellow"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- desc -->
        <q-card-section class="col-xs-12 col-sm-12">
          {{ productDetails.description }}
        </q-card-section>
      </w-card>
    </div>
    <div v-else class="flex flex-center">
      <q-spinner-dots size="50px" color="primary" />
    </div>
  </q-page>
</template>
<script setup>
import { getProductDetails } from "src/services/productService";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const currentImageTab = ref(1);
const route = useRoute();
const productDetails = ref(null);
const isProductDetailsLoading = ref(false);

const carouselAutoplay = ref(true);

const productWithoutDiscount = computed(() => {
  return Math.ceil(
    (productDetails.value.price / 100) * productDetails.value.discount +
      productDetails.value.price
  );
});

async function fetchProductDetails() {
  try {
    isProductDetailsLoading.value = true;
    const response = await getProductDetails(route.query.id);

    productDetails.value = {
      ...response.product,
      images: response.product.image.map((val, index) => {
        return {
          id: index + 1,
          link: val,
        };
      }),
    };
    delete productDetails.value.image;
  } finally {
    isProductDetailsLoading.value = false;
  }
}

onMounted(() => {
  fetchProductDetails();
});
</script>
<style lang="scss" scoped>
.carousel-image {
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
