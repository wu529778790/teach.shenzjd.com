<template>
  <a-form class="left-box" layout="inline" :model="params">
    <a-form-item label="宽度">
      <a-input v-model:value="params.width" />
    </a-form-item>
    <a-form-item label="高度">
      <a-input v-model:value="params.height" />
    </a-form-item>
    <a-form-item label="分辨率">
      <a-input v-model:value="params.ratio" />
    </a-form-item>
    <a-form-item label="类型">
      <a-select v-model:value="params.type">
        <a-select-option value="png">png</a-select-option>
        <a-select-option value="jpeg">jpeg</a-select-option>
        <a-select-option value="webp">webp</a-select-option>
        <a-select-option value="avif">avif</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="文件名">
      <a-input v-model:value="params.filename" />
    </a-form-item>
    <a-form-item label="waitUntil">
      <a-select v-model:value="params.waitUntil">
        <a-select-option value="networkidle0">networkidle0</a-select-option>
        <a-select-option value="networkidle2">networkidle2</a-select-option>
        <a-select-option value="domcontentloaded">
          domcontentloaded
        </a-select-option>
        <a-select-option value="load">load</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="品质">
      <a-input v-model:value="params.quality" />
    </a-form-item>
    <a-form-item label="去除背景">
      <a-checkbox v-model:value="params.omitBackground">去除背景</a-checkbox>
    </a-form-item>
    <a-form-item label="全屏">
      <a-checkbox v-model:value="params.fullPage">全屏</a-checkbox>
    </a-form-item>
    <a-form-item label="URL">
      <a-input v-model:value="params.url" />
    </a-form-item>
    <a-form-item label="HTML">
      <a-textarea v-model:value="params.html"></a-textarea>
    </a-form-item>
    <a-button type="primary" @click="screenshot">截图</a-button>
  </a-form>
  <a-image :wrapper-col="{ span: 8 }" :src="imgUrl" class="img" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const imgUrl = ref("");

const params = ref({
  width: 1920,
  height: 1080,
  ratio: 1,
  type: "png",
  filename: "poster",
  waitUntil: "networkidle0",
  quality: 100,
  omitBackground: false,
  fullPage: false,
  url: "https://www.fadada.com",
  html: "<h1>Hello, World!</h1>",
});

function screenshot() {
  axios({
    url: "/puppeteer/screenshot",
    method: "POST",
    responseType: "arraybuffer",
    data: params.value,
  })
    .then((response) => {
      const image = new Blob([response.data], { type: "image/png" });
      imgUrl.value = URL.createObjectURL(image);
    })
    .catch((error) => {
      console.error("Error fetching screenshot:", error);
    });
}
</script>

<style lang="scss" scoped>
.screenshot {
  display: flex;
  .left-box {
  }
  .right-box {
    margin-left: auto;
  }
}
</style>
