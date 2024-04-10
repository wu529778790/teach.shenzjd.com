import createPuppeteerPool from "./createPuppeteerPool.js";

const pool = createPuppeteerPool({
  puppeteerArgs: {
    // headless: false, // 是否启用无头模式
  },
});

export default pool;
