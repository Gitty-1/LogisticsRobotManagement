<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm, GoodsType, ShelfType } from './type';
import { assignTask, getShelfList } from '@/api/assignTask';
import { message } from '@/utils/message'


const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    currentShelvesGoods: {
        type: Object as () => GoodsType,
        default: {}
    }
})
const emits = defineEmits(['updateShelvesGoodsVisible'])

const visible = ref(false)

const ruleFormRef = ref<FormInstance>()

const shelvesGoodsData = reactive<RuleForm>({
  targetShelf: null,
})

const rules = reactive<FormRules<RuleForm>>({
    targetShelf: [
        {
            required: true,
            message: '请选择目标货架',
            trigger: 'blur'
        }
    ],
})

const targetShelf = ref<ShelfType[]>()

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, async (newValue) => {
    if(!visible.value) {
        // @ts-ignore
        Object.keys(shelvesGoodsData).forEach((item: string) => shelvesGoodsData[item] = '')
        emits('updateShelvesGoodsVisible')
    } else {
      const res1 = await getShelfList()
      targetShelf.value = res1.data
    }
}, {})

const onCancel = () => {
    visible.value = false
}
const onOk = (form: FormInstance | undefined) => {
    if(!form) return
    form.validate(async (valid, _) => {
        if(valid) {
            const data = {
                taskType: 4,
                robotId: null,
                goodsId: props.currentShelvesGoods.goodsId,
                targetShelfId: shelvesGoodsData.targetShelf
            }
            await assignTask(data)
            message('分配成功', 'success')
            visible.value = false
        }
    })
}
</script>
<template>
  <el-dialog v-model="visible" width="60%">
    <el-tag size="large">货物上架</el-tag>
    <div>
      <el-tag type="info" style="margin-top: 20px;">待上架货物：{{ props.currentShelvesGoods.goodsName }}</el-tag>
    </div>
    <el-form class="load-form" ref="ruleFormRef" :model="shelvesGoodsData" :rules="rules" label-width="auto">
        <el-form-item label="目标货架" prop="targetShelf">
            <el-select v-model="shelvesGoodsData.targetShelf" placeholder="请选择目标货架" filterable clearable no-match-text="无匹配选项">
                <el-option v-for="item in targetShelf" :key="item.shelfId" :label="item.shelfName" :value="item.shelfId"></el-option>
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
