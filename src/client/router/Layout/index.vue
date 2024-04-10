<template>
  <a-layout class="layout">
    <a-layout-sider breakpoint="xl" collapsed-width="0">
      <div class="logo">神族九帝</div>
      <a-menu
        v-model:selectedKeys="currentKey"
        mode="vertical"
        theme="dark"
        :items="items"
      />
    </a-layout-sider>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, h } from "vue";
import { IeOutlined } from "@ant-design/icons-vue";

const items = ref([
  {
    key: "puppeteer",
    icon: () => h(IeOutlined),
    label: "无头浏览器",
    title: "Navigation One",
  },
]);
const currentKey = ref(["puppeteer"]);
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .logo {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    background-color: black;
  }
  .content {
    padding: 16px;
  }
}
</style>
