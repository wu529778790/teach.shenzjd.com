import express from "express";
import screenshot from "./module/screenshot.js";
import pdf from "./module/pdf.js";
import devices from "./module/devices.js";

const router = express.Router();

// 返回设备列表
router.get("/devices", devices);

// 返回截图
router.post("/screenshot", screenshot);

// 返回PDF
router.post("/pdf", pdf);

export default router;
