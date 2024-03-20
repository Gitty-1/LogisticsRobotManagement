<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message ,messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { addGoods, getGoodsType } from '@/api/manage'
import type { GoodsType } from '@/views/assignTask.vue';

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
const taskProgressType: stringKey = {
    0: '未装载',
    1: '装载中',
    2: '装载完成',
    3: '运输中',
    4: '运输完成',
    5: '上架中',
    6: '上架完成'
}

const getActiveCode = () => {
    const taskStatus = props.currentTaskProgressGoods.taskStatus
    if(taskStatus < 2) return 0
    else if(taskStatus < 4) return 1
    else if(taskStatus < 6) return 2
    return null
}


</script>
<template>
    <el-dialog v-model="visible" width="60%" :closed="onCancel" class="task-progress-dialog">
        <el-tag>任务进度</el-tag>
        <div style="margin: 20px 0;">
            <el-tag type="info" >当前任务进度: {{ taskProgressType[props.currentTaskProgressGoods.taskStatus] }}</el-tag>
        </div>
        <el-steps :active="getActiveCode()" finish-status="success">
            <el-step title="装载货物">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="props.currentTaskProgressGoods.taskStatus === 0"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="props.currentTaskProgressGoods.taskStatus === 1"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else><SuccessFilled /></el-icon>
                </template>
            </el-step>
            <el-step title="运输货物">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="props.currentTaskProgressGoods.taskStatus <= 2"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="props.currentTaskProgressGoods.taskStatus === 3"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else><SuccessFilled /></el-icon>
                </template>
            </el-step>
            <el-step title="货物上架">
                <template #icon>
                    <el-icon color="lightGrey" size="25" v-if="props.currentTaskProgressGoods.taskStatus <= 4"><RemoveFilled /></el-icon>
                    <el-icon color="deepSkyblue" size="25" v-else-if="props.currentTaskProgressGoods.taskStatus === 5"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="25" v-else><SuccessFilled /></el-icon>
                </template>
            </el-step>
        </el-steps>
    </el-dialog>
</template>
<style scoped>
</style>
