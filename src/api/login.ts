import request from '@/utils/request'

// 登录
export const login = (data: any) => {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

// 获取验证码图片
export const getCaptcha = (captchaKey: string) => {
    return request({
        url: `/captcha/${captchaKey}`,
        method: 'get'
    })
}
