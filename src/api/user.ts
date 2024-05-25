import request from '@/utils/request'

const baseURL = '/userCenter'

export const getUserInfo = () => {
    return request({
        url: baseURL + '/info',
        method: 'get'
    })
}

export const updatePassword = (data: any) => {
    return request({
        url: baseURL + '/updatePassword',
        method: 'post',
        data
    })
}

export const updateUsername = (data: any) => {
    return request({
        url: baseURL + '/updateUsername',
        method: 'post',
        data
    })
}

export const logout = () => {
    return request({
        url: baseURL + '/logout',
        method: 'post',
    })
}
