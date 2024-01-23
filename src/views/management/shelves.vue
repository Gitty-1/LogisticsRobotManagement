<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import { reactive } from 'vue'

const shelvesData = reactive([
  {
    id: '111',
    name: '货架1',
    type: 'small',
    goodsNum: 20,
    status: '无货物',
    createTime: '2024-01-01 20:20:20',
  },
  {
    id: '222',
    name: '货架2',
    type: 'middle',
    goodsNum: 40,
    status: '有货物',
    createTime: '2024-01-01 20:20:20',
  },
  {
    id: '333',
    name: '货架3',
    type: 'large',
    goodsNum: 100,
    status: '已满',
    createTime: '2024-01-01 20:20:20',
  },
])

const tagType = {
  无货物: 'info',
  有货物: 'primary',
  已满: 'danger'
}

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
    <MyBreadcrumb title="货架管理"></MyBreadcrumb>
    <div class="shelves-container">
      <div class="search">
        <el-input class="search-input" placeholder="搜索货架名称或者货架ID">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-button type="primary">添加</el-button>
      </div>
      <el-table :data="shelvesData">
        <el-table-column prop="id" label="货架ID" min-width="140"></el-table-column>
        <el-table-column prop="name" label="货架名称" min-width="140"></el-table-column>
        <el-table-column prop="type" label="货架类型" min-width="140"></el-table-column>
        <el-table-column prop="goodsNum" label="货物数量" min-width="140"></el-table-column>
        <el-table-column prop="status" label="货架状态" min-width="140">
          <template #default="scope">
            <el-tag :type="tagType[scope.row.status]">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="激活时间" min-width="200"></el-table-column>
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
.shelves-container {
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
