import axios from "axios";
import { message } from '@/utils/message'
import { getCookie, deleteCookie } from "@/utils/setCookie"
import router from "@/router";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000
})

// 异常处理
const errorHandle = (error: any) => {
    console.log('error', error)
    const code = error?.response?.status
    const msg = error?.response?.data || '服务器异常'
    message(msg, 'error')
    if(code === 401) {
        deleteCookie()
        router.push('/login-register')
    }
    return Promise.reject(error)
}

const successHandle = (response: any) => {
    const data = response?.data
    const { code, msg } = data as any
    if(code !== '200') {
        message(msg, 'error')
        if(msg !== '验证码错误') {
            throw new Error('请求失败')
        }
    } else {
        message(msg, 'success')
    }
    return data
}

// 请求拦截器
request.interceptors.request.use(
    config => {
        const token = getCookie('token')
        if(token) {
            config.headers.Authorization = `${token}`
        }
        return config;
    },
    error => {
        error.data = {}
        error.data.msg = '服务器异常'
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response: any) => successHandle(response),
    (error: any) => errorHandle(error)
)

export default request