import axios from "axios";
import { message } from '@/utils/message'

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000
})

// 异常处理
const errorHandle = (response: any) => {
    const data = response?.data
    const errorMessage = data ? data.msg : '网络错误'
    message(errorMessage, 'error')
    return Promise.reject()
}

const successHandle = (response: any) => {
    const data = response?.data
    message(data.msg, 'success')
    return data
}

// 请求拦截器
request.interceptors.request.use(
    config => {
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