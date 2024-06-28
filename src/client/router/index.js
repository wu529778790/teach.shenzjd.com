import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("./Layout/index.vue"),
    redirect: "/vitualList/simple",
    children: [
      {
        name: "虚拟列表",
        path: "/vitualList",
        redirect: "/vitualList/simple",
        children: [
          {
            name: "简单虚拟列表",
            path: "/vitualList/simple",
            component: () => import("@/views/vitualList/simple/index.vue"),
          },
          {
            name: "缓冲虚拟列表",
            path: "/vitualList/buffer",
            component: () => import("@/views/vitualList/buffer/index.vue"),
          },
          {
            name: "变高虚拟列表",
            path: "/vitualList/variableHeight",
            component: () =>
              import("@/views/vitualList/variableHeight/index.vue"),
          },
        ],
      },
      {
        name: "文件上传",
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
