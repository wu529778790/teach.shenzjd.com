<template>
  <a-spin :spinning="spinning">
    <div class="params-box">
      <a-form :model="params" layout="horizontal" :colon="true" :labelCol="{ style: 'width: 100px' }">
        <a-form-item label="URL">
          <a-input v-model:value="params.url" placeholder="https://www.bilibili.com" />
        </a-form-item>
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
        <a-form-item label="打印尺寸">
          <a-select v-model:value="params.format" allowClear>
            <a-select-option v-for="format in formats" :key="format" :value="format">
              {{ format }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="上下边距">
          <a-input-group compact>
            <a-input style="width: 50%" v-model:value="params.margin.top" placeholder="上" />
            <a-input style="width: 50%" v-model:value="params.margin.bottom" placeholder="下" />
          </a-input-group>
        </a-form-item>
        <a-form-item label="左右边距">
          <a-input-group compact>
            <a-input style="width: 50%" v-model:value="params.margin.left" placeholder="左" />
            <a-input style="width: 50%" v-model:value="params.margin.right" placeholder="右" />
          </a-input-group>
        </a-form-item>
        <a-form-item label="页面范围">
          <a-input v-model:value="params.pageRanges" placeholder="空表示打印所有页面" />
        </a-form-item>
        <div class="flex-box">
          <a-form-item label="页面缩放">
            <a-input-number v-model:value="params.scale" :step="0.1" />
          </a-form-item>
          <a-form-item label="超时时间">
            <a-input-number v-model:value="params.timeout" :step="1" /> ms
          </a-form-item>
        </div>
        <div class="flex-box">
          <a-form-item label="打印背景">
            <a-checkbox v-model:checked="params.printBackground" />
          </a-form-item>
          <a-form-item label="隐藏背景">
            <a-checkbox v-model:checked="params.omitBackground" />
          </a-form-item>
          <a-form-item label="打印标签">
            <a-checkbox v-model:checked="params.tagged" />
          </a-form-item>
          <a-form-item label="生成大纲">
            <a-checkbox v-model:checked="params.outline" />
          </a-form-item>
        </div>
        <div class="flex-box">
          <a-form-item label="横向打印">
            <a-checkbox v-model:checked="params.landscape" />
          </a-form-item>
          <a-form-item label="缩放内容">
            <a-checkbox v-model:checked="params.preferCSSPageSize" />
          </a-form-item>
          <a-form-item label="页眉页脚">
            <a-checkbox v-model:checked="params.displayHeaderFooter" />
          </a-form-item>
        </div>
        <a-form-item label="页眉模板" v-if="params.displayHeaderFooter">
          <a-input v-model:value="params.headerTemplate" />
        </a-form-item>
        <a-form-item label="页脚模板" v-if="params.displayHeaderFooter">
          <a-input v-model:value="params.footerTemplate" />
        </a-form-item>
        <a-form-item label="操作">
          <a-button type="primary" @click="screenshot" :disabled="spinning">下载</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-spin>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getDevicesApi, getScreenshotApi } from './api'

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

const formats = ref(["Letter", "Legal", "Tabloid", "A0", "A1", "A2", "A3", "A4", "A5", "A6"]);

// https://pptr.dev/api/puppeteer.pdfoptions
const params = ref({
  device: "iPhone X",
  width: 375,
  height: 812,
  deviceScaleFactor: 3,
  url: "https://www.bilibili.com",
  displayHeaderFooter: false, // 是否显示页眉和页脚
  footerTemplate: "", // 页脚模板
  format: "A4", // 页面大小
  headerTemplate: "", // 页眉模板
  landscape: false, // 是否横向
  margin: {
    top: '',
    bottom: '',
    left: '',
    right: '',
  },
  omitBackground: false, // 隐藏默认的白色背景，并允许生成透明的 pdf。
  outline: false, // 生成大纲
  pageRanges: "1", // 要打印的纸张范围，例如 1-5, 8, 11-13。 空字符串，表示打印所有页面。
  preferCSSPageSize: false, // 优先使用 CSS 页面大小:为页面中声明的任何 CSS @page 大小提供优先于 width 或 height 或 format 选项中声明的大小
  printBackground: true, // 打印背景
  scale: 1, // 页面缩放
  tagged: false, // 是否打印标签
  timeout: 30000, // 超时时间
});

const spinning = ref(false)
async function screenshot() {
  spinning.value = true
  const res = await getScreenshotApi({
    ...params.value,
    device: params.value.device === '自定义' ? undefined : params.value.device,
  })
  const pdf = new Blob([res.data], { type: "application/pdf" });
  const link = document.createElement('a')
  link.href = URL.createObjectURL(pdf)
  link.download = `${params.value.url}${new Date().getTime()}.pdf`
  link.click()
  URL.revokeObjectURL(link.href)
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
}

.flex-box {
  display: flex;
}
</style>
