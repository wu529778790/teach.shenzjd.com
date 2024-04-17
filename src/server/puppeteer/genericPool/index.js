import createPuppeteerPool from "./createPuppeteerPool.js";

const pool = createPuppeteerPool({
  puppeteerArgs: {
    ignoreHTTPSErrors: true,
    // headless: false, // 是否启用无头模式页面
    timeout: 0,
    pipe: true, // 不使用 websocket 
  },
});

export default pool;
