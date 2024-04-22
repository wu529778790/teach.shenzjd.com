import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("./Layout/index.vue"),
    redirect: "/puppeteer",
    meta: {
      menu: false
    },
    children: [
      {
        path: "/puppeteer",
        redirect: "/puppeteer/urlScreenshot",
        meta: {
          title: "无头浏览器",
        },
        children: [
          {
            path: "urlScreenshot",
            component: () => import("@/views/puppeteer/urlScreenshot/index.vue"),
            meta: {
              title: "URL截图",
            }
          },
          {
            path: "stringScreenshot",
            component: () => import("@/views/puppeteer/stringScreenshot/index.vue"),
            meta: {
              title: "字符串截图",
            }
          },
          {
            path: "pdf",
            component: () => import("@/views/puppeteer/pdf/index.vue"),
            meta: {
              title: "pdf生成",
            }
          },
        ],
      }
    ],
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export function setupRouter(app) {
  app.use(router);
}
