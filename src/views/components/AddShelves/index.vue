<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message ,messageBox } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { addShelves } from '@/api/manage'
import type { RuleForm } from './type'
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateAddShelvesVisible'])

const visible = ref(false)

const ruleFormRef = ref<FormInstance>()

const shelvesForm = reactive<RuleForm>({
    shelfName: '',
    shelfType: 0,
    positionX: null,
    positionY: null
})

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
        <el-form class="shelves-form" ref="ruleFormRef" :model="shelvesForm" :rules="rules" label-width="100px">
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
.shelves-form {
    width: 80%;
    margin: 20px;
}
</style>
