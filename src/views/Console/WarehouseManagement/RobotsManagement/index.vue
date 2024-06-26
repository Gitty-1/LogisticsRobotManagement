<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import AddRobots from '@/views/components/AddRobots/index.vue'
import UpdateRobots from '@/views/components/UpdateRobots/index.vue'
import { ref, reactive, onBeforeMount } from 'vue'
import { getRobotsData, deleteRobots } from '@/api/manage'
import { messageBox } from '@/utils/message'
import type { RobotDataType } from './type'
import type { PaginationType } from '../../type'
import { message } from '@/utils/message'

onBeforeMount(() => {
  initData()
})
const robotData = ref<RobotDataType[]>()

const pagination = reactive<PaginationType>({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const keyWord = ref('')

type stringKey = Record<string, string>
const tagType: stringKey = {
  未启动: 'info',
  启动中: 'success',
}

type numStrKey = Record<number, string>
const robotsType: numStrKey = {
  1: '装载机器人',
  2: '机械臂装载机器人',
  3: '机械臂'
}
const robotsStatus: numStrKey = {
  0: '未启动',
  1: '启动中'
}
const onlineStatus: numStrKey ={
  0: '离线',
  1: '在线'
}

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
  const res = await getRobotsData(params)
  // @ts-ignore
  const { data, total } = res
  robotData.value = data
  pagination.total = total
}



const addRobotVisible = ref(false)
const updateAddRobotsVisible = () => {
  addRobotVisible.value = false
  initData()
}

const updateRobotsVisible = ref(false)
const updateUpdateRobotsVisible = () => {
  updateRobotsVisible.value = false
  initData()
}
const currentRobots = ref<RobotDataType>()
const handleUpdateRobots = (robot: RobotDataType) => {
  updateRobotsVisible.value = true
  currentRobots.value = robot
}

// 删除机器人
const handleDeleteRobots = (robot: RobotDataType) => {
  messageBox(`确认删除机器人：${robot.robotName}`, 'info', () => {
      deleteRobots(robot.robotId)
      message('删除成功', 'success')
      initData()
  })
}

</script>
<template>
  <div>
    <MyBreadcrumb title="机器人管理"></MyBreadcrumb>
    <div class="robots-container">
      <div class="search">
        <el-input v-model="keyWord" class="search-input" placeholder="搜索机器人名称或者机器人ID" @keyup.enter="initData">
          <template #append>
            <el-button icon="Search" @click="initData" />
          </template>
        </el-input>
        <el-button type="primary" @click="addRobotVisible = true">添加</el-button>
      </div>
      <el-table :data="robotData">
        <el-table-column prop="robotId" label="机器人ID" min-width="140"></el-table-column>
        <el-table-column prop="robotIP" label="机器人IP" min-width="140"></el-table-column>
        <el-table-column prop="robotName" label="机器人名称" min-width="140"></el-table-column>
        <el-table-column prop="robotType" label="机器人类型" min-width="140">
          <template #default="scope">
            {{ robotsType[scope.row.robotType] }}
          </template>
        </el-table-column>
        <el-table-column prop="isOnline" label="在线状态" min-width="140">
          <template #default="scope">
            {{ onlineStatus[scope.row.isOnline] }}
          </template>
        </el-table-column>
        <el-table-column prop="robotStatus" label="机器人状态" min-width="140">
          <template #default="scope">
            <el-tag :type="tagType[robotsStatus[scope.row.robotStatus]]">{{ robotsStatus[scope.row.robotStatus] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="operation" label="操作" min-width="100">
            <template #default="scope">
                <el-button type="primary" link size="small" @click="handleUpdateRobots(scope.row)">编辑</el-button>
                <el-button type="danger" link size="small" @click="handleDeleteRobots(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData"/>
    </div>
    <AddRobots :visible="addRobotVisible" @updateAddRobotsVisible="updateAddRobotsVisible"></AddRobots>
    <UpdateRobots :visible="updateRobotsVisible" @updateUpdateRobotsVisible="updateUpdateRobotsVisible" :currentRobots="currentRobots"></UpdateRobots>
  </div>
</template>
<style scoped>
.robots-container {
  padding: 20px;
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
