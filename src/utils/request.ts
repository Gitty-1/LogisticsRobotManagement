import axios from "axios";
import { message } from '@/utils/message'
import { getToken } from "@/utils/setCookie"

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000
})

// 异常处理
const errorHandle = (error: any) => {
    const data = error?.data
    const errorMessage = data ? data.msg : '网络错误'
    message(errorMessage, 'error')
    return Promise.reject(error)
}

const successHandle = (response: any) => {
    const data = response?.data
    const { code, msg } = data
    if(code !== '200') {
        message(msg, 'error')
        return Promise.reject(new Error())
    }
    return data
}

// 请求拦截器
request.interceptors.request.use(
    config => {
        const token = getToken()
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