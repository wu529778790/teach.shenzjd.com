<template>
    <Waterfall :list="list" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getRecommendApi } from './api'
import Waterfall from '../components/Waterfall.vue';

const list = ref([])

onBeforeMount(async () => {
    const res = await getRecommendApi()
    list.value = res.data.list
})
</script>