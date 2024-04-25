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
        url: '/goodsManage/addGoods',
        method: 'post',
        data
    })
}

export const getGoodsType = () => {
    return request({
        url: '/goodsManage/addGoods/getGoodsType',
        method: 'get'
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

export const getRobotsData = (params: any) => {
    return request({
        url: '/robotManage/page',
        method: 'get',
        params
    })
}

export const addRobots = (data: any) => {
    return request({
        url: '/robotManage/addRobot',
        method: 'post',
        data
    })
}