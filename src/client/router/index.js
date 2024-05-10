import { createRouter, createWebHashHistory } from "vue-router";
import { h } from "vue";
import { IeOutlined, InstagramOutlined } from "@ant-design/icons-vue";

export const routes = [
  {
    path: "/",
    component: () => import("./Layout/index.vue"),
    redirect: "/puppeteer",
    meta: {
      menu: false,
    },
    children: [
      {
        path: "/puppeteer",
        redirect: "/puppeteer/url2screenshot",
        meta: {
          title: "无头浏览器",
          icon: () => h(IeOutlined),
        },
        children: [
          {
            path: "/puppeteer/url2screenshot",
            component: () =>
              import("@/views/puppeteer/url2screenshot/index.vue"),
            meta: {
              title: "URL截图",
            },
          },
          {
            path: "/puppeteer/string2screenshot",
            component: () =>
              import("@/views/puppeteer/string2screenshot/index.vue"),
            meta: {
              title: "字符串截图",
            },
          },
          {
            path: "/puppeteer/url2pdf",
            component: () => import("@/views/puppeteer/url2pdf/index.vue"),
            meta: {
              title: "URL转PDF",
            },
          },
          // {
          //   path: "/puppeteer/string2pdf",
          //   component: () => import("@/views/puppeteer/string2pdf/index.vue"),
          //   meta: {
          //     title: "字符串转PDF",
          //   }
          // }
        ],
      },
    ],
  },
  {
    path: "/wallpaper",
    component: () => import("@/views/wallpaper/index.vue"),
    meta: {
      title: "壁纸",
      icon: () => h(InstagramOutlined),
      newPage: true,
    },
    redirect: "/wallpaper/index",
    children: [
      {
        path: "/wallpaper/index",
        component: () => import("@/views/wallpaper/index/index.vue"),
        meta: {
          title: "最新壁纸",
          menu: false,
        },
      },
      {
        path: "/wallpaper/bing",
        component: () => import("@/views/wallpaper/bing/index.vue"),
        meta: {
          title: "必应壁纸",
          menu: false,
        },
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
