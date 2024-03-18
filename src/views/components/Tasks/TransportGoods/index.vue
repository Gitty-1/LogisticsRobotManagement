<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { message } from '@/utils/message';


const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateTransportGoodsVisible'])

const visible = ref(false)


const transportRobots = [
  {
    id: 1,
    value: '运送机器人1'
  },
  {
    id: 2,
    value: '运送机器人2'
  },
  {
    id: 3,
    value: '运送机器人3'
  }
]

interface RuleForm {
    robotType: number | null,
    transportRobot: String,
    loadRobot: String
}
const ruleFormRef = ref<FormInstance>()
interface TransportGoodsType {
    robotType: number | null,
    transportRobot: string,
    loadRobot: string
}
const transportGoodsData = reactive<TransportGoodsType>({
    robotType: null,
    transportRobot: '',
    loadRobot: ''
})
const validateLoadRobot = (rule: any, value: any, callback: any) => {
    if(transportGoodsData.robotType === 1) {
        if(value === '') {
            callback(new Error('请选择装载机器人'))
        }
    }
    callback()
}
const rules = reactive<FormRules<RuleForm>>({
    robotType: [
        {
            required: true,
            message: '请选择机器人类别',
            trigger: 'blur'
        }
    ],
    transportRobot: [
        {
            required: true,
            message: '请选择运送机器人',
            trigger: 'blur'
        }
    ],
    loadRobot: [
        {
            validator: validateLoadRobot
        }
    ]
})

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, (newValue) => {
    if(!visible.value) {
      // @ts-ignore
      Object.keys(transportGoodsData).forEach((item: string) => transportGoodsData[item] = '')
      emits('updateTransportGoodsVisible')
    }
}, {})

const onCancel = () => {
    visible.value = false
}
const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, _) => {
        if(valid) {
        message('添加成功', 'success')
        visible.value = false
        }
    })
}
</script>
<template>
  <el-dialog v-model="visible" width="60%">
    <el-tag size="large">运送货物</el-tag>
    <el-form class="load-form" ref="ruleFormRef" :model="transportGoodsData" :rules="rules" label-width="auto">
        <el-form-item label="机器人类型" prop="robotType">
            <el-radio-group v-model="transportGoodsData.robotType">
                <el-radio :label="1">机械臂装载机器人</el-radio>
                <el-radio :label="2">装载机器人</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="运送机器人" prop="transportRobot">
            <el-select v-model="transportGoodsData.transportRobot" placeholder="请选择运送货物机器人" filterable clearable no-match-text="无匹配选项">
                <el-option v-for="item in transportRobots" :key="item.id" :label="item.value" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-space fill v-show="transportGoodsData.robotType === 1">
            <el-alert type="info" show-icon :closable="false" center>请选择一台装载机器人用于夹取货物</el-alert>
            <el-form-item label="装载机器人" prop="loadRobot">
                <el-select v-model="transportGoodsData.loadRobot" placeholder="请选择装载机器人" filterable clearable no-match-text="无匹配选项">
                    <el-option v-for="item in transportRobots" :key="item.id" :label="item.value" :value="item.value"></el-option>
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
