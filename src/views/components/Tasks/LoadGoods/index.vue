<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { message } from '@/utils/message';
import type { RuleForm, GoodsType } from './type';

const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    currentLoadGoods: {
      type: Object as () => GoodsType,
      default: {}
    }
})
const emits = defineEmits(['updateLoadGoodsVisible'])

const visible = ref(false)

const loadRobots = [
  {
    id: 1,
    value: '机器人1'
  },
  {
    id: 2,
    value: '机器人2'
  },
  {
    id: 3,
    value: '机器人3'
  }
]
const loadGoods = [
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

const ruleFormRef = ref<FormInstance>()
interface LoadGoodsType {
  loadRobot: string,
  loadGoods: string
}
const loadGoodsData = reactive<LoadGoodsType>({
  loadRobot: '',
  loadGoods: ''
})
const rules = reactive<FormRules<RuleForm>>({
  loadRobot: [
    {
      required: true,
      message: '请选择装载机器人',
      trigger: 'blur'
    }
  ],
  loadGoods: [
    {
      required: true,
      message: '请选择装载货物',
      trigger: 'blur'
    }
  ]
})

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, (newValue) => {
    if(!visible.value) {
      // @ts-ignore
      Object.keys(loadGoodsData).forEach((item: string) => loadGoodsData[item] = '')
      emits('updateLoadGoodsVisible')
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
    <el-tag size="large">装载货物</el-tag>
    <div>
      <el-tag type="info" style="margin-top: 20px;">待装载货物：{{ props.currentLoadGoods.goodsName }}</el-tag>
    </div>
    <el-form class="load-form" ref="ruleFormRef" :model="loadGoodsData" :rules="rules" label-width="auto">
      <el-form-item label="装载机器人" prop="loadRobot">
        <el-select v-model="loadGoodsData.loadRobot" placeholder="请选择装载机器人" filterable clearable no-match-text="无匹配选项">
          <el-option v-for="item in loadRobots" :key="item.id" :label="item.value" :value="item.value"></el-option>
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
