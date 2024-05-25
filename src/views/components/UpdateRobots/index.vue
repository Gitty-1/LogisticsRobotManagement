<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message, messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { updateRobots } from '@/api/manage'
import type { RuleForm } from './type'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    currentRobots: {
        type: Object as () => RuleForm,
        default: () => {}
    }
})
const emits = defineEmits(['updateUpdateRobotsVisible'])

const visible = ref(false)

const ruleFormRef = ref<FormInstance>()

let robotsForm = reactive<RuleForm>({
    robotId: 0,
    robotName: '',
    robotType: 0,
    robotStatus: 0,
    robotIP: '',
    isOnline: 0
})

const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const rules = reactive<FormRules<RuleForm>>({
    robotName: [
        {
            required: true,
            message: '请输入机器人名称',
            trigger: 'blur'
        },
        {
            max: 10,
            message: '机器人名称不能超过10字',
            trigger: 'change'
        }
    ],
    robotType: [
        {
            required: true,
            message: '请选择机器人类型',
            trigger: 'blur'
        }
    ],
    robotIP: [
        {
            required: true,
            message: '请输入机器人IP',
            trigger: 'blur'
        },
        {
            pattern: ipPattern,
            message: '请输入合法的IP地址',
            trigger: 'blur'
        }
    ]
})


watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async () => {
    if (!visible.value) {
        emits('updateUpdateRobotsVisible')
    } else {
        robotsForm.robotId = props.currentRobots.robotId
        robotsForm.robotName = props.currentRobots.robotName
        robotsForm.robotType = props.currentRobots.robotType
        robotsForm.robotIP = props.currentRobots.robotIP
    }
}, {})

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, fields) => {
        if(valid) {
            messageBox(`确认更新机器人：${robotsForm.robotName}`, 'info', () => {
                const data = {
                    robotId: robotsForm.robotId,
                    robotName: robotsForm.robotName,
                    robotType: robotsForm.robotType,
                    robotIP: robotsForm.robotIP
                }
                updateRobots(data)
                message('编辑成功', 'success')
                visible.value = false
            })
            
        }
    })
}
</script>
<template>
    <el-dialog v-model="visible" width="60%">
        <el-tag size="large">编辑机器人</el-tag>
        <el-form class="robots-form" ref="ruleFormRef" :model="robotsForm" :rules="rules" label-width="100px">
            <el-form-item label="机器人id" prop="robotId">
                <el-input v-model="robotsForm.robotId" disabled clearable></el-input>
            </el-form-item>
            <el-form-item label="机器人名称" prop="robotName">
                <el-input v-model="robotsForm.robotName" placeholder="请输入机器人名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="机器人类型" prop="robotType">
                <el-radio-group v-model="robotsForm.robotType">
                    <el-radio :label="1">装载机器人</el-radio>
                    <el-radio :label="2">机械臂装载机器人</el-radio>
                    <el-radio :label="3">机械臂</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="机器人IP" prop="robotIP">
                <el-input v-model="robotsForm.robotIP" placeholder="请输入机器人IP" clearable style="width: 150px;"></el-input>
            </el-form-item>
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
</style>
