import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    actions: {

    },

    // 真正存储数据的地方
    state() {
        return {
            userName: 'zhengguihao',
            email: '123456789@qq.com',
            userType: '普通用户'
        }
    }
})