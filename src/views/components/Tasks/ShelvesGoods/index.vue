<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { message } from '@/utils/message';


const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['updateShelvesGoodsVisible'])

const visible = ref(false)


interface LoadRobotsType {
  id: number,
  value: string
}
const goodsData = [
  {
    id: 1,
    value: '货物1'
  },
  {
    id: 2,
    value: '货物2'
  },
  {
    id: 3,
    value: '货物3'
  }
]
const armsData = [
  {
    id: 1,
    value: '机械臂1'
  },
  {
    id: 2,
    value: '机械臂2'
  },
  {
    id: 3,
    value: '机械臂3'
  }
]
const shelfData = [
  {
    id: 1,
    value: '货架1'
  },
  {
    id: 2,
    value: '货架2'
  },
  {
    id: 3,
    value: '货架3'
  }
]

interface RuleForm {
  shelvesGoods: String,
  targetShelf: String,
  arms: String
}
const ruleFormRef = ref<FormInstance>()
interface ShelvesGoodsType {
  shelvesGoods: string,
  targetShelf: string,
  arms: string
}
const shelvesGoodsData = reactive<ShelvesGoodsType>({
  shelvesGoods: '',
  targetShelf: '',
  arms: ''
})
const validateArms = (rule: any, value: any, callback: any) => {
    if(shelvesGoodsData.shelvesGoods === '货物1') {
        if(value === '') {
            callback(new Error('请选择机械臂'))
        }
    }
    callback()
}
const rules = reactive<FormRules<RuleForm>>({
    shelvesGoods: [
        {
            required: true,
            message: '请选择上架货物',
            trigger: 'blur'
        }
    ],
    targetShelf: [
        {
            required: true,
            message: '请选择目标货架',
            trigger: 'blur'
        }
    ],
    arms: [
        {
            validator: validateArms,
            trigger: 'change'
        }
    ]
})

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, (newValue) => {
    if(!visible.value) {
        // @ts-ignore
        Object.keys(shelvesGoodsData).forEach((item: string) => shelvesGoodsData[item] = '')
        emits('updateShelvesGoodsVisible')
    }
}, {})

const onCancel = () => {
    visible.value = false
}
const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate((valid, _) => {
        if(valid) {
        message('添加成功', 'success')
        visible.value = false
        }
    })
}
</script>
<template>
  <el-dialog v-model="visible" width="60%">
    <el-tag size="large">货物上架</el-tag>
    <el-form class="load-form" ref="ruleFormRef" :model="shelvesGoodsData" :rules="rules" label-width="auto">
        <el-space fill>
            <el-alert type="info" show-icon :closable="false" center v-show="shelvesGoodsData.shelvesGoods && shelvesGoodsData.shelvesGoods !== '货物1'">当前选择的货物位于机械臂装载机器人，无需额外机械臂进行夹取</el-alert>
            <el-form-item label="待上架货物" prop="shelvesGoods">
                <el-select v-model="shelvesGoodsData.shelvesGoods" placeholder="请选择上架货物" filterable clearable no-match-text="无匹配选项">
                    <el-option v-for="item in goodsData" :key="item.id" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-space>
        <el-form-item label="机械臂" prop="arms" v-show="shelvesGoodsData.shelvesGoods === '货物1'">
            <el-select v-model="shelvesGoodsData.arms" placeholder="请选择机械臂" filterable clearable no-match-text="无匹配选项">
                <el-option v-for="item in armsData" :key="item.id" :label="item.value" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="目标货架" prop="targetShelf">
            <el-select v-model="shelvesGoodsData.targetShelf" placeholder="请选择目标货架" filterable clearable no-match-text="无匹配选项">
                <el-option v-for="item in shelfData" :key="item.id" :label="item.value" :value="item.value"></el-option>
            </el-select>
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
.load-form {
  width: 80%;
  margin: 20px;
}
</style>
