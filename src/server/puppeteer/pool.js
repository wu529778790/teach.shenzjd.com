import createPuppeteerPool from "./createPuppeteerPool.js";
import config from "./config.js";

const pool = createPuppeteerPool({
  puppeteerArgs: {
    // args: config.browserArgs,
  },
});

export default pool;
