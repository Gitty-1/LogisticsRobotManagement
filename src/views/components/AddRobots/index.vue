<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message, messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { addRobots } from '@/api/manage';
import type { RuleForm } from './type';
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateAddRobotsVisible'])

const visible = ref(false)

const ruleFormRef = ref<FormInstance>()

const robotsForm = reactive<RuleForm>({
    robotName: '',
    robotType: 0,
    robotIP: ''
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
            max: 20,
            message: '机器人名称不能超过20字',
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
watch(() => visible.value, () => {
    if (!visible.value) {
        // @ts-ignore
        Object.keys(robotsForm).forEach((item: string) => robotsForm[item] = '')
        emits('updateAddRobotsVisible')
    }
}, {})

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, fields) => {
        if(valid) {
            messageBox(`确认添加机器人：${robotsForm.robotName}`, 'info', () => {
                addRobots(robotsForm)
                message('添加成功', 'success')
                visible.value = false
            })
        }
    })
}


</script>
<template>
    <el-dialog v-model="visible" width="60%">
        <el-tag size="large">添加机器人</el-tag>
        <el-form class="robots-form" ref="ruleFormRef" :model="robotsForm" :rules="rules" label-width="100px">
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
.robots-form {
    width: 80%;
    margin: 20px;
}
</style>
