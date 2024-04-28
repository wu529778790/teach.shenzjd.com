import request from '@/utils/request'

export const getNewestApi = (params) => {
    return request({
        url: '/api/wallpaper/newest',
        method: 'GET',
        params
    })
}