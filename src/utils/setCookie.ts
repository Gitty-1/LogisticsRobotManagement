export const setTokenToCookie = (token: string) => {
    const expires = new Date()
    // 设置cookie过期时间
    expires.setDate(expires.getDate() + 7)
    document.cookie = `token=${encodeURIComponent(token)}; expires=${expires.toUTCString}; path=/`
}

export const getCookie = (msg: string) => {
    const cookies = document.cookie.split(';')
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if(cookie.startsWith(`${msg}=`)) {
            return decodeURIComponent(cookie.substring(`${msg}=`.length))
        }
    }
    return ''
}

export const deleteCookie = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export const setUserMsgToCookie = (user: any) => {
    const expires = new Date()
    // 设置cookie过期时间
    expires.setDate(expires.getDate() + 7)
    document.cookie = `username=${encodeURIComponent(user.username)}; expires=${expires.toUTCString}; path=/`
    document.cookie = `email=${encodeURIComponent(user.email)}; expires=${expires.toUTCString}; path=/`
    document.cookie = `userType=${encodeURIComponent(user.userType)}; expires=${expires.toUTCString}; path=/`
}

  