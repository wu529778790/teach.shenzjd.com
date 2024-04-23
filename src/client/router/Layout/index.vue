<template>
  <a-layout class="layout">
    <a-layout-sider breakpoint="xl" collapsed-width="0">
      <div class="logo">神族九帝</div>
      <a-menu v-model:selectedKeys="currentKey" mode="inline" theme="dark" :items="items" :openKeys="['/puppeteer']"
        @click="handleClick" />
    </a-layout-sider>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, h } from "vue";
import { IeOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([
  {
    key: "/puppeteer",
    icon: () => h(IeOutlined),
    label: "无头浏览器",
    title: "无头浏览器",
    children: [
      {
        key: "/puppeteer/url2screenshot",
        label: "URL截图",
        title: "URL截图",
      },
      {
        key: "/puppeteer/string2screenshot",
        label: "字符串截图",
        title: "字符串截图",
      },
      {
        key: "/puppeteer/url2pdf",
        label: "URL转PDF",
        title: "URL转PDF",
      },
    ],
  }
]);
const currentKey = ref(["/puppeteer/url2screenshot"]);

const handleClick = ({ key }) => {
  router.push(key);
};
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
    overflow: auto;
  }
}
</style>
