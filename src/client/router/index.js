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
        path: "puppeteer",
        redirect: "/puppeteer/url2screenshot",
        meta: {
          title: "无头浏览器",
          icon: () => h(IeOutlined),
        },
        children: [
          {
            path: "url2screenshot",
            component: () =>
              import("@/views/puppeteer/url2screenshot/index.vue"),
            meta: {
              title: "URL截图",
            },
          },
          {
            path: "string2screenshot",
            component: () =>
              import("@/views/puppeteer/string2screenshot/index.vue"),
            meta: {
              title: "字符串截图",
            },
          },
          {
            path: "url2pdf",
            component: () => import("@/views/puppeteer/url2pdf/index.vue"),
            meta: {
              title: "URL转PDF",
            },
          },
          // {
          //   path: "string2pdf",
          //   component: () => import("@/views/puppeteer/string2pdf/index.vue"),
          //   meta: {
          //     title: "字符串转PDF",
          //   }
          // }
        ],
      },
      {
        path: "vitualList",
        redirect: "/vitualList/simple",
        meta: {
          title: "虚拟列表",
          icon: () => h(InstagramOutlined),
        },
        children: [
          {
            path: "simple",
            meta: {
              title: "简单虚拟列表",
            },
            component: () => import("@/views/vitualList/simple/index.vue"),
          },
          {
            path: "buffer",
            meta: {
              title: "缓冲虚拟列表",
            },

            component: () => import("@/views/vitualList/buffer/index.vue"),
          },
          {
            path: "variableHeight",
            meta: {
              title: "变高虚拟列表",
            },
            component: () =>
              import("@/views/vitualList/variableHeight/index.vue"),
          },
        ],
      },
      {
        path: "/fileUpload",
        meta: {
          title: "文件上传",
        },
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
