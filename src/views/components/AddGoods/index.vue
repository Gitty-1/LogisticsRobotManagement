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
const emits = defineEmits(['updateAddGoodsVisible'])

const visible = ref(false)

// 表单数据
interface RuleForm {
    goodsName: string,
    goodsType: string
}
const ruleFormRef = ref<FormInstance>()
const goodsForm = reactive<RuleForm>({
    goodsName: '',
    goodsType: ''
})
const rules = reactive<FormRules<RuleForm>>({
    goodsName: [
        {
            required: true,
            message: '请输入货物名称',
            trigger: 'blur'
        },
        {
            max: 10,
            message: '货物名称不能超过20字',
            trigger: 'change'
        }
    ],
    goodsType: [
        {
            required: true,
            message: '请选择货物类型',
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
        Object.keys(goodsForm).forEach((item: string) => goodsForm[item] = '')
        emits('updateAddGoodsVisible')
    }
}, {})

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, fields) => {
        if(valid) {
            messageBox(`确认添加货物：${goodsForm.goodsName}`, 'success', () => {
                message('添加成功', 'success')
                visible.value = false
            })
        }
    })
}


</script>
<template>
    <el-dialog v-model="visible" width="60%">
        <el-tag size="large">添加货物</el-tag>
        <el-form class="goods-form" ref="ruleFormRef" :model="goodsForm" :rules="rules">
            <el-form-item label="货物名称" prop="goodsName">
                <el-input v-model="goodsForm.goodsName" placeholder="请输入货物名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="货物类型" prop="goodsType">
                <el-radio-group v-model="goodsForm.goodsType">
                    <el-radio label="类型一">类型一</el-radio>
                    <el-radio label="类型二">类型二</el-radio>
                    <el-radio label="类型三">类型三</el-radio>
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
.goods-form {
    width: 80%;
    margin: 20px;
}
</style>
