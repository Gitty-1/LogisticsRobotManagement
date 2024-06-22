import { defineStore } from 'pinia'

const serverIP = window.location.hostname

export const useWsStore = defineStore('ws', {
    actions: {

    },

    // 真正存储数据的地方
    state() {
        return {
            wsHost: serverIP,
            wsPort: '8082',
            wsBaseUrl: 'webSocket',
            wsUrl: [
                'task',
                'map'
            ]
        }
    }
})