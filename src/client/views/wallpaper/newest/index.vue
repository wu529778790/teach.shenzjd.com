<template>
  <div class="newest">
    <Wallpaper :data="list" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import Wallpaper from "../components/Wallpaper/index.vue";
import { getNewestApi } from "./api";

onBeforeMount(async () => {
  await getPage();
});

const list = ref([]);
const params = ref({
  start: 0,
  count: 30,
});

// 解码360图片的链接，获得指定尺寸图片
function decode360Url({ oldUrl, width = 480, height = 270, quality = 0 }) {
  return oldUrl.replace(
    "r\/__85",
    "m\/" + parseInt(width) + "_" + parseInt(height) + "_" + quality
  );
}

const getPage = async () => {
  const res = await getNewestApi({
    ...params.value,
  });
  list.value = res.data.map((item, index) => {
    return {
      ...item,
      decode360Url: decode360Url({
        oldUrl: item.url,
        width: index % 5 === 0 ? 960 : 480,
        height: index % 5 === 0 ? 540 : 270,
      }),
    };
  });
};
</script>

<style lang="scss" scoped>
.newest {
  margin-top: 50px;
  overflow-y: auto;
}
</style>
