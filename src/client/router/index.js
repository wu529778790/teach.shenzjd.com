import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/screenshot",
      component: () => import("./Layout/index.vue"),
      children: [
        {
          path: "/screenshot",
          component: () => import("@/views/screenshot/index.vue"),
        },
      ],
    },
  ],
});

export function setupRouter(app) {
  app.use(router);
}
