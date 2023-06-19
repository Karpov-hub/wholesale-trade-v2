<template>
  <div v-if="!loadingStore.isAppLoading">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useLoadingStore } from "src/stores/loadingStore";
import { useUserStore } from "src/stores/userStore";
import { useQuasar, QSpinnerGears } from "quasar";
import { useShoppingCartStore } from "./stores/shoppingCartStore";
import { useFavoritesStore } from "./stores/favoritesStore";

const loadingStore = useLoadingStore();
const userStore = useUserStore();
const shoppingCartStore = useShoppingCartStore();
const favoritesStore = useFavoritesStore();

const $q = useQuasar();

async function initializeApp() {
  loadingStore.isAppLoading = true;

  $q.loading.show({
    spinner: QSpinnerGears,
    spinnerColor: "primary",
    messageColor: "black",
    backgroundColor: "white",
    message: "Загрузка, пожалуйста подождите...",
  });

  // ✅ Fetches user profile from the server if founds session token
  const sessionToken = localStorage.getItem("sessionToken");
  if (sessionToken) {
    await userStore.fetchUserProfile();
  }

  await shoppingCartStore.fetchShoppingCart();
  await favoritesStore.fetchFavoriteProducts();

  loadingStore.isAppLoading = false;
  $q.loading.hide();
}

onMounted(async () => {
  initializeApp();
});
</script>
