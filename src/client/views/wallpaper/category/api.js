import request from '@/utils/request'

export const getCategoryApi = () => {
    return request({
        url: '/api/wallpaper/category',
        method: 'GET'
    })
}

export const getListByCategoryApi = (data) => {
    return request({
        url: '/api/wallpaper/getListByCategory',
        method: 'GET',
        params: {
            ...data
        }
    })
}