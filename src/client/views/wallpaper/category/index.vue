<template>
    <div class="category-names">
        <div class="names" v-for="(item, index) in category" :key="item" :class="{ active: currentCategory === item }"
            @click="getListByCategory(item)">
            {{ item.category }}
        </div>
    </div>
    <div class="category-list">
        <a-image v-for="item in list" :key="item" :src="item.url" />
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getCategoryApi, getListByCategoryApi } from './api'

const category = ref([])
const currentCategory = ref()

const getCategory = async () => {
    const res = await getCategoryApi()
    category.value = res.data
    currentCategory.value = category.value[0]
}

onBeforeMount(async () => {
    await getCategory()
    getListByCategory(currentCategory.value)
})


const list = ref([])
const getListByCategory = async (item) => {
    currentCategory.value = item
    const res = await getListByCategoryApi({
        cid: item.old_id
    })
    list.value = res.data.list
}
</script>

<style lang="scss" scoped>
.category {
    display: flex;
    flex-direction: column;
}

.category-names {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;

    .names {
        padding: 10px;
        cursor: pointer;

        &:hover,
        &.active {
            color: #1677ff;
            background-color: #eee;
        }
    }
}

.category-list {
    flex: 1;
    overflow-y: auto;
}
</style>