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

type stringKey = Record<number, string>

const getTaskProgress = () => {
    const { taskType } = props.currentTaskProgressGoods
    if(taskType === 0) return '未执行'
    else if(taskType === 1) return '执行中'
    else return '已完成'
}

const getActiveCode = () => {
    const { taskStatus } = props.currentTaskProgressGoods
    if(taskStatus === 1) return 0
    else if(taskStatus === 2 || taskStatus === 3) return 1
    else if(taskStatus === 4) return 2
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
                    <el-icon color="lightGrey" size="25" v-if="props.currentTaskProgressGoods.taskType === 0"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="props.currentTaskProgressGoods.taskType === 1"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else><SuccessFilled /></el-icon>
                </template>
            </el-step>
            <el-step title="运输货物">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="props.currentTaskProgressGoods.taskType <= 2"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="props.currentTaskProgressGoods.taskType === 3"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else><SuccessFilled /></el-icon>
                </template>
            </el-step>
            <el-step title="货物上架">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="props.currentTaskProgressGoods.taskType <= 4"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="props.currentTaskProgressGoods.taskType === 5"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else><SuccessFilled /></el-icon>
                </template>
            </el-step>
        </el-steps>
    </el-dialog>
</template>
<style scoped>
</style>
