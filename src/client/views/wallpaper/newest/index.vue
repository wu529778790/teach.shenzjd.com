<template>
  <div class="newest">
    <Wallpaper :data="list" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import Wallpaper from "../components/Wallpaper/index.vue";
import { getNewestApi } from "./api";
import { decode360Url } from "../utils";

onBeforeMount(async () => {
  await getPage();
});

const list = ref([]);
const params = ref({
  start: 0,
  count: 30,
});

const getPage = async () => {
  const res = await getNewestApi({
    ...params.value,
  });
  list.value = res.data.map((item, index) => {
    return {
      ...item,
      decode360Url: decode360Url({
        oldUrl: item.url,
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
