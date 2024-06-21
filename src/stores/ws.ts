import { defineStore } from 'pinia'

export const useWsStore = defineStore('ws', {
    actions: {

    },

    // 真正存储数据的地方
    state() {
        return {
            wsHost: 'localhost',
            wsPort: '8082',
            wsBaseUrl: 'webSocket',
            wsUrl: [
                'task',
                'map'
            ]
        }
    }
})