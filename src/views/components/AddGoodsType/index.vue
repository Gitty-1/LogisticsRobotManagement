<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { message, messageBox } from '@/utils/message'
import type { RuleForm } from './type'
import { addGoodsType } from '@/api/manage';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateAddGoodsTypeVisible'])

const visible = ref(false)

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, () => {
    if(!visible.value) {
        // @ts-ignore
        Object.keys(goodsTypeData).forEach((item: any) => goodsTypeData[item] = '')
        emits('updateAddGoodsTypeVisible')
    }
})

const ruleFormRef = ref<FormInstance>()

const goodsTypeData = reactive<RuleForm>({
    goodsTypeName: ''
})
const rules = reactive<FormRules<RuleForm>>({
    goodsTypeName: [
        {
            required: true,
            message: '请输入货物类型',
            trigger: 'blur'
        }
    ]
})

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, _) => {
        if(valid) {
            messageBox(`确认添加货物类型：${goodsTypeData.goodsTypeName}`, 'info', async () => {
                await addGoodsType(goodsTypeData)
                message('添加成功', 'success')
                visible.value = false
            })
            
        }
    })
}
</script>
<template>
    <el-dialog v-model="visible">
        <el-tag size="large">添加货物类型</el-tag>
        <el-form class="goods-type-form" ref="ruleFormRef" :model="goodsTypeData" :rules="rules" label-width="auto">
            <el-form-item label="货物类型名称" prop="goodsTypeName">
                <el-input v-model="goodsTypeData.goodsTypeName" placeholder="请输入货物类型名称"></el-input>
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
.goods-type-form {
    width: 80%;
    margin: 20px;
}
</style>
