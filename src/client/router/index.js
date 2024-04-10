import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./Layout/index.vue"),
      redirect: "/puppeteer",
      children: [
        {
          path: "/puppeteer",
          redirect: "/puppeteer/screenshot",
          children: [
            {
              path: "screenshot",
              component: () => import("@/views/puppeteer/screenshot/index.vue"),
            },
            {
              path: "pdf",
              component: () => import("@/views/puppeteer/pdf/index.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export function setupRouter(app) {
  app.use(router);
}
