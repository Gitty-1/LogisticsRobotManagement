import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    actions: {

    },

    // 真正存储数据的地方
    state() {
        return {
            userName: '',
            email: '',
            userType: 2
        }
    }
})