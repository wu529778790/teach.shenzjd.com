import request from '@/utils/request'

export const getRecommendApi = () => {
    return request({
        url: '/api/wallpaper/recommend',
        method: 'GET'
    })
}