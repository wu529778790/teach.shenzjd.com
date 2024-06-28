<template>
  <t-head-menu
    class="menu"
    :default-value="defaultValue"
    theme="light"
    :default-expanded="expanded"
    @change="changeHandler">
    <t-submenu v-for="item in menuList" :key="item.path" :value="item.path">
      <template #title>
        <span>{{ item.name }}</span>
      </template>
      <t-menu-item
        v-if="item.children && item.children.length > 0"
        v-for="sub in item.children"
        :key="sub.path"
        :value="sub.path">
        <span>{{ sub.name }}</span>
      </t-menu-item>
    </t-submenu>
  </t-head-menu>
</template>

<script setup>
import { ref, computed } from "vue";
import { routes } from "@/router/index.js";
import { useRouter } from "vue-router";

const router = useRouter();

const menuList = computed(() => {
  return routes[0].children;
});

console.log(menuList.value);

const defaultValue = ref(menuList.value[0].path);
const expanded = ref([menuList.value[0].path]);

const changeHandler = (path) => {
  defaultValue.value = path;
  router.push({ path });
};
</script>

<style lang="scss" scoped>
.menu {
  :deep(.t-head-menu__submenu) {
    margin: 0;
  }
}
</style>
