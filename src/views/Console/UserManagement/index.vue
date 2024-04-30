<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import { onBeforeMount, reactive, ref } from 'vue'
import { getUserManageData, disableUser, enableUser } from '@/api/userManage'
import type { UsersDataType } from './type'

onBeforeMount(() => {
    initData()
})

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

const userType = [
  {
    type: 1,
    typeName: '普通用户',
    tagType: 'info'
  },
  {
    type: 2,
    typeName: '用户管理员',
    tagType: 'primary'
  }
]

const handleDisableUser = async (userId: number) => {
  await disableUser({userId: userId})
  initData()
}

const handleEnableUser = async (userId: number) => {
  await enableUser({userId: userId})
  initData()
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
                <el-table-column prop="userType" label="用户类型" min-width="120">
                  <template #default="scope">
                    <el-tag :type="userType[scope.row.userType-1].tagType">{{ userType[scope.row.userType-1].typeName }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="200"></el-table-column>
                <el-table-column prop="loginTime" label="最近登录时间" min-width="200"></el-table-column>
                <el-table-column prop="task" label="动作" min-width="200"></el-table-column>
                <el-table-column prop="taskStartTime" label="动作分配时间" min-width="200"></el-table-column>
                <el-table-column fixed="right" prop="operation" label="操作" min-width="100">
                    <template #default="scope">
                        <div v-if="scope.row.userType === 1">
                          <el-button type="primary" link size="small" v-if="!scope.row.isActive" @click="handleEnableUser(scope.row.userId)">解禁</el-button>
                          <el-button type="danger" link size="small" v-else @click="handleDisableUser(scope.row.userId)">禁用</el-button>
                        </div>
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
