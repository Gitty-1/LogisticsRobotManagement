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

export const getAssignTaskCountChart = () => {
    return request({
        url: baseURL + '/assignTaskCountChart',
        method: 'get'
    })
}

export const getGoodsShelvingCountChart = () => {
    return request({
        url: baseURL + '/goodsShelvingCountChart',
        method: 'get'
    })
}