import express from "express";
import NodeCache from "node-cache";
import request from "../utils/request.js";

const router = express.Router();

// 创建一个缓存实例
const cache = new NodeCache();

// 定义通用的路由处理程序
const handleRequest = async (req, res, url, cacheKey) => {
    try {
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            res.json(cachedData);
        } else {
            const data = await request({ url });
            cache.set(cacheKey, data, 3600);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 获取 birdpaper 数据
router.get("/birdpaper", async (req, res) => {
    const cid = req.query.cid || 36;
    const start = req.query.start || 0;
    const count = req.query.count || 10;
    const url = `http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${cid}&pageno=${start}&count=${count}`;
    const cacheKey = `birdpaper_${cid}_${start}_${count}`;
    await handleRequest(req, res, url, cacheKey);
});

// 获取 category 数据
router.get("/getCategory", async (req, res) => {
    const url = `http://wp.birdpaper.com.cn/intf/getCategory`;
    const cacheKey = "category";
    await handleRequest(req, res, url, cacheKey);
});

// 获取最新列表数据
router.get("/newestList", async (req, res) => {
    const pageno = req.query.pageno || 0;
    const count = req.query.count || 10;
    const url = `http://wp.birdpaper.com.cn/intf/newestList?pageno=${pageno}&count=${count}`;
    const cacheKey = `newestList_${pageno}_${count}`;
    await handleRequest(req, res, url, cacheKey);
});

// 获取 bing 图片存档数据
router.get("/bingImageArchive", async (req, res) => {
    const start = req.query.start || -1;
    const count = req.query.count || 8;
    const url = `http://cn.bing.com/HPImageArchive.aspx?format=js&idx=${start}&n=${count}`;
    const cacheKey = `bingImageArchive_${start}_${count}`;
    await handleRequest(req, res, url, cacheKey);
});

// 搜索数据
router.get("/search", async (req, res) => {
    const content = req.query.content || '';
    const start = req.query.start || 0;
    const count = req.query.count || 10;
    const url = `http://wp.birdpaper.com.cn/intf/search?content=${content}&pageno=${start}&count=${count}`;
    const cacheKey = `search_${content}_${start}_${count}`;
    await handleRequest(req, res, url, cacheKey);
});

export default router;
