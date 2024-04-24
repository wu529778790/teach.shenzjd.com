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
      quality = 100,
      omitBackground,
      fullPage,
      url,
    } = req.body;
    let data;
    try {
      // if (!KnownDevices[device]) {
      //   // 设置浏览器视口
      //   await page.setViewport({
      //     width: Number(width),
      //     height: Number(height),
      //     deviceScaleFactor: Number(deviceScaleFactor),
      //   });
      // }
      // if (KnownDevices[device]) {
      //   await page.emulate(KnownDevices[device]);
      // }
      // 模拟打印环境
      await page.emulateMediaType("print");
      // await page.evaluate(() => matchMedia('print').matches);
      // 访问 URL 页面
      if (url) {
        await page.goto(url, {
          waitUntil: waitUntil.split(","),
        });
      }
      console.log('page', page)
      // 生成pdf
      data = await page.pdf({
        format: 'A4',
        // printBackground: true, // 打印背景
        // displayHeaderFooter: true, // 打印页眉页脚
        // margin: {
        //   top: '2px',
        //   bottom: '35px'
        // },
      })
      console.log('data', data)
    } catch (error) {
      throw error;
    } finally {
      page.close();
    }
    console.log('data', data)
    res.set("Content-Type", `application/pdf`, 'Content-Length', data.length);
    res.send(data);
  });
};
