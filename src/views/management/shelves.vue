<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import AddShelves from '@/views/components/AddShelves/index.vue'
import { ref, reactive, onBeforeMount } from 'vue'
import { getShelvesData } from '@/api/manage'

onBeforeMount(() => {
  initData()
})

interface ShelvesDataType {
  shelfId: number,
  shelfName: string,
  shelfStatus: number,
  shelfType: number,
  goodsAmount: number,
  createTime: string
}
const shelvesData = ref<ShelvesDataType[]>()

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const keyWord = ref('')

type stringKey = Record<string, string>
const tagType: stringKey = {
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
  const params = {
    key: keyWord.value,
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize
  }
  const res = getShelvesData(params)
  console.log('ress', res)
}

// 添加货架对话框显示
const addShelvesVisible = ref(false)
const updateAddShelvesVisible = () => {
  addShelvesVisible.value = false
}

</script>
<template>
  <div>
    <MyBreadcrumb title="货架管理"></MyBreadcrumb>
    <div class="shelves-container">
      <div class="search">
        <el-input v-model="keyWord" class="search-input" placeholder="搜索货架名称或者货架ID">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-button type="primary" @click="addShelvesVisible = true">添加</el-button>
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
    <AddShelves :visible="addShelvesVisible" @updateAddShelvesVisible="updateAddShelvesVisible"></AddShelves>
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
