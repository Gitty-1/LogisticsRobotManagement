<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GoodsType } from './type';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    currentTaskProgressGoods: {
        type: Object as () => GoodsType,
        default: {}
    }
})
const emits = defineEmits(['updateTaskProgressVisible'])

const visible = ref(false)

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async () => {
    if (!visible.value) {
        emits('updateTaskProgressVisible')
    }
}, {})

const onCancel = () => {
    visible.value = false
}


const getTaskProgress = () => {
    const { currentExecuteTaskType, currentExecuteTaskStatus } = props.currentTaskProgressGoods
    type stringKey = Record<number, string>
    const taskProgressType: stringKey = {
        1: '装载货物',
        2: '运输货物',
        3: '运输货物',
        4: '货物上架',
    }
    const taskProgress: stringKey = {
        0: '未执行',
        1: '执行中',
        2: '已完成'
    }
    if(currentExecuteTaskType === 0) return '无任务'
    return `${taskProgressType[currentExecuteTaskType]} ${taskProgress[currentExecuteTaskStatus]}`
}

const getTaskProgressType = () => {
    const { currentExecuteTaskType, currentExecuteTaskStatus } = props.currentTaskProgressGoods
    return `${currentExecuteTaskType} ${currentExecuteTaskStatus}`
}

const getActiveCode = () => {
    const { currentExecuteTaskType, currentExecuteTaskStatus } = props.currentTaskProgressGoods
    if(currentExecuteTaskType === 1 && currentExecuteTaskStatus !== 2) return 0
    else if((currentExecuteTaskType === 2 || currentExecuteTaskType === 3) && currentExecuteTaskStatus !==2) return 1
    else if(currentExecuteTaskType === 4 && currentExecuteTaskStatus !== 2) return 2
    return null
}


</script>
<template>
    <el-dialog v-model="visible" width="60%" :closed="onCancel" class="task-progress-dialog">
        <el-tag>任务进度</el-tag>
        <div style="margin: 20px 0;">
            <el-tag type="info" >当前任务进度: {{ getTaskProgress() }}</el-tag>
        </div>
        <el-steps :active="getActiveCode()" finish-status="success">
            <el-step title="装载货物">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="getTaskProgressType() === '1 0'"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="getTaskProgressType() === '1 1'"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else-if="getTaskProgressType()[0] >= '1'"><SuccessFilled /></el-icon>
                </template>
            </el-step>
            <el-step title="运输货物">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="getTaskProgressType() === '2 0' || getTaskProgressType() === '3 0'"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="getTaskProgressType() === '2 1' || getTaskProgressType() === '3 1'"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else-if="getTaskProgressType()[0] >= '2'"><SuccessFilled /></el-icon>
                </template>
            </el-step>
            <el-step title="货物上架">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="getTaskProgressType() === '4 0'"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="getTaskProgressType() === '4 1'"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else-if="getTaskProgressType() >= '4'"><SuccessFilled /></el-icon>
                </template>
            </el-step>
        </el-steps>
    </el-dialog>
</template>
<style scoped>
</style>
