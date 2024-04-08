import express from "express";
import render from "./render.js";

const router = express.Router();

router.post("/screenshot", async (req, res) => {
  const data = await render(req.ctx);
  console.log("data", data);
  res.send({ success: true, msg: "success", data });
});

export default router;
