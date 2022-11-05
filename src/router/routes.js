const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/scroll1",
        component: () => import("src/pages/IndexPage1.vue"),
      },
      {
        path: "/scroll2",
        component: () => import("src/pages/IndexPage2.vue"),
      },
      {
        path: "/scroll3",
        component: () => import("src/pages/IndexPage3.vue"),
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
