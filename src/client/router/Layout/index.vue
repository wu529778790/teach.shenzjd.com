<template>
  <t-layout class="layout">
    <Menu />
    <t-content>
      <router-view />
    </t-content>
  </t-layout>
</template>

<script setup>
import Menu from "./Menu/index.vue";
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
