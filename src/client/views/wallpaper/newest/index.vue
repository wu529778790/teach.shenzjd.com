<template>
    <div v-for="item in list" :key="item">
        <a-image :src="item.url" />
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getNewestApi } from './api'

const list = ref([])

onBeforeMount(async () => {
    const res = await getNewestApi()
    list.value = res.data.list
})
</script>