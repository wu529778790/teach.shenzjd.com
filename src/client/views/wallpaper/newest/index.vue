<template>
    <div class="list">
        <a-image v-for="item in list" :key="item" :src="item.url" />
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

<style lang="scss" scoped>
.list {
    overflow-y: auto;
}
</style>