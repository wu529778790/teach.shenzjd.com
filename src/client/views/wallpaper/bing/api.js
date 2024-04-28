import request from '@/utils/request'

export const getBingApi = () => {
    return request({
        url: '/api/wallpaper/bing',
        method: 'GET'
    })
}