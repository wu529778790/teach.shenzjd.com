<template>
    <div class="waterfall">
        <ImgBox v-for="(item, index) in data" :key="item.id" :src="item.url" />
    </div>
</template>

<script setup>
import ImgBox from './imgBox.vue'

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped>
.waterfall {
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
}
</style>