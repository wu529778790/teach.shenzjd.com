import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("./Layout/index.vue"),
    redirect: "/vitualList",
    children: [
      {
        path: "/vitualList",
        redirect: "/vitualList/simple",
        children: [
          {
            path: "simple",
            component: () => import("@/views/vitualList/simple/index.vue"),
          },
          {
            path: "buffer",
            component: () => import("@/views/vitualList/buffer/index.vue"),
          },
          {
            path: "variableHeight",
            component: () =>
              import("@/views/vitualList/variableHeight/index.vue"),
          },
        ],
      },
      {
        path: "/fileUpload",
        component: () => import("@/views/fileUpload/index.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app) {
  app.use(router);
}
