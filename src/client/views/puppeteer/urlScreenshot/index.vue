<template>
  <div class="params-box">
    <a-form class="left" :model="params" layout="horizontal" :colon="true" :labelCol="{ style: 'width: 100px' }">
      <a-form-item label="设备">
        <a-select v-model:value="params.device" @change="selectDevice" allowClear>
          <a-select-option v-for="item in KnownDevices" :key="item.name" :value="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="宽度">
        <a-input v-model:value="params.width" :disabled="params.device !== '自定义'" />
      </a-form-item>
      <a-form-item label="高度">
        <a-input v-model:value="params.height" :disabled="params.device !== '自定义'" />
      </a-form-item>
      <a-form-item label="设备比例">
        <a-input v-model:value="params.deviceScaleFactor" :disabled="params.device !== '自定义'" />
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
      <div class="flex-box">
        <a-form-item label="去除背景">
          <a-switch v-model:checked="params.omitBackground" />
        </a-form-item>
        <a-form-item label="全屏">
          <a-switch v-model:checked="params.fullPage" />
        </a-form-item>
      </div>
    </a-form>
    <a-form class="right" :model="params" :labelCol="{ style: 'width: 100px' }" :colon="true">
      <a-form-item label="URL">
        <a-input v-model:value="params.url" placeholder="https://www.bilibili.com" />
      </a-form-item>

      <a-form-item label="操作">
        <a-button type="primary" @click="screenshot" :disabled="spinning">提交</a-button>
      </a-form-item>
      <a-form-item label="截图">
        <a-spin :spinning="spinning">
          <div class="screenshotImg" :style="{
            width: params.width + 'px',
            height: params.height + 'px'
          }">
            <a-image v-if="imgUrl" :src="imgUrl" />
          </div>
        </a-spin>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getDevicesApi, getScreenshotApi } from './api'
import axios from "axios";

const KnownDevices = ref([]);
// 获取设备信息
async function getDeviceInfo() {
  const data = await getDevicesApi()
  KnownDevices.value = [
    {
      name: "自定义",
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      }
    },
    ...data
  ]
}

onBeforeMount(async () => {
  await getDeviceInfo();
});

const imgUrl = ref("");

const params = ref({
  device: "iPhone X",
  width: 375,
  height: 812,
  deviceScaleFactor: 3,
  type: "png",
  filename: "poster",
  waitUntil: "networkidle2",
  quality: 100,
  omitBackground: false,
  fullPage: false,
  url: "https://www.bilibili.com",
});

const spinning = ref(false)
async function screenshot() {
  spinning.value = true
  const res = await getScreenshotApi({
    ...params.value,
    device: params.value.device === '自定义' ? undefined : params.value.device,
  })
  const image = new Blob([res.data], { type: "image/png" });
  imgUrl.value = URL.createObjectURL(image);
  spinning.value = false
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

.flex-box {
  display: flex;
}

.screenshotImg {
  margin-top: 47px;
}
</style>
