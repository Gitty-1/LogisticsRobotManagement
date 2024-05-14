import request from '@/utils/request'

const baseURL = '/map'

export const getGoodsList = () => {
    return request({
        url: baseURL + '/getGoodsList',
        method: 'get'
    })
}

export const getScheme = (goodsId: number) => {
    return request({
        url: baseURL + `/getScheme/${goodsId}`,
        method: 'get'
    })
}

export const getMap = (goodsId: number) => {
    return request({
        url: baseURL + `/getMap/${goodsId}`,
        method: 'get'
    })
}