import { defineStore } from "pinia";

export const useStoreCart = defineStore("cart", {
  state: () => ({
    cartProducts: [],
    count: 0,
    total_price: 0,
  }),
  actions: {
    clearCart() {
      this.cartProducts = [];
      this.count = 0;
      this.totalPrice = 0;
    },
    getProducts() {
      return {
        rows: this.cartProducts,
        count: this.count,
        total_price: this.total_price,
      };
    },
    addProduct(product) {
      const existingProduct = this.cartProducts.find(
        (p) => p.id === product.id
      );
      if (existingProduct) {
        existingProduct.product_quantity += product.product_quantity;
      } else {
        this.cartProducts.push(product);
      }
      this.count = this.cartProducts.length;
      this.total_price = this.cartProducts.reduce((total, product) => {
        return total + product.product_quantity * product.price;
      }, 0);
    },
    removeProduct(product) {
      this.cartProducts.splice(product, 1);
      this.count = this.cartProducts.length;

      this.total_price = this.cartProducts.reduce((total, product) => {
        return total + product.product_quantity * product.price;
      }, 0);
    },
    countProduct() {
      return this.cartProducts.length;
    },
  },
});
