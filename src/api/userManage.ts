import request from '@/utils/request'

const baseURL = '/userManage'

export const getUserManageData = (params: any) => {
    return request({
        url: baseURL + '/page',
        method: 'get',
        params
    })
}

export const disableUser = (data: any) => {
    return request({
        url: baseURL + '/disableUserAccount',
        method: 'post',
        data
    })
}

export const enableUser = (data: any) => {
    return request({
        url: baseURL + '/enableUserAccount',
        method: 'post',
        data
    })
}