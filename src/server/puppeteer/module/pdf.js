// 获取连接池
import pool from "../genericPool/index.js";
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
      waitUntil = "domcontentloaded",
      url,
      displayHeaderFooter = false, // 是否显示页眉和页脚
      footerTemplate = "", // 页脚模板
      format = "Letter", // 页面大小
      headerTemplate = "", // 页眉模板
      landscape = false, // 是否横向
      margin = {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
      omitBackground = false, // 隐藏默认的白色背景，并允许生成透明的 pdf。
      outline = false, // 生成大纲
      pageRanges = "", // 要打印的纸张范围，例如 1-5, 8, 11-13。 空字符串，表示打印所有页面。
      preferCSSPageSize = false, // 优先使用 CSS 页面大小:为页面中声明的任何 CSS @page 大小提供优先于 width 或 height 或 format 选项中声明的大小
      printBackground = true, // 打印背景
      scale = 1, // 页面缩放
      tagged = false, // 是否打印标签
      timeout = 30000, // 超时时间
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
      if (KnownDevices[device]) {
        await page.emulate(KnownDevices[device]);
      }
      // 访问 URL 页面
      if (url) {
        await page.goto(url, {
          waitUntil: waitUntil.split(","),
        });
      }
      // 生成pdf
      data = await page.pdf({
        width: 375,
        height: 812,
        displayHeaderFooter: false, // 是否显示页眉和页脚
        footerTemplate: "", // 页脚模板
        format: "Letter", // 页面大小
        headerTemplate: "", // 页眉模板
        landscape: false, // 是否横向
        margin: {
          top: '',
          bottom: '',
          left: '',
          right: '',
        },
        omitBackground: false, // 隐藏默认的白色背景，并允许生成透明的 pdf。
        outline: false, // 生成大纲
        pageRanges: "", // 要打印的纸张范围，例如 1-5, 8, 11-13。 空字符串，表示打印所有页面。
        preferCSSPageSize: false, // 优先使用 CSS 页面大小:为页面中声明的任何 CSS @page 大小提供优先于 width 或 height 或 format 选项中声明的大小
        printBackground: true, // 打印背景
        scale: 1, // 页面缩放
        tagged: false, // 是否打印标签
        timeout: 30000, // 超时时间
      })
    } catch (error) {
      throw error;
    } finally {
      page.close();
    }
    res.set("Content-Type", `application/pdf`, 'Content-Length', data.length);
    res.send(data);
  });
};
