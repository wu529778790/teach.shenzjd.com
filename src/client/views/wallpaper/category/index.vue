<template>
    <div v-for="item in list" :key="item">
        <a-image :src="item.icon" />
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getCategoryApi } from './api'

const list = ref([])

onBeforeMount(async () => {
    const res = await getCategoryApi()
    list.value = res.data
})
</script>