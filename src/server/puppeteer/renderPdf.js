// 获取连接池
import pool from "./genericPool/index.js";

const renderScreenshot = async (req, res) => {
  // 使用连接池资源
  return await pool.use(async (browser) => {
    // 打开新的页面
    const page = await browser.newPage();
    const {
      width = 300,
      height = 480,
      ratio: deviceScaleFactor = 2,
      type = "png",
      filename = "poster",
      waitUntil = "domcontentloaded",
      quality = 100,
      omitBackground,
      fullPage,
      html,
      url,
    } = req.body;
    let pdf;
    try {
      // 设置浏览器视口
      await page.setViewport({
        width: Number(width),
        height: Number(height),
        deviceScaleFactor: Number(deviceScaleFactor),
      });
      if (html?.length > 1.25e6) {
        throw new Error("pdf size out of limits, at most 1 MB");
      }
      // 访问 URL 页面
      await page.goto(url || `data:text/html,${html}`, {
        waitUntil: waitUntil.split(","),
      });
      // 生成pdf
      pdf = await page.pdf({
        format: "A4",
      });
    } catch (error) {
      throw error;
    } finally {
      await page.close();
    }
    res.set("Content-Type", "application/pdf", "Content-length", pdf.length);
    res.set("Content-Disposition", `inline; filename=${filename}.${type}`);
    return pdf;
  });
};

export default renderScreenshot;
