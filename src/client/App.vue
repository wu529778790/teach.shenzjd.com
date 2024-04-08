<template>
  <div class="puppeteer">
    <div class="title">puppeteer截图</div>
    <div class="main">
      <div class="params">
        <div class="form-row">
          <label for="width">宽度</label>
          <input type="text" id="width" v-model="params.width" />
        </div>
        <div class="form-row">
          <label for="height">高度</label>
          <input type="text" id="height" v-model="params.height" />
        </div>
        <div class="form-row">
          <label for="ratio">分辨率</label>
          <input type="text" id="ratio" v-model="params.ratio" />
        </div>
        <div class="form-row">
          <label for="type">类型</label>
          <input type="text" id="type" v-model="params.type" />
        </div>
        <div class="form-row">
          <label for="filename">文件名</label>
          <input type="text" id="filename" v-model="params.filename" />
        </div>
        <div class="form-row">
          <label for="waitUntil">waitUntil</label>
          <select id="waitUntil" v-model="params.waitUntil">
            <option value="networkidle0">networkidle0</option>
            <option value="networkidle2">networkidle2</option>
            <option value="domcontentloaded">domcontentloaded</option>
            <option value="load">load</option>
          </select>
        </div>
        <div class="form-row">
          <label for="quality">品质</label>
          <input type="text" id="quality" v-model="params.quality" />
        </div>
        <div class="form-row">
          <label for="omitBackground">去除背景</label>
          <input
            type="checkbox"
            id="omitBackground"
            v-model="params.omitBackground"
          />
        </div>
        <div class="form-row">
          <label for="fullPage">全屏</label>
          <input type="checkbox" id="fullPage" v-model="params.fullPage" />
        </div>
        <div class="form-row">
          <label for="url">URL</label>
          <input type="text" id="url" v-model="params.url" />
        </div>
        <div class="form-row">
          <label for="html">HTML</label>
          <textarea id="html" v-model="params.html"></textarea>
        </div>
        <button @click="screenshot">截图</button>
      </div>
      <div class="img-container">
        <img :src="imgUrl" class="img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const imgUrl = ref("");

const params = ref({
  width: 300,
  height: 480,
  ratio: 2,
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
.puppeteer {
  .title {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin: 16px 0;
  }
  .main {
    display: flex;
    .params {
      width: 300px;
      padding: 16px;
    }
    .img-container {
      flex: 1;
      border: 1px solid #eee;
      .img {
        max-width: 100%;
      }
    }
  }
}

.form-row {
  margin-bottom: 10px;
  display: flex;
}

label {
  margin-right: 10px;
  font-weight: bold;
  width: 70px;
  user-select: none;
}

input,
textarea {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

textarea {
  width: 170px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
