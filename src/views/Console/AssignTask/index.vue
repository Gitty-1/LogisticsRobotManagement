<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import LoadGoods from '@/views/components/Tasks/LoadGoods/index.vue'
import TransportGoods from '@/views/components/Tasks/TransportGoods/index.vue'
import ShelvesGoods from '@/views/components/Tasks/ShelvesGoods/index.vue'
import MyPagination from '@/components/myPagination.vue'
import TaskProgress from '@/views/components/TaskProgress/index.vue'
import type {PaginationType} from '../type'
import type { GoodsType } from './type'
import { getTaskData } from '@/api/assignTask'
import webSocket1 from '@/utils/webSocket1'
import { message } from '@/utils/message'

onBeforeMount(() => {
  initData()
})

onMounted(() => {
  webSocket1.addEventListener('open', (e: any) => {
    message('连接成功', 'success')
  })
  webSocket1.addEventListener('message', (e: any) => {
    const data = JSON.parse(e.data)
    const goodsId = data.data.goodsId
    console.log('goodsId', goodsId)
    //@ts-ignore
    goodsData.value.map(item => {
      if(item.goodsId === goodsId) {
        message(`货物id: ${goodsId} 任务进度更新`, 'success')
        initData()
      }
    })
  })
  webSocket1.addEventListener('error', (e: any) => {
    message('连接错误', 'error')
  })
  webSocket1.addEventListener('close', (e: any) => {
    message('连接关闭', 'success')
  })
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
const updateLoadGoodsVisible = (isCancel: boolean) => {
  loadGoodsVisible.value = false
  if(!isCancel) {
    currentTransportGoods.value = currentLoadGoods.value
    transportGoodsVisible.value = true
  }
  loadData()
}
const currentLoadGoods = ref<GoodsType>()

const transportGoodsVisible = ref(false)
const updateTransportGoodsVisible = (isCancel: boolean) => {
  transportGoodsVisible.value = false
  if(!isCancel) {
    currentShelvesGoods.value = currentTransportGoods.value
    shelvesGoodsVisible.value = true
  }
  loadData()
}
const currentTransportGoods = ref<GoodsType>()

const shelvesGoodsVisible = ref(false)
const updateShelvesGoodsVisible = () => {
  shelvesGoodsVisible.value = false
  loadData()
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
    if(goods.currentAssignTaskType === 0) {
        loadGoodsVisible.value = true
        currentLoadGoods.value = goods
    } else if(goods.currentAssignTaskType === 1) {
        transportGoodsVisible.value = true
        currentTransportGoods.value = goods
    } else if(goods.currentAssignTaskType === 2 || goods.currentAssignTaskType === 3) {
        shelvesGoodsVisible.value = true
        currentShelvesGoods.value = goods
    }
}


const isAbleAssignTask = (goods: GoodsType) => {
    if(goods.currentAssignTaskType !== 4) return true
    return false
}


const taskProgressType: stringKey = {
    1: '装载中',
    2: '运输中',
    3: '运输中',
    4: '上架中',
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
            <el-table-column prop="goodsId" label="货物ID" width="380"></el-table-column>
            <el-table-column prop="goodsName" label="货物名称" width="380"></el-table-column>
            <el-table-column prop="taskProgress" label="任务进度" width="380">
                <template #default="scope">
                    <el-tooltip effect="dark" placement="top-start" content="未分配任何任务，无法查看" :disabled="scope.row.taskStatus !== null || scope.row.taskType !== null">
                        <el-button type="primary" link size="small" :disabled="scope.row.taskStatus === null && scope.row.taskType === null" @click="handleTaskProgress(scope.row)">查看</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="operator" label="操作" fixed="right">
                <template #default="scope">
                    <el-tooltip effect="dark" placement="top-start" content="任务已分配完成" :hide-after="0" :disabled="isAbleAssignTask(scope.row)">
                      <el-button type="primary" link size="small" @click="handleAssignTask(scope.row)" :disabled="!isAbleAssignTask(scope.row)">分配任务</el-button>
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
