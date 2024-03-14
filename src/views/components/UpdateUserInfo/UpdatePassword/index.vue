<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { message } from '@/utils/message'

import { updatePassword } from '@/api/user';

const props = defineProps({
    isReset: {
        type: Boolean,
        default: false
    }
})

interface RuleForm {
    password: string
    newPassword: string
}
const ruleFormRef = ref<FormInstance>()
const form = reactive<RuleForm>({
    password: '',
    newPassword: ''
})
const rules = reactive<FormRules<RuleForm>>({
    password: [
        {
            required: true,
            message: '请输入原密码',
            trigger: 'change'
        }
    ],
    newPassword: [
        {
            required: true,
            message: '请输入新密码',
            trigger: 'change'
        }
    ]
})

// 方法
const onsubmit = (formEl: FormInstance | undefined) => {
    if(!formEl) return
    formEl.validate((valid: any, _) => {
        if (valid) {
            const params = {
                oldPassword: form.password,
                newPassword: form.newPassword
            }
            updatePassword(params);
        }
    })
}

const onReset = () => {
    // @ts-ignore
    Object.keys(form).forEach((item: string) => form[item] = '')
}

watch(() => props.isReset, () => {
    console.log('111')
    onReset()
})

</script>
<template>
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="原密码" prop="password">
            <el-input v-model="form.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <div class="form-button">
                <el-button @click="onReset">重置</el-button>
                <el-button type="primary" @click="onsubmit(ruleFormRef)">确定</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>
<style scoped>
.form-button {
    margin: 0 auto;
}
</style>
