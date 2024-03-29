import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      counter: 0,
    };
  },
  getters: {
    doubleCount: (state) => {
      return state.counter * 2;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
