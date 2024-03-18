<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message ,messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { addShelves } from '@/api/manage'
import router from '@/router';
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
    shelfName: string,
    shelfType: number
}
const ruleFormRef = ref<FormInstance>()
const shelvesForm = reactive<RuleForm>({
    shelfName: '',
    shelfType: 0
})

const rules = reactive<FormRules<RuleForm>>({
    shelfName: [
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
    shelfType: [
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
            messageBox(`确认添加货架：${shelvesForm.shelfName}`, 'info', () => {
                addShelves(shelvesForm)
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
            <el-form-item label="货架名称" prop="shelfName">
                <el-input v-model="shelvesForm.shelfName" placeholder="请输入货架名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="货架类型" prop="shelfType">
                <el-radio-group v-model="shelvesForm.shelfType">
                    <el-radio :label="1">small</el-radio>
                    <el-radio :label="2">middle</el-radio>
                    <el-radio :label="3">large</el-radio>
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
