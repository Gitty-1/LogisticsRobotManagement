<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message ,messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateAddShelvesVisible'])

const visible = ref(false)

// 表单数据
interface RuleForm {
    shelvesName: string,
    shelvesType: string
}
const ruleFormRef = ref<FormInstance>()
const shelvesForm = reactive<RuleForm>({
    shelvesName: '',
    shelvesType: ''
})
const rules = reactive<FormRules<RuleForm>>({
    shelvesName: [
        {
            required: true,
            message: '请输入货架名称',
            trigger: 'change'
        },
        {
            max: 10,
            message: '货架名称不能超过20字',
            trigger: 'change'
        }
    ],
    shelvesType: [
        {
            required: true,
            message: '请选择货架类型',
            trigger: 'change'
        }
    ]
})


watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, () => {
    if (!visible.value) {
        // @ts-ignore
        Object.keys(shelvesForm).forEach((item: string) => shelvesForm[item] = '')
        emits('updateAddShelvesVisible')
    }
}, {})

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, fields) => {
        if(valid) {
            messageBox(`确认添加货架：${shelvesForm.shelvesName}`, 'success', () => {
                message('添加成功', 'success')
                visible.value = false
            })
        }
    })
}


</script>
<template>
    <el-dialog v-model="visible" width="60%">
        <el-tag size="large">添加货架</el-tag>
        <el-form class="shelves-form" ref="ruleFormRef" :model="shelvesForm" :rules="rules">
            <el-form-item label="货架名称" prop="shelvesName">
                <el-input v-model="shelvesForm.shelvesName" placeholder="请输入货架名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="货架类型" prop="shelvesType">
                <el-radio-group v-model="shelvesForm.shelvesType">
                    <el-radio label="small">small</el-radio>
                    <el-radio label="middle">middle</el-radio>
                    <el-radio label="large">large</el-radio>
                </el-radio-group>
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
.shelves-form {
    width: 80%;
    margin: 20px;
}
</style>
