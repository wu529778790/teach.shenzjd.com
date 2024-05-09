<template>
  <div class="waterfall">
    <div
      v-for="(item, index) in data"
      :key="item.id"
      class="item"
      :style="{
        width: calcWidthOrHeight(index),
        height: calcWidthOrHeight(index),
      }">
      <img class="img" :src="item.decode360Url" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const calcWidthOrHeight = (index) => {
  const row = Math.floor(index / 5);
  const column = index % 5;
  return column === 2 * (row % 3) ? "50%" : "25%";
};
</script>

<style lang="scss" scoped>
.waterfall {
  counter-reset: item-counter;
  .item {
    float: left;
    position: relative;
    counter-increment: item-counter;
    &:after {
      position: absolute;
      color: white;
      left: 0;
      top: 0;
      content: counter(item-counter);
    }
    .img {
      width: 100%;
    }
  }
}
</style>
