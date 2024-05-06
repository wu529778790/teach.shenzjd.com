<template>
  <div class="img-box">
    <img class="img" :src="src" />
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.img-box {
  width: 100%;

  .img {
    width: 100%;
  }
}
</style>
