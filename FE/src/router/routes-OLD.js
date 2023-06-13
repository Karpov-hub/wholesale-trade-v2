const routes = [
  {
    redirect: "products",
    path: "/",
    component: () => import("src/layouts/LayoutCabinet.vue"),
    children: [
      {
        name: "main",
        path: "main",
        component: () => import("src/pages/PageMain.vue"),
      },
      {
        name: "products",
        path: "products",
        component: () => import("src/pages/PageProducts.vue"),
      },
      {
        name: "order",
        path: "order",
        component: () => import("src/pages/PageOrder.vue"),
      },
      {
        name: "chat",
        path: "chat",
        component: () => import("src/pages/PageChat.vue"),
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
