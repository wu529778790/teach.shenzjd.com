import request from '@/utils/request'

export const getRecommendApi = () => {
    return request({
        url: '/api/wallpaper/birdpaper',
        method: 'GET'
    })
}