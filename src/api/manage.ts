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

export const updateGoods = (data: any) => {
    return request({
        url: '/goodsManage/updateGoods',
        method: 'post',
        data
    })
}

export const deleteGoods = (goodsId: number) => {
    return request({
        url: `/goodsManage/deleteGoods/${goodsId}`,
        method: 'delete',
    })
}

export const addGoodsType = (data: any) => {
    return request({
        url: '/goodsManage/goodsTypeManage/addGoodsType',
        method: 'post',
        data
    })
}

export const updateGoodsType = (data: any) => {
    return request({
        url: '/goodsManage/goodsTypeManage/updateGoodsType',
        method: 'post',
        data
    })
}

export const deleteGoodsType = (goodsTypeId: number) => {
    return request({
        url: `/goodsManage/goodsTypeManage/deleteGoodsType/${goodsTypeId}`,
        method: 'delete'
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

export const updateShelves = (data: any) => {
    return request({
        url: '/shelfManage/updateShelf',
        method: 'post',
        data
    })
}

export const deleteShelves = (shelfId: number) => {
    return request({
        url: `/shelfManage/deleteShelf/${shelfId}`,
        method: 'delete'
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

export const updateRobots = (data: any) => {
    return request({
        url: '/robotManage/updateRobot',
        method: 'post',
        data
    })
}

export const deleteRobots = (robotId: number) => {
    return request({
        url: `/robotManage/deleteRobot/${robotId}`,
        method: 'delete'
    })
}