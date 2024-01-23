<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import { reactive } from 'vue'
const userData = [
    {
        id: '111',
        name: 'Tom',
        type: '普通用户',
        email: '111222333@qq.com',
        lastLoginTime: '2024-01-01 20:20:20',
        action: '新建货物',
        actionTime: '2024-01-01 20:20:21',
    },
    {
        id: '111',
        name: 'Tom',
        type: '普通用户',
        email: '111222333@qq.com',
        lastLoginTime: '2024-01-01 20:20:20',
        action: '开启机器人',
        actionTime: '2024-01-01 20:20:21',
    },
    {
        id: '111',
        name: 'Tom',
        type: '普通用户',
        email: '111222333@qq.com',
        lastLoginTime: '2024-01-01 20:20:20',
        action: '新建货物',
        actionTime: '2024-01-01 20:20:21',
    },
    {
        id: '111',
        name: 'Tom',
        type: '普通用户',
        email: '111222333@qq.com',
        lastLoginTime: '2024-01-01 20:20:20',
        action: '新建货物',
        actionTime: '2024-01-01 20:20:21',
    },
    {
        id: '111',
        name: 'Tom',
        type: '普通用户',
        email: '111222333@qq.com',
        lastLoginTime: '2024-01-01 20:20:20',
        action: '新建货物',
        actionTime: '2024-01-01 20:20:21',
    },
]

const initData = () => {
  console.log('init')
  pagination.currentPage = 1
  loadData()
}

const loadData = () => {
  console.log('load')
  console.log(pagination)
}

const pagination = reactive({
  pageSize: 10,
  currentPage: 1,
  total: 50
})
</script>
<template>
    <div>
        <MyBreadcrumb title="用户管理"></MyBreadcrumb>
        <div class="user-container">
            <div class="search">
                <el-input class="search-input" placeholder="搜索用户名称或者用户ID">
                <template #append>
                    <el-button icon="Search" />
                </template>
                </el-input>
            </div>
            <el-table :data="userData">
                <el-table-column prop="id" label="用户ID" min-width="140"></el-table-column>
                <el-table-column prop="name" label="用户名称" min-width="120"></el-table-column>
                <el-table-column prop="type" label="类型" min-width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="200"></el-table-column>
                <el-table-column prop="lastLoginTime" label="最近登录时间" min-width="200"></el-table-column>
                <el-table-column prop="action" label="动作" min-width="200"></el-table-column>
                <el-table-column prop="actionTime" label="动作分配时间" min-width="200"></el-table-column>
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
