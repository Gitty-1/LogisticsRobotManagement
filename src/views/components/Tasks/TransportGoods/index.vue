<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { message } from '@/utils/message';
import type { RuleForm, GoodsType, RobotType } from './type';
import { assignTask, getAvailableRobot } from '@/api/assignTask';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    currentTransportGoods: {
        type: Object as () => GoodsType,
        default: {}
    }
})
const emits = defineEmits(['updateTransportGoodsVisible'])

const visible = ref(false)


const ruleFormRef = ref<FormInstance>()

const transportGoodsData = reactive<RuleForm>({
    robotType: null,
    armsTransportRobot: '',
})
const validateArmsTransportRobot = (rule: any, value: any, callback: any) => {
    if(transportGoodsData.robotType === 1) {
        if(value === '') {
            callback(new Error('请选择机械臂装载机器人'))
        }
    }
    callback()
}
const rules = reactive<FormRules<RuleForm>>({
    robotType: [
        {
            required: true,
            message: '请选择机器人类别',
            trigger: 'change'
        }
    ],
    armsTransportRobot: [
        {
            validator: validateArmsTransportRobot,
            trigger: 'blur'
        }
    ],
})
const transportRobots = ref<RobotType[]>()

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async (newValue) => {
    if(!visible.value) {
      // @ts-ignore
      Object.keys(transportGoodsData).forEach((item: string) => transportGoodsData[item] = '')
      emits('updateTransportGoodsVisible')
    } else {
        const res = await getAvailableRobot({taskType: 2})
        const { data } = res
        transportRobots.value = data
    }
}, {})

const onCancel = () => {
    visible.value = false
}
const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate(async (valid, _) => {
        if(valid) {
            let taskType
            if(transportGoodsData.robotType === 1) {
                taskType = 2
            } else {
                taskType = 3
            }
            const data = {
                taskType: taskType,
                robotId: 1,
                goodsId: props.currentTransportGoods.goodsId,
                targetShelfId: null
            }
            await assignTask(data)
            visible.value = false
        }
    })
}
</script>
<template>
  <el-dialog v-model="visible" width="60%">
    <el-tag size="large">运输货物</el-tag>
    <div style="margin-top: 20px;">
        <el-tag type="info">待运输货物：{{ props.currentTransportGoods.goodsName }}</el-tag>
    </div>
    <el-form class="load-form" ref="ruleFormRef" :model="transportGoodsData" :rules="rules" label-width="auto">
        <el-space fill>
            <el-alert type="info" show-icon :closable="false" center>请选择是否需要机械臂装载机器人</el-alert>
            <el-form-item prop="robotType">
                <el-radio-group v-model="transportGoodsData.robotType">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-space>
        <el-space fill v-show="transportGoodsData.robotType === 1">
            <el-alert type="info" show-icon :closable="false" center>请选择一台机械臂装载机器人用于夹取货物</el-alert>
            <el-form-item label="机械臂装载机器人" prop="armsTransportRobot">
                <el-select v-model="transportGoodsData.armsTransportRobot" placeholder="请选择机械臂装载机器人" filterable clearable no-match-text="无匹配选项">
                    <el-option v-for="item in transportRobots" :key="item.robotId" :label="item.robotName" :value="item.robotName"></el-option>
                </el-select>
            </el-form-item>
        </el-space>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="onCancel">取消</el-button>
                <el-button type="primary" @click="onOk(ruleFormRef)">确定</el-button>
            </span>
        </template>
  </el-dialog>
</template>
<style scoped>
.load-form {
    width: 80%;
    margin: 20px;
}
</style>
