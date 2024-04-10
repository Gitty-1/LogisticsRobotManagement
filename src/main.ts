import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as Icons from '@element-plus/icons'
import * as echarts from 'echarts'

import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)


Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})

app.config.globalProperties.$echarts = echarts

app.mount('#app')

