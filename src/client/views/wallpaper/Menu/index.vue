<template>
    <div class="menu-box">
        <a-menu class="menu" v-model:selectedKeys="currentKey" :items="menus" mode="horizontal" @click="handleClick" />
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


function handleClick({ key }) {
    router.push(key);
}
</script>

<style lang="scss" scoped>
.menu-box {
    position: fixed;
    z-index: 99999;
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-size: 16px;
    background-color: #fff;
    opacity: 0.77;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);

    &:hover {
        opacity: 1;
    }

    .menu {
        border-bottom: none;
    }
}
</style>
