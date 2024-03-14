<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import { onBeforeMount, reactive, ref } from 'vue'

import { getUserManageData } from '@/api/userManage'

onBeforeMount(() => {
    initData()
})

interface UsersDataType {
    userId: number,
    username: string,
    email: string,
    userType: number,
    isActive: boolean,
    loginTime: string,
    taskId: number,
    taskName: string,
    taskStartTime: string
} 
const usersData = ref<UsersDataType>()

const keyWord = ref('')

const pagination = reactive({
  pageSize: 10,
  currentPage: 1,
  total: 50
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
  const res = await getUserManageData(params)
  // @ts-ignore
  const { data, total } = res
  usersData.value = data
  pagination.total = total
}

</script>
<template>
    <div>
        <MyBreadcrumb title="用户管理"></MyBreadcrumb>
        <div class="user-container">
            <div class="search">
                <el-input v-model="keyWord" class="search-input" placeholder="搜索用户名称或者用户ID" @keyup.enter="initData" >
                <template #append>
                    <el-button icon="Search" @click="initData" />
                </template>
                </el-input>
            </div>
            <el-table :data="usersData">
                <el-table-column prop="userId" label="用户ID" min-width="140"></el-table-column>
                <el-table-column prop="username" label="用户名称" min-width="120"></el-table-column>
                <el-table-column prop="userType" label="类型" min-width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="200"></el-table-column>
                <el-table-column prop="loginTime" label="最近登录时间" min-width="200"></el-table-column>
                <el-table-column prop="task" label="动作" min-width="200"></el-table-column>
                <el-table-column prop="taskStartTime" label="动作分配时间" min-width="200"></el-table-column>
                <el-table-column fixed="right" prop="operation" label="操作" min-width="100">
                    <template #default>
                        <el-button type="primary" link size="small">编辑</el-button>
                        <el-button type="danger" link size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData"></MyPagination>
        </div>
    </div>
</template>
<style scoped>
.user-container {
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
