<template>
  <div class="waterfall">
    <div class="item" v-for="(item, index) in data" :key="item.id">
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
</script>

<style lang="scss" scoped>
.waterfall {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  .item {
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
