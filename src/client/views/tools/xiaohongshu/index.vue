<template>
    <div class="params-box">
        <a-form class="left" :model="params" layout="horizontal" :colon="true" :labelCol="{ style: 'width: 70px' }">
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
            <a-form-item label="操作">
                <a-button type="primary" @click="screenshot">提交</a-button>
            </a-form-item>
        </a-form>
        <div class="right flex-box">
            <div class="editor" :style="{
                width: params.width + 4 + 'px',
                height: params.height + 72 + 'px'
            }">
                <Tinymce v-model="params.html" :init="{
                    width: '100%',
                    height: '100%',
                }" />
            </div>
            <div class="screenshotImg">
                <a-image v-if="imgUrl" :src="imgUrl" :style="{
                    width: params.width + 'px',
                    height: params.height + 'px'
                }" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import Tinymce from '@/components/Tinymce/index.vue';
import axios from "axios";

const KnownDevices = ref([]);
// 获取设备信息
function getDeviceInfo() {
    axios
        .get("/api/puppeteer/devices")
        .then((response) => {
            KnownDevices.value = [
                {
                    name: "自定义",
                    viewport: {
                        width: 375,
                        height: 667,
                        deviceScaleFactor: 1,
                    }
                },
                ...response.data
            ]
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
    device: "自定义",
    width: 375,
    height: 500,
    deviceScaleFactor: 2,
    type: "png",
    filename: "poster",
    waitUntil: "networkidle2",
    quality: 100,
    omitBackground: false,
    fullPage: false,
    html: "",
});

function screenshot() {
    const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      html,body {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.4;
        margin: 1rem;
      }
      table {
        border-collapse: collapse;
      }
      /* Apply a default padding if legacy cellpadding attribute is missing */
      table:not([cellpadding]) th,
      table:not([cellpadding]) td {
        padding: 0.4rem;
      }
      /* Set default table styles if a table has a positive border attribute
        and no inline css */
      table[border]:not([border="0"]):not([style*="border-width"]) th,
      table[border]:not([border="0"]):not([style*="border-width"]) td {
        border-width: 1px;
      }
      /* Set default table styles if a table has a positive border attribute
        and no inline css */
      table[border]:not([border="0"]):not([style*="border-style"]) th,
      table[border]:not([border="0"]):not([style*="border-style"]) td {
        border-style: solid;
      }
      /* Set default table styles if a table has a positive border attribute
        and no inline css */
      table[border]:not([border="0"]):not([style*="border-color"]) th,
      table[border]:not([border="0"]):not([style*="border-color"]) td {
        border-color: #ccc;
      }
      figure {
        display: table;
        margin: 1rem auto;
      }
      figure figcaption {
        color: #999;
        display: block;
        margin-top: 0.25rem;
        text-align: center;
      }
      hr {
        border-color: #ccc;
        border-style: solid;
        border-width: 1px 0 0 0;
      }
      code {
        background-color: #e8e8e8;
        border-radius: 3px;
        padding: 0.1rem 0.2rem;
      }
      .mce-content-body:not([dir=rtl]) blockquote {
        border-left: 2px solid #ccc;
        margin-left: 1.5rem;
        padding-left: 1rem;
      }
      .mce-content-body[dir=rtl] blockquote {
        border-right: 2px solid #ccc;
        margin-right: 1.5rem;
        padding-right: 1rem;
      }

    </style>
  </head>
  <body>
    ${params.value.html}
  </body>
  </html>
`
    axios({
        url: "/api/puppeteer/screenshot",
        method: "POST",
        responseType: "arraybuffer",
        data: {
            ...params.value,
            device: params.value.device === '自定义' ? undefined : params.value.device,
            html
        },
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
    const device = KnownDevices.value.find((it) => it.name === item);
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
    height: 100%;

    .left {
        width: 300px;
        margin-right: 8px;
    }

    .right {
        flex: 1;
        height: 100%;
        display: flex;
        flex-wrap: wrap;

        .editor {
            margin: 0px 8px 16px 8px;
        }

        .screenshotImg {
            margin: 47px 8px 16px 8px;
        }
    }
}

.flex-box {
    display: flex;
}
</style>
