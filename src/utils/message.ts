import { ElMessage, ElMessageBox } from 'element-plus'

export const message = (message: any, type: any) => {
    ElMessage({
        message, 
        type
    })
}

export const messageBox = (message: string, type: any, done: () => void) => {
    ElMessageBox.confirm(message, '提示', {
        type,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(() => {
        done()
    })
}