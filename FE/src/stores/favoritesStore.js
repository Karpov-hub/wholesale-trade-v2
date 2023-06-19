import { defineStore } from "pinia";
import { getProductFavoriteList } from "src/services/userFavoriteService";

export const useFavoritesStore = defineStore("favorites", {
  state: () => {
    return {
      favorites: [],
    };
  },
  getters: {},
  actions: {
    async fetchFavoriteProducts() {
      const response = await getProductFavoriteList({
        start: 0,
        limit: 50000,
      });
      this.favorites = response.data;
    },
  },
});
