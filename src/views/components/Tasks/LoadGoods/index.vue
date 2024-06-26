<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm, GoodsType, RobotType } from './type';
import { assignTask, getAvailableRobot } from '@/api/assignTask';
import { message } from '@/utils/message'

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

const ruleFormRef = ref<FormInstance>()
interface LoadGoodsType {
  loadRobot: string,
}
const loadGoodsData = reactive<LoadGoodsType>({
  loadRobot: '',
})
const rules = reactive<FormRules<RuleForm>>({
  loadRobot: [
    {
      required: true,
      message: '请选择装载机器人',
      trigger: 'blur'
    }
  ],
})
const loadRobots = ref<RobotType[]>()

const isCancel = ref<Boolean>(false)

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async (newValue) => {
    if(!visible.value) {
      // @ts-ignore
      Object.keys(loadGoodsData).forEach((item: string) => loadGoodsData[item] = '')
      emits('updateLoadGoodsVisible', isCancel.value)
      isCancel.value = false
    } else {
      const res = await getAvailableRobot({taskType: 1})
      const { data } = res
      loadRobots.value = data
    }
}, {})

const onCancel = () => {
  visible.value = false
  isCancel.value = true
}
const onOk = (form: FormInstance | undefined) => {
  if(!form) return
  form.validate(async (valid, _) => {
    if(valid) {
      const data = {
        taskType: 1,
        robotId: loadGoodsData.loadRobot,
        goodsId: props.currentLoadGoods.goodsId,
        targetShelfId: null
      }
      await assignTask(data)
      message('分配成功', 'success')
      visible.value = false
    }
  })
}
</script>
<template>
  <el-dialog v-model="visible" width="60%" @close="onCancel">
    <el-tag size="large">装载货物</el-tag>
    <div>
      <el-tag type="info" style="margin-top: 20px;">待装载货物：{{ props.currentLoadGoods.goodsName }}</el-tag>
    </div>
    <el-form class="load-form" ref="ruleFormRef" :model="loadGoodsData" :rules="rules" label-width="auto">
      <el-form-item label="装载机器人" prop="loadRobot">
        <el-select v-model="loadGoodsData.loadRobot" placeholder="请选择装载机器人" filterable clearable no-match-text="无匹配选项">
          <el-option v-for="item in loadRobots" :key="item.robotId" :label="item.robotName" :value="item.robotId"></el-option>
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
