<template>
    <Editor :init="init" v-model="innerValue" />
</template>
<script setup>
import { ref, watch } from 'vue';
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';

defineOptions({
    name: 'Tinymce'
})

// 指定tinymce文件加载的位置
tinymce.baseURL = 'tinymce';

const props = defineProps({
    modelValue: String,
    init: Object
})

const init = {
    license_key: 'gpl',
    language_url: '/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    placeholder: '在这里输入文字',
    menubar: false,
    elementpath: false,
    auto_focus: true,
    ...props.init
}

const innerValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

watch(() => innerValue.value, (val) => {
    emit('update:modelValue', val)
})
</script>
