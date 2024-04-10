import express from "express";
import renderScreenshot from "./renderScreenshot.js";
import renderPdf from "./renderPdf.js";
import { KnownDevices } from "puppeteer";

const router = express.Router();

// 返回设备列表
router.get("/devices", (req, res) => {
  res.send(Object.values(KnownDevices));
});

// 返回截图
router.post("/screenshot", async (req, res) => {
  const data = await renderScreenshot(req, res);
  res.send(data);
});

// 返回PDF
router.post("/pdf", async (req, res) => {
  const data = await renderPdf(req, res);
  res.send(data);
});

export default router;
