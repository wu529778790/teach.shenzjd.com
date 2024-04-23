<template>
  <a-layout class="layout">
    <a-layout-sider breakpoint="xl" collapsed-width="0">
      <div class="logo">神族九帝</div>
      <a-menu v-model:selectedKeys="currentKey" mode="inline" theme="dark" :items="menus" :openKeys="['/puppeteer']"
        @click="handleClick" />
    </a-layout-sider>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from '@/router/'

const router = useRouter();

const generateMenus = routes => {
  return routes.map(route => {
    return {
      key: route.path,
      icon: route?.meta?.icon,
      label: route?.meta?.title,
      title: route?.meta?.title,
      children: route.children && route.children.length > 0 ? generateMenus(route.children) : undefined
    }
  })
}
const menus = generateMenus(routes[0].children)
const currentKey = ref(['/puppeteer/url2screenshot']);

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
