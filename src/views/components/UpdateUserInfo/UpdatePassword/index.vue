<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm } from './type'


import { updatePassword } from '@/api/user';
import { encrypt } from "@/utils/encrypt"
import { getPublicKey } from '@/api/login'

const props = defineProps({
    isReset: {
        type: Boolean,
        default: false
    }
})

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
        },
        {
            min: 6,
            max: 20,
            message: '密码长度为6-20',
            trigger: 'blur'
        }
    ],
    newPassword: [
        {
            required: true,
            message: '请输入新密码',
            trigger: 'change'
        },
        {
            min: 6,
            max: 20,
            message: '密码长度为6-20',
            trigger: 'blur'
        }
    ]
})

// 方法
const onsubmit = (formEl: FormInstance | undefined) => {
    if(!formEl) return
    formEl.validate(async (valid: any, _) => {
        if (valid) {
            const res1 = await getPublicKey()
            const publicKey = res1.data.publicKey
            const params = {
                oldPassword: encrypt(publicKey, form.password),
                newPassword: encrypt(publicKey, form.newPassword)
            }
            await updatePassword(params);
        }
    })
}

const onReset = () => {
    // @ts-ignore
    Object.keys(form).forEach((item: string) => form[item] = '')
}

watch(() => props.isReset, () => {
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
