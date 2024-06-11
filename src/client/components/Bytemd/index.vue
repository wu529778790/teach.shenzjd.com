<template>
  <Editor
    :value="innerValue"
    :locale="zhHans"
    :plugins="plugins"
    @change="handleChange" />
</template>

<script setup>
import { ref } from "vue";
import * as bytemd from "bytemd";
import "bytemd/dist/index.css";
import "juejin-markdown-themes/dist/scrolls-light.min.css";
import { Editor, Viewer } from "@bytemd/vue-next";
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import "juejin-markdown-themes/dist/juejin.min.css";

const plugins = [
  breaks(),
  frontmatter(),
  gemoji(),
  gfm(),
  highlight(),
  math(),
  mediumZoom(),
  mermaid(),
];

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const innerValue = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);
const handleChange = (val) => {
  emit("update:modelValue", val);
};
</script>
