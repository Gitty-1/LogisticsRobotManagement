import request from '@/utils/request'

const baseURL = '/taskManage'

export const getTaskData = (params: any) => {
    return request({
        url: baseURL + '/page',
        method: 'get',
        params
    })
}

export const assignTask = (data: any) => {
    return request({
        url: baseURL + '/assignTask',
        method: 'post',
        data
    })
}

export const getAvailableRobot = (params: any) => {
    return request({
        url: baseURL + '/getAvailableRobot',
        method: 'get',
        params
    })
}

export const getShelfList = () => {
    return request({
        url: baseURL + '/getShelfList',
        method: 'get'
    })
}