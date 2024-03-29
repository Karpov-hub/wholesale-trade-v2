import { defineStore } from "pinia";
import { getData } from "src/services/userProfileService";
import { logout } from "src/services/authService";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      isAuthenticated: false,
      profile: null,
    };
  },
  getters: {},
  actions: {
    async fetchUserProfile() {
      const response = await getData();

      if (!response.success) {
        return;
      }

      this.profile = response.data;
      this.isAuthenticated = true;
    },
    async logout() {
      const response = await logout();

      if (!response.success) {
        return;
      }

      this.profile = null;
      this.isAuthenticated = false;
    },
  },
});
