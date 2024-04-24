import request from "@/utils/request";

export const getDevicesApi = () => {
    return request({
        url: "/api/puppeteer/devices",
        method: "GET"
    })
}

export const getScreenshotApi = (data) => {
    return request({
        url: "/api/puppeteer/pdf",
        method: "POST",
        responseType: "blob",
        data,
        allResponse: true
    })
}