import createPuppeteerPool from "./createPuppeteerPool.js";

const pool = createPuppeteerPool({
  puppeteerArgs: {
    // headless: false, // 是否启用无头模式
    // slowMo: 250, // 慢速模式, 主要是为了看看发生了什么事情
  },
});

export default pool;
