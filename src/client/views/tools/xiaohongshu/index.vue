<template>
    <div class="page">
        <Tinymce v-model="html" :init="init" class="tinymce" />
        <div v-html="html" class="html"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Tinymce from '@/components/tinymce/index.vue';

const html = ref('')
const init = ref({
    height: '100%',

})
</script>

<style lang="scss" scoped>
.page {
    min-height: 100%;
    display: flex;
    justify-content: space-between;

    .tinymce {
        flex: 1;
        margin-right: 20px;
    }

    .html {
        width: 375px;
        background-color: #fff;
        padding: 16px;
        line-height: 2;
    }
}
</style>