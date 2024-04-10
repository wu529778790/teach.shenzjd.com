// 获取连接池
import pool from "./genericPool/index.js";
import { KnownDevices } from "puppeteer";

const renderScreenshot = async (req, res, handleFetchPicoImageError) => {
  // 使用连接池资源
  return await pool.use(async (browser) => {
    // 打开新的页面
    const page = await browser.newPage();
    const {
      device,
      width = 300,
      height = 480,
      deviceScaleFactor = 1,
      type = "png",
      filename = "poster",
      waitUntil = "domcontentloaded",
      quality = 100,
      omitBackground,
      fullPage,
      html,
      url,
    } = req.body;
    let image;
    try {
      if (!KnownDevices[device]) {
        // 设置浏览器视口
        await page.setViewport({
          width: Number(width),
          height: Number(height),
          deviceScaleFactor: Number(deviceScaleFactor),
        });
      }
      await page.emulate(KnownDevices[device]);
      // 访问 URL 页面
      await page.goto(url || `data:text/html,${html}`, {
        waitUntil: waitUntil.split(","),
      });
      // 进行截图
      image = await page.screenshot({
        type: type === "jpg" ? "jpeg" : type,
        quality: type === "png" ? undefined : Number(quality),
        omitBackground: omitBackground === "true",
        fullPage: fullPage === true,
      });
    } catch (error) {
      throw error;
    }
    res.set("Content-Type", `image/${type}`);
    res.set("Content-Disposition", `inline; filename=${filename}.${type}`);
    await page.close();
    return image;
  });
};

export default renderScreenshot;
