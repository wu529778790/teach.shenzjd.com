import { createApp } from "vue";
import { setupRouter } from "@/router";
import App from "./App.vue";
import "./style.css";
import TDesign from "tdesign-vue-next";
import "tdesign-vue-next/es/style/index.css";

const app = createApp(App);

app.use(TDesign);

// 配置路由
setupRouter(app);

app.mount("#app");
