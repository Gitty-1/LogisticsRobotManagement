<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import LoadGoods from '@/views/components/Tasks/LoadGoods/index.vue'
import TransportGoods from '@/views/components/Tasks/TransportGoods/index.vue'
import ShelvesGoods from '@/views/components/Tasks/ShelvesGoods/index.vue'
import { message, messageBox } from '@/utils/message'
import MyPagination from '@/components/myPagination.vue'
import TaskProgress from '@/views/components/TaskProgress/index.vue'
import type {PaginationType} from '../type'
import type { GoodsType } from './type'
import { getTaskData } from '@/api/assignTask'

onBeforeMount(() => {
  initData()
})

const goodsData = ref<GoodsType>()
const keyWord = ref('')

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
  const res = await getTaskData(params)
    //@ts-ignore
  const { data, total } = res
  goodsData.value = data
  pagination.total = total
}

const taskProgressVisible = ref(false)
const updateTaskProgressVisible = () => {
    taskProgressVisible.value = false
}
const currentTaskProgressGoods = ref<GoodsType>()
const handleTaskProgress = (goods: GoodsType) => {
    taskProgressVisible.value = true
    currentTaskProgressGoods.value = goods
}

const loadGoodsVisible = ref(false)
const updateLoadGoodsVisible = () => {
  loadGoodsVisible.value = false
}
const currentLoadGoods = ref<GoodsType>()

const transportGoodsVisible = ref(false)
const updateTransportGoodsVisible = () => {
  transportGoodsVisible.value = false
}
const currentTransportGoods = ref<GoodsType>()

const shelvesGoodsVisible = ref(false)
const updateShelvesGoodsVisible = () => {
  shelvesGoodsVisible.value = false
}
const currentShelvesGoods = ref<GoodsType>()

type stringKey = Record<number, string>
const taskType: stringKey = {
    1: '装载货物',
    2: '使用机械臂装载机器人运输货物',
    3: '不使用机械臂装载机器人运输货物',
    4: '货物上架'
}
const taskProgress: stringKey = {
    0: '未执行',
    1: '执行中',
    2: '已完成'
}

const handleAssignTask = (goods: GoodsType) => {
    if(goods.taskStatus === 1 || goods.taskStatus === null) {
        loadGoodsVisible.value = true
        currentLoadGoods.value = goods
    } else if(goods.taskStatus === 2 || goods.taskStatus === 3) {
        transportGoodsVisible.value = true
        currentTransportGoods.value = goods
    } else if(goods.taskStatus === 4) {
        shelvesGoodsVisible.value = true
        currentShelvesGoods.value = goods
    }
}

const handleOut = (goods: GoodsType) => {
    messageBox(`${goods.goodsName} 即将出库，是否继续`, 'warning', () => {
        message('出库成功', 'success')
    })
}

const isAbleAssignTask = (goods: GoodsType) => {
    const { taskStatus, taskType } = goods
    if(taskStatus === 4 || taskType === 1) return false
    return true
}


const taskProgressType: stringKey = {
    1: '装载中',
    3: '运输中',
    5: '上架中',
    6: '已上架完成'
}
const getTooltipContent = (goods: GoodsType) => {
    const { goodsName, taskStatus } = goods
    return `${goodsName}${taskProgressType[taskStatus]}，无法分配任务`
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
        <el-table :data="goodsData" class="task-table">
            <el-table-column prop="goodsId" label="货物ID" width="300"></el-table-column>
            <el-table-column prop="goodsName" label="货物名称" width="300"></el-table-column>
            <el-table-column prop="taskProgress" label="任务进度" width="300">
                <template #default="scope">
                    <el-tooltip effect="dark" placement="top-start" content="未分配任何任务，无法查看" :disabled="scope.row.taskStatus !== null || scope.row.taskType !== null">
                        <el-button type="primary" link size="small" :disabled="scope.row.taskStatus === null && scope.row.taskType === null" @click="handleTaskProgress(scope.row)">查看</el-button>
                    </el-tooltip>
                    
                </template>
            </el-table-column>
            <el-table-column prop="operator" label="操作" width="200">
                <template #default="scope">
                    <el-tooltip effect="dark" placement="top-start" :content="getTooltipContent(scope.row)" :hide-after="0" :disabled="isAbleAssignTask(scope.row)">
                        <el-button type="primary" link size="small" @click="handleAssignTask(scope.row)" :disabled="!isAbleAssignTask(scope.row)" >分配任务</el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" placement="top-start" :content="`${scope.row.goodsName}未上架，无法出库`" :disabled="scope.row.taskStatus === 6">
                        <el-button type="primary" link size="small" :disabled="scope.row.taskStatus < 6" @click="handleOut(scope.row)">出库</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData" />
    </div>
  </div>
  <TaskProgress :visible="taskProgressVisible" @updateTaskProgressVisible="updateTaskProgressVisible" :currentTaskProgressGoods="currentTaskProgressGoods"/>
  <LoadGoods :visible="loadGoodsVisible" @updateLoadGoodsVisible="updateLoadGoodsVisible" :currentLoadGoods="currentLoadGoods" />
  <TransportGoods :visible="transportGoodsVisible" @updateTransportGoodsVisible="updateTransportGoodsVisible" :currentTransportGoods="currentTransportGoods" />
  <ShelvesGoods :visible="shelvesGoodsVisible" @updateShelvesGoodsVisible="updateShelvesGoodsVisible" :currentShelvesGoods="currentShelvesGoods" />
</template>
<style scoped>
.goods-status-container {
    padding: 20px
}
.task-table {
    height: calc(50vh);
}
.search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search .search-input {
  width: 250px;
}
</style>
