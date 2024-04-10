import express from "express";
import renderScreenshot from "./renderScreenshot.js";
import renderPdf from "./renderPdf.js";

const router = express.Router();

router.post("/screenshot", async (req, res) => {
  const data = await renderScreenshot(req, res);
  res.send(data);
});

router.post("/pdf", async (req, res) => {
  const data = await renderPdf(req, res);
  res.send(data);
});

export default router;
