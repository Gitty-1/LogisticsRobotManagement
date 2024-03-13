import request from '@/utils/request'

const baseURL = '/userManage'

export const getUserManageData = (params: any) => {
    return request({
        url: baseURL + '/page',
        method: 'get',
        params
    })
}