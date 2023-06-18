import { defineStore } from "pinia";
import { getCategories } from "src/services/categoryService";

export const useCategoriesStore = defineStore("counter", {
  state: () => {
    return {
      categories: [],
    };
  },
  getters: {},
  actions: {
    async fetchCategories() {
      const response = await getCategories();

      if (!response.success) {
        this.categories = [];
      }
      this.categories = response.rows;
    },
  },
});
