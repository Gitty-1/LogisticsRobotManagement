export const setTokenToCookie = (token: string) => {
    const expires = new Date()
    // 设置cookie过期时间
    expires.setDate(expires.getDate() + 7)
    document.cookie = `token=${encodeURIComponent(token)}; expires=${expires.toUTCString}; path=/`
}

export const getToken = () => {
    const cookies = document.cookie.split(';')
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if(cookie.startsWith('token=')) {
            return decodeURIComponent(cookie.substring('token='.length))
        }
    }
    return null
}

export const  deleteToken = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
  