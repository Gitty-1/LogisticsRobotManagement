<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message, messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { updateShelves } from '@/api/manage'
import type { RuleForm } from './type'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    currentShelves: {
        type: Object as () => RuleForm,
        default: () => {}
    }
})
const emits = defineEmits(['updateUpdateShelvesVisible'])

const visible = ref(false)

const ruleFormRef = ref<FormInstance>()

let shelvesForm = reactive<RuleForm>({
    shelfId: 0,
    shelfName: '',
    shelfStatus: 0,
    shelfType: 0,
    goodsAmount: 0,
    createTime: '',
    positionX: 0,
    positionY: 0

})

type numStrKey = Record<number, string>
const shelfType: numStrKey = {
  1: 'small',
  2: 'middle',
  3: 'large'
}

// 校验货架坐标值
const validatePositionX = (rule: any, value: any, callback: any) => {
    const minValue = 0;
    const maxValue = 700;

    if (isNaN(value)) { // 判断输入是否为数字
        callback(new Error('请输入数字'));
    } else if (value < minValue || value > maxValue) { // 判断输入是否在指定范围内
        callback(new Error(`请输入合法坐标值(${minValue}-${maxValue})`));
    } else {
        callback();
    }
}
const validatePositionY = (rule: any, value: any, callback: any) => {
    const minValue = 50;
    const maxValue = 320;

    if (isNaN(value)) { // 判断输入是否为数字
        callback(new Error('请输入数字'));
    } else if (value < minValue || value > maxValue) { // 判断输入是否在指定范围内
        callback(new Error(`请输入合法坐标值(${minValue}-${maxValue})`));
    } else {
        callback();
    }
}

const rules = reactive<FormRules<RuleForm>>({
    shelfId: [
        {
            required: true,
            message: '请输入货架Id',
            trigger: 'blur'
        },
    ],
    shelfName: [
        {
            required: true,
            message: '请输入货架名称',
            trigger: 'blur'
        },
        {
            max: 10,
            message: '货架名称不能超过10字',
            trigger: 'change'
        }
    ],
    shelfType: [
        {
            required: true,
            message: '请选择货架类型',
            trigger: 'blur'
        }
    ],
    positionX: [
        {
            required: true,
            message: '请输入货架位置(x)',
            trigger: 'blur'
        },
        {
            validator: validatePositionX
        }
    ],
    positionY: [
        {
            required: true,
            message: '请输入货架位置(y)',
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
        emits('updateUpdateShelvesVisible')
    } else {
        shelvesForm.shelfId = props.currentShelves.shelfId
        shelvesForm.shelfName = props.currentShelves.shelfName
        shelvesForm.shelfType = props.currentShelves.shelfType
        shelvesForm.positionX = props.currentShelves.positionX
        shelvesForm.positionY = props.currentShelves.positionY
    }
}, {})

const onCancel = () => {
    visible.value = false
}

const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, fields) => {
        if(valid) {
            messageBox(`确认更新货架：${shelvesForm.shelfName}`, 'info', () => {
                const data = {
                    shelfId: shelvesForm.shelfId,
                    shelfName: shelvesForm.shelfName,
                    shelfType: shelvesForm.shelfType,
                    positionX: shelvesForm.positionX,
                    positionY: shelvesForm.positionY
                }
                updateShelves(data)
                message('编辑成功', 'success')
                visible.value = false
            })
            
        }
    })
}
</script>
<template>
    <el-dialog v-model="visible" width="60%">
        <el-tag size="large">编辑货架</el-tag>
        <el-form class="shelves-form" ref="ruleFormRef" :model="shelvesForm" :rules="rules" label-width="100px">
            <el-form-item label="货架id" prop="shelfId">
                <el-input v-model="shelvesForm.shelfId" placeholder="请输入货架名称" clearable></el-input>
            </el-form-item>
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
            <el-form-item label="货架位置(x)" prop="positionX">
                <el-input v-model="shelvesForm.positionX" placeholder="请输入货架位置(x)" clearable style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="货架位置(y)" prop="positionY">
                <el-input v-model="shelvesForm.positionY" placeholder="请输入货架位置(y)" clearable style="width: 150px;"></el-input>
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
