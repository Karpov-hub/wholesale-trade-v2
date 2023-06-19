<template>
  <q-page class="flex">
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
        </div>

        <!-- data -->
        <q-card-section class="col-xs-12 col-sm-6 column">
          <div
            class="full-width flex flex-nowrap bordered rounded-borders text-body1 text-weight-bold q-pa-sm"
          >
            <span class="q-mr-sm">
              {{ `${productDetails.price} $` }}
            </span>
            <span
              v-if="productDetails.discount"
              class="text-grey-9 text-strike"
              style="font-size: 0.85em"
            >
              {{ `${productWithoutDiscount} $` }}
            </span>
            <span
              v-if="productDetails.discount"
              class="block q-ml-auto text-green"
            >
              {{ `${productDetails.discount}% Off!` }}
            </span>
          </div>
          <div class="text-weight-medium text-h6 text-weight-medium q-mt-sm">
            {{ productDetails.name }}
          </div>

          <!-- cards -->
          <div class="row q-gutter-xs no-wrap overflow-x-scroll q-mt-sm">
            <!-- quantity -->
            <div class="text-body2 bordered rounded-borders q-pa-xs col-auto">
              <div>
                {{ `На складе: ${productDetails.productQuantity}` }}
              </div>
              <div class="text-grey-9">единиц товара</div>
            </div>
            <!-- rating and reviews -->
            <div
              class="text-body2 bordered rounded-borders q-pa-xs col-auto cursor-pointer"
              @click="scrollToReviewsSection()"
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

          <!-- cart & favorites & share -->
          <div class="row q-mt-sm q-gutter-sm items-center">
            <q-form class="flex">
              <q-input
                v-model="quantity"
                class="quantity-input q-mr-xs"
                dense
                outlined
                type="text"
                label="Кол-во"
              />

              <q-btn
                color="primary"
                :icon="
                  isInsideShoppingCard
                    ? 'remove_shopping_cart'
                    : 'shopping_cart'
                "
                :loading="isShoppingCartBtnLoading"
                :label="isInsideShoppingCard ? 'Убрать' : 'В корзину'"
                @click="
                  isInsideShoppingCard
                    ? removeFromShoppingCart()
                    : addToShoppingCart()
                "
              />
            </q-form>
            <div>
              <q-btn
                round
                outline
                :loading="isFavoritesBtnLoading"
                :color="isFavorite ? 'red' : 'black'"
                icon="favorite"
                size="0.85em"
                @click="isFavorite ? removeFromFavorites() : addToFavorites()"
              />
            </div>
          </div>
        </q-card-section>

        <!-- desc -->
        <q-card-section class="col-xs-12">
          {{ productDetails.description }}
        </q-card-section>

        <q-separator class="full-width" />

        <!-- reviews section -->
        <q-card-section id="reviewsSection" class="col-xs-12">
          <q-infinite-scroll
            :offset="250"
            :disable="isReviewsScrollDisabled"
            @load="onLoad"
          >
            <template #loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
            <div class="text-h5 q-mb-sm">Отзывы</div>
            <div v-if="reviewsToShow.length === 0">
              Похоже на этот товар еще нет отзывов, будьте первыми! 😉
            </div>
            <template v-else>
              <ProductReview
                v-for="(review, index) in reviewsToShow"
                :key="index"
                class="caption"
                :review="review"
              />
            </template>
          </q-infinite-scroll>
        </q-card-section>
      </w-card>
    </div>
    <div v-else class="flex flex-center col-grow">
      <q-spinner-dots size="50px" color="primary" />
    </div>
  </q-page>
</template>
<script setup>
import { getProductDetails } from "src/services/productService";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import ProductReview from "src/views/ProductReview.vue";
import { useFavoritesStore } from "src/stores/favoritesStore";
import { useShoppingCartStore } from "src/stores/shoppingCartStore";

const favoritesStore = useFavoritesStore();
const shoppingCartStore = useShoppingCartStore();

const reviewsToShow = ref([]);

let reviews = [];
const currentImageTab = ref(1);
const route = useRoute();
const productDetails = ref(null);
const isProductDetailsLoading = ref(false);
const carouselAutoplay = ref(true);

const quantity = ref(1);

const isFavorite = computed(() => {
  const productInsideFavorites = favoritesStore.favorites.find((product) => {
    return product.id === productDetails.value.id;
  });

  if (productInsideFavorites) {
    return true;
  }
  return false;
});

const isInsideShoppingCard = computed(() => {
  const productInsideCard = shoppingCartStore.shoppingCart.find((product) => {
    return product.id === productDetails.value.id;
  });

  if (productInsideCard) {
    return true;
  }
  return false;
});

const isShoppingCartBtnLoading = ref(false);
const isFavoritesBtnLoading = ref(false);

const pagination = {
  start: 0,
  limit: 10,
};

const isReviewsScrollDisabled = computed(() => {
  return reviewsToShow.value.length === reviews.length;
});

function loadMoreReviews() {
  const reviewsToLoad = reviews.slice(
    pagination.start,
    pagination.start + pagination.limit
  );

  reviewsToShow.value.push(...reviewsToLoad);

  pagination.start += pagination.limit;
}

function onLoad(index, done) {
  setTimeout(() => {
    loadMoreReviews();
    done();
  }, 100);
}

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

    reviews = response.product.reviews.map((review) => {
      return {
        ...review,
        value: Math.ceil(review.value / 2),
      };
    });

    loadMoreReviews();
    await favoritesStore.fetchFavoriteProducts();
  } finally {
    isProductDetailsLoading.value = false;
  }
}

function scrollToReviewsSection() {
  document.getElementById("reviewsSection").scrollIntoView({
    behavior: "smooth",
  });
}

async function addToFavorites() {
  try {
    isFavoritesBtnLoading.value = true;
    await favoritesStore.addToFavorites(productDetails.value);
    await favoritesStore.fetchFavoriteProducts();
  } finally {
    isFavoritesBtnLoading.value = false;
  }
}
async function removeFromFavorites() {
  try {
    isFavoritesBtnLoading.value = true;
    await favoritesStore.removeFromFavorites(productDetails.value.id);
    await favoritesStore.fetchFavoriteProducts();
  } finally {
    isFavoritesBtnLoading.value = false;
  }
}

async function addToShoppingCart() {
  try {
    isShoppingCartBtnLoading.value = true;
    await shoppingCartStore.addToShoppingCart(
      productDetails.value,
      quantity.value
    );
    await shoppingCartStore.fetchShoppingCart();
  } finally {
    isShoppingCartBtnLoading.value = false;
  }
}
async function removeFromShoppingCart() {
  try {
    isShoppingCartBtnLoading.value = true;
    await shoppingCartStore.removeFromShoppingCart(productDetails.value.id);
    await shoppingCartStore.fetchShoppingCart();
  } finally {
    isShoppingCartBtnLoading.value = false;
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

.quantity-input {
  width: 70px;
}
</style>
