import request from '@/utils/request'

const baseURL = '/map'


export const getRobotPath = (robotId: number) => {
    return request({
        url: baseURL + `/getRobotPath/${robotId}`,
        method: 'get'
    })
}

export const getRobotList = () => {
    return request({
        url: baseURL + '/getRobotList',
        method: 'get'
    })
}

export const getMap = () => {
    return request({
        url: baseURL + '/getMap',
        method: 'get'
    })
}