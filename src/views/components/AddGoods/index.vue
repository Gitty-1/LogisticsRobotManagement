<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message, messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { addGoods, getGoodsType } from '@/api/manage'
import type { GoodsTypeDataType, RuleForm } from './type'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateAddGoodsVisible'])

const visible = ref(false)

const goodsTypeData = ref<GoodsTypeDataType[]>()

const ruleFormRef = ref<FormInstance>()

const goodsForm = reactive<RuleForm>({
    goodsName: '',
    goodsTypeId: null,
    details: '',
    positionX: null,
    positionY: null

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
            message: '货物名称不能超过10字',
            trigger: 'change'
        }
    ],
    goodsTypeId: [
        {
            required: true,
            message: '请选择货物类型',
            trigger: 'blur'
        }
    ],
    positionX: [
        {
            required: true,
            message: '请输入货物位置(x)',
            trigger: 'blur'
        }
    ],
    positionY: [
        {
            required: true,
            message: '请输入货物位置(y)',
            trigger: 'blur'
        }
    ],
})


watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async () => {
    if (!visible.value) {
        // @ts-ignore
        Object.keys(goodsForm).forEach((item: string) => goodsForm[item] = '')
        emits('updateAddGoodsVisible')
    } else {
        const res = await getGoodsType()
        const { data } = res
        goodsTypeData.value = data
    }
}, {})

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, fields) => {
        if(valid) {
            messageBox(`确认添加货物：${goodsForm.goodsName}`, 'info', () => {
                addGoods(goodsForm)
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
        <el-form class="goods-form" ref="ruleFormRef" :model="goodsForm" :rules="rules" label-width="100px">
            <el-form-item label="货物名称" prop="goodsName">
                <el-input v-model="goodsForm.goodsName" placeholder="请输入货物名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="货物类型" prop="goodsTypeId">
                <el-select v-model="goodsForm.goodsTypeId" placeholder="请选择货物类型" filterable clearable style="width: 30%" no-match-text="无匹配选项">
                    <el-option v-for="item in goodsTypeData" :key="item.goodsTypeId" :label="item.goodsTypeName" :value="item.goodsTypeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货物描述" prop="details">
                <el-input v-model="goodsForm.details" type="textarea" placeholder="请输入货物描述" autosize></el-input>
            </el-form-item>
            <el-form-item label="货物位置(x)" prop="positionX">
                <el-input v-model="goodsForm.positionX" placeholder="请输入货物位置(x)" clearable style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="货物位置(y)" prop="positionY">
                <el-input v-model="goodsForm.positionY" placeholder="请输入货物位置(y)" clearable style="width: 150px;"></el-input>
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
