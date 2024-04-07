import express from "express";

const router = express.Router();

router.post("/screenshot", async (req, res) => {
  //   const { url } = req.query;
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(url);
  //   const buffer = await page.screenshot();
  //   await browser.close();
  //   res.send(buffer);
  console.log("res", res);
  // 返回json结构，统一的标准restful结构
  res.send({ success: true, msg: "success" });
});

export default router;
