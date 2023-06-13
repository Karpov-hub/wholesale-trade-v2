const routes = [
  {
    redirect: "store",
    path: "/",
    component: () => import("src/layouts/DefaultLayout.vue"),
    children: [
      {
        name: "store",
        path: "",
        component: () => import("src/pages/StorePage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("src/layouts/AuthLayout.vue"),
    children: [
      {
        name: "signin",
        path: "signin",
        component: () => import("src/pages/SigninPage.vue"),
      },
      {
        name: "signup",
        path: "signup",
        component: () => import("src/pages/SignupPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
