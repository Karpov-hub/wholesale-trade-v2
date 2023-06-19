import { defineStore } from "pinia";
import {
  getProductFavoriteList,
  addProductFavorite,
  deleteProductFavorite,
} from "src/services/userFavoriteService";
import { useUserStore } from "./userStore";

export const useFavoritesStore = defineStore("favorites", {
  state: () => {
    return {
      favorites: [],
    };
  },
  getters: {},
  actions: {
    async fetchFavoriteProducts() {
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        this.fetchFavoriteProductsLocal();
        return;
      }

      const response = await getProductFavoriteList({
        start: 0,
        limit: 50000,
      });
      this.favorites = response.rows;
    },

    fetchFavoriteProductsLocal() {
      const favoriteProductsLocal = JSON.parse(
        localStorage.getItem("favorites")
      );

      this.favorites = favoriteProductsLocal || [];
    },

    async addToFavorites(product, quantity) {
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        this.addToFavoritesLocal(product, quantity);
        return;
      }
      await addProductFavorite(product.id);
    },

    addToFavoritesLocal(product) {
      let favorites = JSON.parse(localStorage.getItem("favorites"));

      if (!favorites) {
        favorites = [];
      }

      favorites.push(product);

      localStorage.setItem("favorites", JSON.stringify(favorites));
    },

    async removeFromFavorites(productId) {
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        this.removeFromFavoritesLocal(productId);
        return;
      }

      await deleteProductFavorite(productId);
    },
    removeFromFavoritesLocal(productId) {
      const favoritesLocal = JSON.parse(localStorage.getItem("favorites"));

      const newFavoritesLocal = favoritesLocal.filter((value) => {
        return value.id !== productId;
      });

      localStorage.setItem("favorites", JSON.stringify(newFavoritesLocal));
    },
  },
});
