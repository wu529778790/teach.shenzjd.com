<template>
    <div class="menu-box">
        <a-menu class="menu" v-model:selectedKeys="currentKey" :items="menus" mode="horizontal" @click="handleClick" />
        <div class="search">
            <a-input class="search-input" placeholder="Search" v-model:value="searchQuery" @keyup.enter="search" />
            <a-button class="search-btn" @click="search">搜索</a-button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentKey = ref(['/wallpaper/recommend']);

watch(
    () => router.currentRoute.value.path,
    (newPath) => {
        currentKey.value = [newPath];
    },
    {
        immediate: true
    }
);

const menus = ref([
    {
        title: '最新壁纸',
        label: '最新壁纸',
        key: '/wallpaper/newest',
    },
    {
        title: '分类壁纸',
        label: '分类壁纸',
        key: '/wallpaper/category',
    },
    {
        title: '必应美图',
        label: '必应美图',
        key: '/wallpaper/bing',
    }
]);

const searchQuery = ref('');
function search() {
    router.push({
        path: '/search',
        query: {
            content: searchQuery.value
        }
    })
}

function handleClick({ key }) {
    router.push(key);
}
</script>

<style lang="scss" scoped>
.menu-box {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);

    .menu {
        flex: 1;
        border-bottom: none;
    }

    .search {
        display: flex;
        align-items: center;
        padding-right: 20px;

        .search-input {
            width: 300px;
        }

        .search-btn {
            margin-left: 20px;
        }
    }
}
</style>
