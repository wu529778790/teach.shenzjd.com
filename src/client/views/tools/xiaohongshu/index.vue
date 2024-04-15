<template>
    <div class="page">
        <Tinymce v-model="html" :init="{
            width: 381,
            height: 742,
        }" />
        <IframeContainer :htmlContent="html" class="html">
        </IframeContainer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Tinymce from '@/components/tinymce/index.vue';
import IframeContainer from '@/components/IframeContainer/index.vue';

const html = ref('')
</script>

<style lang="scss" scoped>
.page {
    display: flex;

    .html {
        margin-top: 48px;
        width: 375px;
        height: 667px;
        background-color: #fff;
    }
}
</style>