import request from '@/utils/request'

export const getNewestApi = () => {
    return request({
        url: '/api/wallpaper/newest',
        method: 'GET'
    })
}