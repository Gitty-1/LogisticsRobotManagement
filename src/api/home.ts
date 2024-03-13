import request from '@/utils/request'

const baseURL = '/home'

export const getGoodsType = () => {
    return request({
        url: baseURL + '/goodsTypeChart',
        method: 'get'
    })
}

export const getDAU = () => {
    return request({
        url: baseURL + '/DAUChart',
        method: 'get'
    })
}