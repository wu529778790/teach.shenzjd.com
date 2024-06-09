<template>
  <Editor :value="innerValue" :plugins="plugins" @change="handleChange" />
</template>

<script setup>
import { ref } from "vue";
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";

const plugins = [gfm()];

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
