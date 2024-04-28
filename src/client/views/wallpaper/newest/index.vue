<template>
    <Wallpaper :data="list" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import Wallpaper from '../components/Wallpaper/index.vue'
import { getNewestApi } from './api'

onBeforeMount(async () => {
    await getPage()
})

const list = ref([])
const params = ref({
    pageno: 1,
    count: 30
})

const getPage = async () => {
    const res = await getNewestApi({
        ...params.value
    })
    list.value = res.data.list
}
</script>