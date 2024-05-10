<template>
  <div class="index">
    <Wallpaper :data="list" />
    <div class="end">end</div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Wallpaper from "../components/Wallpaper/index.vue";
import { getNewestApi, getListByCategoryApi } from "./api";
import { decode360Url } from "../utils";

const route = useRoute();

const list = ref([]);
const params = ref({
  start: 0,
  count: 40,
  cid: route.query.cid,
});

const handlerData = (data) => {
  return data.map((item, index) => {
    return {
      ...item,
      decode360Url: decode360Url({
        oldUrl: item.url,
      }),
    };
  });
};
// 获取分类壁纸
const getListByCategory = async () => {
  const res = await getListByCategoryApi({
    ...params.value,
  });
  list.value = handlerData(res.data.list);
};

watch(
  () => route.query.cid,
  (value) => {
    console.log(value);
    if (value) {
      params.value.cid = value;
      getListByCategory();
    }
  },
  {
    deep: true,
  }
);

// 获取最新壁纸
const getNewest = async () => {
  const res = await getNewestApi({
    ...params.value,
    cid: undefined,
  });
  list.value = list.value.concat(handlerData(res.data));
};

onBeforeMount(() => {
  // getNewest();
});

onMounted(() => {
  const endObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    params.value.start += params.value.count;
    getNewest();
  });
  endObserver.observe(document.querySelector(".end"));
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 50px;
  overflow-y: auto;
}
</style>
