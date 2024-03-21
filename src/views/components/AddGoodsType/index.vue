<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { messageBox } from '@/utils/message'
import type { RuleForm } from './type'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateGoodsTypeVisible'])

const visible = ref(false)

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, () => {
    if(!visible.value) {
        emits('updateGoodsTypeVisible')
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
            messageBox(`确认添加货物类型：${goodsTypeData.goodsTypeName}`, 'info', () => {
                // addGoods(goodsTypeData)
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
