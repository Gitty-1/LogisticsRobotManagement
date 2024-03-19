<script setup lang="ts">
import { ref, reactive } from 'vue'
import LoadGoods from '@/views/components/Tasks/LoadGoods/index.vue'
import TransportGoods from '@/views/components/Tasks/TransportGoods/index.vue'
import ShelvesGoods from '@/views/components/Tasks/ShelvesGoods/index.vue'
import { message, messageBox } from '@/utils/message'
import MyPagination from '@/components/myPagination.vue'

const goodsData = [
    {
        goodsId: 1,
        goodsName: '货物1',
        taskStatus: 0
    },
    {
        goodsId: 2,
        goodsName: '货物2',
        taskStatus: 1
    },
    {
        goodsId: 3,
        goodsName: '货物3',
        taskStatus: 2
    },
    {
        goodsId: 4,
        goodsName: '货物4',
        taskStatus: 3
    },
    {
        goodsId: 5,
        goodsName: '货物5',
        taskStatus: 4
    },
    {
        goodsId: 6,
        goodsName: '货物6',
        taskStatus: 5
    },
    {
        goodsId: 7,
        goodsName: '货物7',
        taskStatus: 6
    },
]

const keyWord = ref('')

interface PaginationType {
  currentPage: number,
  pageSize: number,
  total: number
}
const pagination = reactive<PaginationType>({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const initData = () => {
  pagination.currentPage = 1
  loadData()
}
const loadData = async () => {
  const params = {
    key: keyWord.value,
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize
  }
}

export interface GoodsType {
    goodsId: number,
    goodsName: string,
    taskStatus: number,
    transportType: number
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

const handleOut = (goods: GoodsType) => {
    messageBox(`${goods.goodsName} 即将出库，是否继续`, 'warning', () => {
        message('出库成功', 'success')
    })
}
</script>
<template>
  <div>
    <el-alert type="info" show-icon center :closable="false">物流机器人任务分为装载货物、运送货物及货物上架，任务完成后可出库</el-alert>
    <div class="goods-status-container">
        <div class="search">
            <el-input v-model="keyWord" class="search-input" placeholder="搜索货物名称或者货物ID" @keyup.enter="initData" >
            <template #append>
                <el-button icon="Search" @click="initData" />
            </template>
            </el-input>
        </div>
        <div class="goods-status">
            <div>
                <el-icon color="lightGrey"><RemoveFilled /></el-icon>
                <el-text>未开始</el-text>
            </div>
            <div>
                <el-icon color="deepSkyblue"><HelpFilled /></el-icon>
                <el-text>进行中</el-text>
            </div>
            <div>
                <el-icon color="springGreen"><SuccessFilled /></el-icon>
                <el-text>已完成</el-text>
            </div>
        </div>
    </div>
    <div class="goods-task-container">
        <el-table :data="goodsData" class="task-table">
            <el-table-column prop="goodsId" label="货物ID" width="180"></el-table-column>
            <el-table-column prop="goodsName" label="货物名称" width="180"></el-table-column>
            <el-table-column prop="loadGoods" label="装载货物" width="180">
                <template #default="scope">
                    <el-button type="primary" link @click="handleLoadGoods(scope.row)" v-if="scope.row.taskStatus === 0">分配任务</el-button>
                    <el-icon color="deepSkyblue" size="20" v-else-if="scope.row.taskStatus === 1"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="20" v-else><SuccessFilled /></el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="transportGoods" label="运输货物" width="180">
                <template #default="scope">
                    <el-icon color="lightGrey" size="20" v-if="scope.row.taskStatus <= 1"><RemoveFilled /></el-icon>
                    <el-button type="primary" link @click="handleTransportGoods(scope.row)" v-else-if="scope.row.taskStatus === 2">分配任务</el-button>
                    <el-icon color="deepSkyblue" size="20" v-else-if="scope.row.taskStatus === 3"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="20" v-else><SuccessFilled /></el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="shelvesGoods" label="货物上架" width="180">
                <template #default="scope">
                    <el-icon color="lightGrey" size="20" v-if="scope.row.taskStatus <= 3"><RemoveFilled /></el-icon>
                    <el-button type="primary" link @click="handleShelvesGoods(scope.row)" v-else-if="scope.row.taskStatus === 4">分配任务</el-button>
                    <el-icon color="deepSkyblue" size="20" v-else-if="scope.row.taskStatus === 5"><HelpFilled /></el-icon>
                    <el-icon color="springGreen" size="20" v-else><SuccessFilled /></el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="operator" label="操作" width="120">
                <template #default="scope">
                    <el-button type="primary" link :disabled="scope.row.taskStatus < 6" @click="handleOut(scope.row)">出库</el-button>
                </template>
            </el-table-column>
        </el-table>
        <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData" />
    </div>
  </div>
  <LoadGoods :visible="loadGoodsVisible" @updateLoadGoodsVisible="updateLoadGoodsVisible" :currentLoadGoods="currentLoadGoods" />
  <TransportGoods :visible="transportGoodsVisible" @updateTransportGoodsVisible="updateTransportGoodsVisible" :currentTransportGoods="currentTransportGoods" />
  <ShelvesGoods :visible="shelvesGoodsVisible" @updateShelvesGoodsVisible="updateShelvesGoodsVisible" :currentShelvesGoods="currentShelvesGoods" />
</template>
<style scoped>
.goods-status-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1% 2%;
}
.goods-status {
    width: 20%;
    display: flex;
    justify-content: space-between;
}
.goods-status>div {
    display: flex;
    align-items: center;
}
.goods-task-container {
    padding: 20px;
}
.task-table {
    height: calc(50vh);
}
</style>
