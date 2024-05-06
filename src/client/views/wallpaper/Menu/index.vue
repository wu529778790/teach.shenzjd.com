<template>
  <div class="menu-box">
    <div class="title">电脑壁纸</div>
    <div class="menu">
      <div
        class="item"
        :class="{ itemActive: currentKey[0] === '/wallpaper/newest' }"
        @click="handleClick({ key: '/wallpaper/newest' })"
      >
        最新壁纸
      </div>
      <div
        class="item"
        :class="{ itemActive: currentKey[0] === '/wallpaper/category' }"
        @click="handleClick({ key: '/wallpaper/category' })"
      >
        分类壁纸
      </div>
      <div
        class="item"
        :class="{ itemActive: currentKey[0] === '/wallpaper/bing' }"
        @click="handleClick({ key: '/wallpaper/bing' })"
      >
        必应美图
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentKey = ref(["/wallpaper/newest"]);

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    currentKey.value = [newPath];
  },
  {
    immediate: true,
  }
);

function handleClick({ key }) {
  router.push(key);
}
</script>

<style lang="scss" scoped>
.menu-box {
  position: fixed;
  z-index: 99999;
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 16px;
  background-color: #fff;
  opacity: 0.77;
  filter: alpha(opacity = 77);
  transition: all 0.25s ease;
  display: flex;
  justify-content: space-between;

  &:hover {
    opacity: 1;
  }

  .title {
    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      color-stop(0, #f22),
      color-stop(0.15, #f2f),
      color-stop(0.3, #22f),
      color-stop(0.45, #2ff),
      color-stop(0.6, #2f2),
      color-stop(0.85, #ff2),
      color-stop(1, #f22)
    );
    color: transparent;
    background-clip: text;
    font-size: 28px;
    font-weight: normal;
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
  }
  .menu {
    display: flex;
    .item {
      margin: 0 10px;
      cursor: pointer;
      font-size: 15px;
      &:hover {
        color: #1677ff;
      }
    }
    .itemActive {
      color: #1677ff;
    }
  }
}
</style>
