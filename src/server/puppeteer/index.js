import express from "express";
import render from "./render.js";

const router = express.Router();

router.post("/screenshot", async (req, res) => {
  const data = await render(req, res);
  res.send(data);
});

export default router;
