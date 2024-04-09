<template>
  <router-view />
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
