<template>
    <FullpageScroll :list="list" />
    <!-- <div class="bing-list">
        <a-image v-for="item in list" :key="item" :src="`https://www.bing.com${item.url}`" />
    </div> -->
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import FullpageScroll from './components/FullpageScroll/index.vue'
import { getBingApi } from './api'

const list = ref([])

onBeforeMount(async () => {
    const res = await getBingApi()
    list.value = res.images
})
</script>

<style lang="scss" scoped>
.bing-list {
    overflow-y: auto;
}
</style>