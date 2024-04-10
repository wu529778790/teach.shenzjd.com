<template>
  <div class="params-box">
    <a-form
      class="left"
      :model="params"
      layout="horizontal"
      :colon="true"
      :labelCol="{ style: 'width: 100px' }"
    >
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
      <div style="display: flex">
        <a-form-item label="去除背景">
          <a-switch v-model:checked="params.omitBackground" />
        </a-form-item>
        <a-form-item label="全屏">
          <a-switch v-model:checked="params.fullPage" />
        </a-form-item>
      </div>
    </a-form>
    <a-form
      class="right"
      :model="params"
      :labelCol="{ style: 'width: 100px' }"
      :colon="true"
    >
      <a-form-item label="URL">
        <a-input v-model:value="params.url" />
      </a-form-item>
      <a-form-item label="HTML">
        <a-textarea v-model:value="params.html" :rows="10" />
      </a-form-item>
      <a-form-item label="截图">
        <a-button type="primary" @click="pdf">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const params = ref({
  width: 1920,
  height: 1080,
  ratio: 1,
  type: "png",
  filename: "poster",
  waitUntil: "networkidle2",
  quality: 100,
  omitBackground: false,
  fullPage: false,
  url: "https://www.bilibili.com",
  html: "<h1>Hello, World!</h1>",
});

function pdf() {
  axios({
    url: "/api/puppeteer/pdf",
    method: "POST",
    responseType: "arraybuffer",
    data: params.value,
  })
    .then((response) => {
      const data = new Blob([response.data], { type: "application/pdf" });
      // pdf下载
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "pdf.pdf";
      link.click();
    })
    .catch((error) => {
      console.error("Error fetching pdf:", error);
    });
}
</script>

<style lang="scss" scoped>
.params-box {
  display: flex;
  .left {
    width: 300px;
  }
  .right {
    flex: 1;
  }
}
</style>
