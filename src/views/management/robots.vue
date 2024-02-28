<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import AddRobots from '@/views/components/AddRobots/index.vue'
import { ref, reactive } from 'vue'

const robotData = ref([
  {
    id: 1,
    name: '机器人1',
    type: '装卸机器人',
    power: '50%',
    status: '启动中'
  },
  {
    id: 2,
    name: '机器人2',
    type: '机械臂装卸机器人',
    power: '50%',
    status: '启动中'
  },
  {
    id: 3,
    name: '机器人3',
    type: '机械臂',
    power: '100%',
    status: '未启动'
  },
])

type stringKey = Record<string, string>
const tagType: stringKey = {
  未启动: 'info',
  启动中: 'success',
}

const initData = () => {
  console.log('init')
  pagination.currentPage = 1
  loadData()
  
}
const loadData = () => {
  // 
  console.log('load', pagination)
}

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

const addRobotVisible = ref(false)
const updateAddRobotsVisible = () => {
  addRobotVisible.value = false
}

</script>
<template>
  <div>
    <MyBreadcrumb title="机器人管理"></MyBreadcrumb>
    <div class="robots-container">
      <div class="search">
        <el-input class="search-input" placeholder="搜索机器人名称或者机器人ID">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-button type="primary" @click="addRobotVisible = true">添加</el-button>
      </div>
      <el-table :data="robotData">
        <el-table-column prop="id" label="机器人ID" min-width="140"></el-table-column>
        <el-table-column prop="name" label="机器人名称" min-width="140"></el-table-column>
        <el-table-column prop="type" label="机器人类型" min-width="140"></el-table-column>
        <el-table-column prop="power" label="机器人电量" min-width="140"></el-table-column>
        <el-table-column prop="status" label="机器人状态" min-width="140">
          <template #default="scope">
            <el-tag :type="tagType[scope.row.status]">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData"/>
    </div>
    <AddRobots :visible="addRobotVisible" @updateAddRobotsVisible="updateAddRobotsVisible"></AddRobots>
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
