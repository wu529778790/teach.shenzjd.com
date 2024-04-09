import { createApp } from "vue";
import { setupRouter } from "@/router";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

// 配置路由
setupRouter(app);

app.mount("#app");
