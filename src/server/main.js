import express from "express";
import ViteExpress from "vite-express";
import puppeteer from "./puppeteer/index.js";

const app = express();

app.use("/puppeteer", puppeteer);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
