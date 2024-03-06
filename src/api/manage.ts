import request from '@/utils/request'

export const getGoodsData = (params: any) => {
    return request({
        url: '/goodsManage/page',
        method: 'get',
        params
    })
}

export const addGoods = (data: any) => {
    return request({
        url: '/goodsManage/AddGoods',
        method: 'post',
        data
    })
}

export const getShelvesData = (params: any) => {
    return request({
        url: '/shelfManage/page',
        method: 'get',
        params
    })
}

export const addShelves = (data: any) => {
    return request({
        url: '/shelfManage/addShelf',
        method: 'post',
        data
    })
}