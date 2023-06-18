import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { useUserStore } from "src/stores/userStore";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route((/* { store, ssrContext } */) => {
  let createHistory = null;

  if (process.env.SERVER) {
    createHistory = createMemoryHistory;
  } else if (process.env.VUE_ROUTER_MODE === "history") {
    createHistory = createWebHistory;
  } else {
    createHistory = createWebHashHistory;
  }

  const Router = createRouter({
    scrollBehavior: () => {
      return { left: 0, top: 0 };
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // ✅ Fetches user profile from the server if founds session token
  Router.beforeEach(async () => {
    const userStore = useUserStore();

    const sessionToken = localStorage.getItem("sessionToken");

    if (sessionToken) {
      await userStore.fetchUserProfile();
    }

    return true;
  });

  // ❗️ Avoid redirecting to auth pages if user is already authenticated
  Router.beforeEach((to) => {
    const userStore = useUserStore();

    if (userStore.isAuthenticated && ["signin", "signup"].includes(to.name)) {
      return false;
    }

    return true;
  });

  Router.beforeEach((to) => {
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
      // TODO: add ability to remember path
      return { name: "signin" };
    }

    return true;
  });

  return Router;
});
