import { h } from 'vue'
import { ElMessage } from 'element-plus'

export const openMessage = (message: any, type: any) => {
    ElMessage({
        message, 
        type
    })
}