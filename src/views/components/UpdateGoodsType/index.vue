<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { message, messageBox } from '@/utils/message'
import type { GoodsType } from './type'
import { getGoodsType, updateGoodsType } from '@/api/manage'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateUpdateGoodsTypeVisible'])

const visible = ref(false)

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async () => {
    if(!visible.value) {
        // @ts-ignore
        Object.keys(goodsTypeData).forEach((item: any) => goodsTypeData[item] = '')
        emits('updateUpdateGoodsTypeVisible')
    } else {
        const res = await getGoodsType()
        const { data } = res
        goodsTypeList.value = data
    }
})

const ruleFormRef = ref<FormInstance>()

const goodsTypeData = reactive<GoodsType>({
    goodsTypeId: null,
    goodsTypeName: ''
})
const rules = reactive<FormRules<GoodsType>>({
    goodsTypeId: [
        {
            required: true,
            message: '请选择货物类型',
            trigger: 'blur'
        }
    ],
    goodsTypeName: [
        {
            required: true,
            message: '请输入货物类型',
            trigger: 'blur'
        }
    ]
})

const goodsTypeList = ref<GoodsType[]>()

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, _) => {
        if(valid) {
            messageBox(`确认更新货物类型为 ${goodsTypeData.goodsTypeName}`, 'info', async () => {
                await updateGoodsType(goodsTypeData)
                message('编辑成功', 'success')
                visible.value = false
            })
            
        }
    })
}
</script>
<template>
    <el-dialog v-model="visible">
        <el-tag size="large">编辑货物类型</el-tag>
        <el-form class="goods-type-form" ref="ruleFormRef" :model="goodsTypeData" :rules="rules" label-width="auto">
            <el-form-item label="原货物类型名称" prop="oldGoodsTypeName">
                <el-select v-model="goodsTypeData.goodsTypeId" placeholder="请选择原货物类型名称" filterable clearable no-match-text="无匹配选项">
                    <el-option v-for="item in goodsTypeList" :key="item.goodsTypeId" :label="item.goodsTypeName" :value="item.goodsTypeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新货物类型名称" prop="newGoodsTypeName">
                <el-input v-model="goodsTypeData.goodsTypeName" placeholder="请输入新货物类型名称"></el-input>
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
