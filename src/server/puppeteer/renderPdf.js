// 获取连接池
import pool from "./genericPool/index.js";
import { KnownDevices } from "puppeteer";

export default async (req, res) => {
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
    let data;
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
      data = await page.pdf({
        format: "A4",
      });
    } catch (error) {
      throw error;
    } finally {
      await page.close();
    }
    res.set("Content-Type", "application/pdf", "Content-length", pdf.length);
    return data;
  });
};
