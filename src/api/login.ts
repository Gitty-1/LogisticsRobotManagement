import request from '@/utils/request'

export const login = (params: any) => {
    return request.post('/login', params)
}