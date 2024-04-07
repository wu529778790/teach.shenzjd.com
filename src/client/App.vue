<script setup>
// 请求本地的/puppeteer，post请求到/puppeteer/screenshot
fetch("/puppeteer/screenshot", {
  method: "POST",
});
</script>

<template>
  <div>puppeteer</div>
</template>

<style scoped></style>
