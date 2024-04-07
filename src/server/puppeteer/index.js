import express from "express";
import render from "./render.js";

const router = express.Router();

router.post("/screenshot", async (req, res) => {
  // const kwargs = req.body;
  // const htmlContent = await generatePoster(kwargs);
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(url);
  //   const buffer = await page.screenshot();
  //   await browser.close();
  //   res.send(buffer);
  // 返回json结构，统一的标准restful结构
  console.log("req", req.ctx);
  res.send({ success: true, msg: "success" });
});

export default router;
