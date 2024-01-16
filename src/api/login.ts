import axios from 'axios'

// const baseUrl = '/api'

export const login = (params: any) => {
    const data = axios.post('/api/login', params)
    return data
}