<template>
  <div class="params-box">
    <a-form
      class="left"
      :model="params"
      layout="horizontal"
      :colon="true"
      :labelCol="{ style: 'width: 100px' }"
    >
      <a-form-item label="设备">
        <a-select
          v-model:value="params.device"
          @change="selectDevice"
          allowClear
        >
          <a-select-option
            v-for="item in KnownDevices"
            :key="item.name"
            :value="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="宽度">
        <a-input v-model:value="params.width" :disabled="params.device" />
      </a-form-item>
      <a-form-item label="高度">
        <a-input v-model:value="params.height" :disabled="params.device" />
      </a-form-item>
      <a-form-item label="设备比例">
        <a-input
          v-model:value="params.deviceScaleFactor"
          :disabled="params.device"
        />
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
        <a-button type="primary" @click="screenshot">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
  <a-image :src="imgUrl" />
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "axios";

const KnownDevices = ref([]);
// 获取设备信息
function getDeviceInfo() {
  axios
    .get("/api/puppeteer/devices")
    .then((response) => {
      KnownDevices.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching device info:", error);
    });
}

onBeforeMount(() => {
  getDeviceInfo();
});

const imgUrl = ref("");

const params = ref({
  device: "iPad Pro",
  width: 1366,
  height: 1024,
  deviceScaleFactor: 2,
  type: "png",
  filename: "poster",
  waitUntil: "networkidle2",
  quality: 100,
  omitBackground: false,
  fullPage: false,
  url: "https://www.bilibili.com",
  html: "<h1>Hello, World!</h1>",
});

function screenshot() {
  axios({
    url: "/api/puppeteer/screenshot",
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

function selectDevice(item) {
  const device = KnownDevices.value.find((device) => device.name === item);
  if (device) {
    params.value.width = device.viewport.width;
    params.value.height = device.viewport.height;
    params.value.deviceScaleFactor = device.viewport.deviceScaleFactor;
  }
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
