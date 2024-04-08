// 获取连接池
import pool from "./pool.js";

const render = async (req, res, handleFetchPicoImageError) => {
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
    let image;
    try {
      // 设置浏览器视口
      await page.setViewport({
        width: Number(width),
        height: Number(height),
        deviceScaleFactor: Number(deviceScaleFactor),
      });
      if (html?.length > 1.25e6) {
        throw new Error("image size out of limits, at most 1 MB");
      }
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

export default render;
