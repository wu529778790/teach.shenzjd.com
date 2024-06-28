<template>
  <div class="menu-box">
    <div class="menu"></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
</script>

<style lang="scss" scoped>
.menu-box {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 16px;
  background-color: #fff;
  opacity: 0.77;
  filter: alpha(opacity=77);
  transition: all 0.25s ease;
  display: flex;
  justify-content: space-between;
}
</style>
