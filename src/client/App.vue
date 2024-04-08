<script setup>
fetch("/puppeteer/screenshot", {
  method: "POST",
  body: JSON.stringify({
    url: "https://www.baidu.com",
  }),
});
</script>

<template>
  <div>puppeteer</div>
</template>

<style scoped></style>
