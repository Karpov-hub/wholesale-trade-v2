import { defineStore } from "pinia";
import {
  getProductShoppingCartList,
  addProductShoppingCart,
  deleteProductShoppingCart,
} from "src/services/userShoppingCart";
import { useUserStore } from "./userStore";

export const useShoppingCartStore = defineStore("shoppingCart", {
  state: () => {
    return {
      shoppingCart: [],
    };
  },
  getters: {},
  actions: {
    async fetchShoppingCart() {
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        this.fetchShoppingCartLocal();
        return;
      }

      const response = await getProductShoppingCartList({
        start: 0,
        limit: 50000,
      });

      this.shoppingCart = response.rows;
    },

    fetchShoppingCartLocal() {
      const shoppingCartLocal = JSON.parse(
        localStorage.getItem("shoppingCart")
      );

      this.shoppingCart = shoppingCartLocal || [];
    },

    async addToShoppingCart(product, quantity) {
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        this.addToShoppingCartLocal(product, quantity);
        return;
      }
      await addProductShoppingCart(product.id, quantity);
    },

    addToShoppingCartLocal(product, quantity) {
      let shoppingCartLocal = JSON.parse(localStorage.getItem("shoppingCart"));

      if (!shoppingCartLocal) {
        shoppingCartLocal = [];
      }

      shoppingCartLocal.push({ ...product, productQuantity: quantity });

      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartLocal));
    },

    async removeFromShoppingCart(productId) {
      const userStore = useUserStore();
      if (!userStore.isAuthenticated) {
        this.removeFromShoppingCartLocal(productId);
        return;
      }

      await deleteProductShoppingCart(productId);
    },

    removeFromShoppingCartLocal(productId) {
      const shoppingCartLocal = JSON.parse(
        localStorage.getItem("shoppingCart")
      );

      const newShoppingCartLocal = shoppingCartLocal.filter((value) => {
        return value.id !== productId;
      });

      localStorage.setItem(
        "shoppingCart",
        JSON.stringify(newShoppingCartLocal)
      );
    },
  },
});
