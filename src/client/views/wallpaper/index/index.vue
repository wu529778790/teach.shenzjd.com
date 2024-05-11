<template>
  <div class="index">
    <Wallpaper :data="list" />
    <div class="loadmore">
      {{ params.start >= list.length ? "没有更多了" : "加载更多" }}
    </div>
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
  const newList = handlerData(res.data.list);
  // 如果不是同一分类
  if (list.value[0]?.class_id !== newList[0].class_id) {
    list.value = newList;
  } else {
    list.value = list.value.concat(newList);
  }
};

watch(
  () => route.query.cid,
  (value) => {
    if (value) {
      params.value.cid = value;
      getList();
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

const getList = () => {
  if (params.value.start > list.value.length && params.value.start > 0) return;
  if (params.value.cid) {
    getListByCategory();
  } else {
    getNewest();
  }
  params.value.start += params.value.count;
};
onMounted(() => {
  const endObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    getList();
  });
  endObserver.observe(document.querySelector(".loadmore"));
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 50px;
  overflow-y: auto;
  .loadmore {
    text-align: center;
    padding: 16px;
  }
}
</style>
