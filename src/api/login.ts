import request from '@/utils/request'

const baseURL = '/login-register'

// 登录
export const login = (data: any) => {
    return request({
        url: baseURL + '/login',
        method: 'post',
        data
    })
}

// 获取验证码图片
export const getCaptcha = (captchaKey: string) => {
    return request({
        url: baseURL + `/captcha/${captchaKey}`,
        method: 'get'
    })
}

// 注册
export const register = (data: any) => {
    return request({
        url: baseURL + '/register',
        method: 'post',
        data
    })
}

// 发送邮箱验证码
export const validateCode = (data: any) => {
    return request({
        url: baseURL + '/validateCode',
        method: 'post',
        data
    })
}
