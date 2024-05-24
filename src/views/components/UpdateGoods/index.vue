<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message, messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { updateGoods, getGoodsType } from '@/api/manage'
import type { GoodsTypeDataType, RuleForm } from './type'
import { validatePositionX, validatePositionY } from '@/utils/validatePosition'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    currentGoods: {
        type: Object as () => RuleForm,
        default: () => {}
    }
})
const emits = defineEmits(['updateUpdateGoodsVisible'])

const visible = ref(false)

const ruleFormRef = ref<FormInstance>()

const goodsTypeData = ref<GoodsTypeDataType[]>()

let goodsForm = reactive<RuleForm>({
    goodsId: 0,
    goodsName: '',
    goodsTypeId: 0,
    goodsTypeName: '',
    details: '',
    positionX: 0,
    positionY: 0,
    goodsStatus: 0,
    createTime: null,
    shelvingTime: '',
    shelfId: 0,

})


const rules = reactive<FormRules<RuleForm>>({
    goodsId: [
        {
            required: true,
            message: '请输入货物id',
            trigger: 'blur'
        },
    ],
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
        },
        {
            validator: validatePositionX
        }
    ],
    positionY: [
        {
            required: true,
            message: '请输入货物位置(y)',
            trigger: 'blur'
        },
        {
            validator: validatePositionY
        }
    ],
})


watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async () => {
    if (!visible.value) {
        emits('updateUpdateGoodsVisible')
    } else {
        goodsForm.goodsId = props.currentGoods.goodsId
        goodsForm.goodsName = props.currentGoods.goodsName
        goodsForm.goodsTypeId = props.currentGoods.goodsTypeId
        goodsForm.details = props.currentGoods.details
        goodsForm.positionX = props.currentGoods.positionX
        goodsForm.positionY = props.currentGoods.positionY
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
            messageBox(`确认更新货物：${goodsForm.goodsName}`, 'info', () => {
                const data = {
                    goodsId: goodsForm.goodsId,
                    goodsName: goodsForm.goodsName,
                    goodsTypeId: goodsForm.goodsTypeId,
                    details: goodsForm.details,
                    positionX: goodsForm.positionX,
                    positionY: goodsForm.positionY
                }
                updateGoods(data)
                message('编辑成功', 'success')

                visible.value = false
            })
            
        }
    })
}
</script>
<template>
    <el-dialog v-model="visible" width="60%">
        <el-tag size="large">编辑货物</el-tag>
        <el-form class="goods-form" ref="ruleFormRef" :model="goodsForm" :rules="rules" label-width="100px">
            <el-form-item label="货物id" prop="goodsId">
                <el-input v-model="goodsForm.goodsId" placeholder="请输入货物名称" clearable></el-input>
            </el-form-item>
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
</style>
