const routes = [
  {
    redirect: "store",
    path: "/",
    component: () => {return import("src/layouts/DefaultLayout.vue")},
    children: [
      {
        name: "store",
        path: "",
        component: () => {return import("src/pages/StorePage.vue")},
      },
    ],
  },
  {
    path: "/auth",
    component: () => {return import("src/layouts/AuthLayout.vue")},
    children: [
      {
        name: "signin",
        path: "signin",
        component: () => {return import("src/pages/SigninPage.vue")},
      },
      {
        name: "signup",
        path: "signup",
        component: () => {return import("src/pages/SignupPage.vue")},
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
