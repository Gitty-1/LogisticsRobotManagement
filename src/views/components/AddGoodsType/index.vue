<script setup lang="ts">
import { ref, watch } from 'vue';

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
</script>
<template>
    <el-dialog v-model="visible">
        <el-tag size="large">添加货物类型</el-tag>
        <el-form class="goods-form" ref="ruleFormRef" :model="goodsForm" :rules="rules" label-width="auto">
            <el-form-item label="货物类型名称" prop="goodsName">

            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style scoped>
</style>
