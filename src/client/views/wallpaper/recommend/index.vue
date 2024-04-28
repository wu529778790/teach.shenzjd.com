<template>
    <div v-for="item in list" :key="item">
        <a-image :src="item.url" />
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getRecommendApi } from './api'

const list = ref([])

onBeforeMount(async () => {
    const res = await getRecommendApi()
    list.value = res.data.list
})
</script>