const routes = [
  {
    redirect: "products",
    path: "/",
    component: () => {return import("src/layouts/LayoutCabinet.vue")},
    children: [
      {
        name: "main",
        path: "main",
        component: () => {return import("src/pages/PageMain.vue")},
      },
      {
        name: "products",
        path: "products",
        component: () => {return import("src/pages/PageProducts.vue")},
      },
      {
        name: "order",
        path: "order",
        component: () => {return import("src/pages/PageOrder.vue")},
      },
      {
        name: "chat",
        path: "chat",
        component: () => {return import("src/pages/PageChat.vue")},
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => {return import("pages/ErrorNotFound.vue")},
  },
];

export default routes;
