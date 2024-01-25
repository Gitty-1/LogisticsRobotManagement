<script setup lang="ts">
import { ref, reactive, watch } from "vue"

interface pageSizesType {
    value: number,
    label: String
}
const props = defineProps({
    pageSizes: {
        type: Array<pageSizesType>,
        default: () => [
            {
                value: 10,
                label: '10条/页'
            },
            {
                value: 20,
                label: '20条/页'
            },
            {
                value: 50,
                label: '50条/页'
            },
            {
                value: 100,
                label: '100条/页'
            },
        ]
    },
    paginationData: {
        type: Object,
        default: () => {}
    }
})

let pagination = ref({
    pageSize: 10,
    currentPage: 1,
    total: 0
})

// 监听
watch(() => props.paginationData, (newValue: any) => {
    pagination.value = newValue
}, {immediate: true, deep: true})

const handleSizeChange = (val: number) => {
    pagination.value.pageSize = val
    emits('size-change', pagination.value)
}
const handleCurrentChange = (val: number) => {
    pagination.value.currentPage = val
    emits('current-change', pagination.value)
}

const emits = defineEmits(['size-change', 'current-change'])


</script>
<template>
  <div class="page-pagination">
    <div class="pagination-total">共<el-text type="primary">{{ pagination.total }}</el-text>条</div>
    <div class="pagination-sizes">
        <el-select v-model="pagination.pageSize" class="pagination-select" placeholder="" @change="handleSizeChange">
            <el-option v-for="item in props.pageSizes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
    <el-pagination :current-page="pagination.currentPage" :page-size="pagination.pageSize" :total="pagination.total" layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <div class="pagination-jumper">
        跳转
        <input v-model="pagination.currentPage" class="pagination-input" type="number" />
        页
    </div>
  </div>
</template>
<style scoped>
.page-pagination {
    display: flex;
    align-items: center;
    margin-top: 10px;
    float: right;
}

.pagination-total {
    width: 80px;
}

.pagination-select {
    width: 100px;
}

.pagination-input {
    width: 50px;
}
</style>
