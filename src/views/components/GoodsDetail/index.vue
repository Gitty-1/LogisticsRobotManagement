<script setup lang="ts">
import { ref, watch } from 'vue'
import type { GoodsDataType } from './type'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    goodsDetail: {
        type: Object as () => GoodsDataType,
        default: {}
    }
})
const emits = defineEmits(['updateGoodsDetailVisible'])

const visible = ref(false)

watch(() => props.visible, (newValue) => {
    visible.value = newValue
}, {})
watch(() => visible.value, () => {
    if (!visible.value) {
        emits('updateGoodsDetailVisible')
    }
}, {})

</script>
<template>
    <el-dialog v-model="visible" width="60%">
        <el-tag size="large" style="margin-bottom: 10px;">货物明细</el-tag>
        <div class="goods-detail">
            <div class="goods">
                <span>货物名称：</span>
                <span>{{ goodsDetail.goodsName }}</span>
            </div>
            <div class="goods">
                <span>货物描述：</span>
                <span class="goods-description">{{ goodsDetail.details }}</span>
            </div>
        </div>
    </el-dialog>
</template>
<style scoped>
.goods-detail {
    display: flex;
    flex-direction: column;
}
.goods {
    display: flex;
    justify-content: flex-start;
}
.goods span {
    margin: 10px 20px;
}
.goods span:first-child {
    color: rgb(97, 190, 252);
}
.goods-description {
    overflow: auto;
}
</style>
