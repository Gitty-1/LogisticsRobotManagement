<script setup lang="ts">
import { ref } from 'vue'
import LoadGoods from '@/views/components/Tasks/LoadGoods/index.vue'
import TransportGoods from '@/views/components/Tasks/TransportGoods/index.vue'
import ShelvesGoods from '@/views/components/Tasks/ShelvesGoods/index.vue'
const taskData = [
    {
        goodsId: 1,
        goodsName: '货物1',
        load: false,
        transport: false,
        shelves: false
    },
    {
        goodsId: 2,
        goodsName: '货物2',
        load: true,
        transport: false,
        shelves: false
    },
    {
        goodsId: 3,
        goodsName: '货物3',
        load: true,
        transport: true,
        shelves: false
    },
    {
        goodsId: 4,
        goodsName: '货物4',
        load: true,
        transport: false,
        shelves: false
    },
    {
        goodsId: 5,
        goodsName: '货物5',
        load: true,
        transport: true,
        shelves: true
    }
]

export interface GoodsType {
    goodsId: number,
    goodsName: string,
    load: boolean,
    transport: boolean,
    shelves: boolean
}

const loadGoodsVisible = ref(false)
const updateLoadGoodsVisible = () => {
  loadGoodsVisible.value = false
}
const currentLoadGoods = ref<GoodsType>()
const handleLoadGoods = (goods: GoodsType) => {
    loadGoodsVisible.value = true
    currentLoadGoods.value = goods
}

const transportGoodsVisible = ref(false)
const updateTransportGoodsVisible = () => {
  transportGoodsVisible.value = false
}
const currentTransportGoods = ref<GoodsType>()
const handleTransportGoods = (goods: GoodsType) => {
    transportGoodsVisible.value = true
    currentTransportGoods.value = goods
}

const shelvesGoodsVisible = ref(false)
const updateShelvesGoodsVisible = () => {
  shelvesGoodsVisible.value = false
}
const currentShelvesGoods = ref<GoodsType>()
const handleShelvesGoods = (goods: GoodsType) => {
    shelvesGoodsVisible.value = true
    currentShelvesGoods.value = goods
}
</script>
<template>
  <div>
    <el-alert type="info" show-icon center :closable="false">物流机器人任务分为装载货物、运送货物及货物上架</el-alert>
    <el-table :data="taskData" class="task-form">
        <el-table-column prop="goodsId" label="货物ID" width="200"></el-table-column>
        <el-table-column prop="goodsName" label="货物名称" width="200"></el-table-column>
        <el-table-column prop="loadGoods" label="装载货物" width="200">
            <template #default="scope">
                <el-icon color="green" size="20" v-if="scope.row.load"><SuccessFilled /></el-icon>
                <el-button type="primary" link @click="handleLoadGoods(scope.row)" v-else>分配任务</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="transportGoods" label="运输货物" width="200">
            <template #default="scope">
                <el-icon color="green" size="20" v-if="scope.row.transport"><SuccessFilled /></el-icon>
                <el-button type="primary" link @click="handleTransportGoods(scope.row)" v-else>分配任务</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="shelvesGoods" label="货物上架" width="200">
            <template #default="scope">
                <el-icon color="green" size="20" v-if="scope.row.shelves"><SuccessFilled /></el-icon>
                <el-button type="primary" link @click="handleShelvesGoods(scope.row)" v-else>分配任务</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
  <LoadGoods :visible="loadGoodsVisible" @updateLoadGoodsVisible="updateLoadGoodsVisible" :currentLoadGoods="currentLoadGoods" />
  <TransportGoods :visible="transportGoodsVisible" @updateTransportGoodsVisible="updateTransportGoodsVisible" :currentTransportGoods="currentTransportGoods" />
  <ShelvesGoods :visible="shelvesGoodsVisible" @updateShelvesGoodsVisible="updateShelvesGoodsVisible" :currentShelvesGoods="currentShelvesGoods" />
</template>
<style scoped>
.task-form {
    margin: 2%;
}
</style>
