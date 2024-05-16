<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import AddShelves from '@/views/components/AddShelves/index.vue'
import UpdateShelves from '@/views/components/UpdateShelves/index.vue'
import { ref, reactive, onBeforeMount } from 'vue'
import { messageBox } from '@/utils/message'
import { getShelvesData, deleteShelves } from '@/api/manage'
import type { ShelvesDataType } from './type'
import type { PaginationType } from '../../type'
import { message } from '@/utils/message'

onBeforeMount(() => {
  initData()
})

const shelvesData = ref<ShelvesDataType[]>()

const pagination = reactive<PaginationType>({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const keyWord = ref('')

type numStrKey = Record<number, string>
const shelfType: numStrKey = {
  1: 'small',
  2: 'middle',
  3: 'large'
}
const shelfStatus: numStrKey = {
  0: '无货物',
  1: '有货物',
  2: '已满'
}

type stringKey = Record<string, string>
const tagType: stringKey = {
  无货物: 'info',
  有货物: 'primary',
  已满: 'danger'
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
  const res = await getShelvesData(params)
  // @ts-ignore
  const { data, total } = res
  shelvesData.value = data
  pagination.total = total
}

// 添加货架对话框显示
const addShelvesVisible = ref(false)
const updateAddShelvesVisible = () => {
  addShelvesVisible.value = false
  initData()
}

const updateShelvesVisible = ref(false)
const updateUpdateShelvesVisible = () => {
  updateShelvesVisible.value = false
  initData()
}
const currentShelves = ref<ShelvesDataType>()
const handleUpdateShelves = (shelves: ShelvesDataType) => {
  updateShelvesVisible.value = true
  currentShelves.value = shelves
}

// 删除货架
const handleDeleteShelves = (shelf: ShelvesDataType) => {
  messageBox(`确认删除货架：${shelf.shelfName}`, 'info', () => {
      deleteShelves(shelf.shelfId)
      message('删除成功', 'success')
      initData()
  })
}


</script>
<template>
  <div>
    <MyBreadcrumb title="货架管理"></MyBreadcrumb>
    <div class="shelves-container">
      <div class="search">
        <el-input v-model="keyWord" class="search-input" placeholder="搜索货架名称或者货架ID" @keyup.enter="initData">
          <template #append>
            <el-button icon="Search" @click="initData" />
          </template>
        </el-input>
        <el-button type="primary" @click="addShelvesVisible = true">添加</el-button>
      </div>
      <el-table :data="shelvesData" class="shelf-table">
        <el-table-column prop="shelfId" label="货架ID" min-width="140"></el-table-column>
        <el-table-column prop="shelfName" label="货架名称" min-width="140"></el-table-column>
        <el-table-column prop="shelfType" label="货架类型" min-width="140">
          <template #default="scope">
            <span>{{ shelfType[scope.row.shelfType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsAmount" label="货物数量" min-width="140"></el-table-column>
        <el-table-column prop="shelfStatus" label="货架状态" min-width="140">
          <template #default="scope">
            <el-tag :type="tagType[shelfStatus[scope.row.shelfStatus]]">{{ shelfStatus[scope.row.shelfStatus] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="激活时间" min-width="200"></el-table-column>
        <el-table-column label="货架位置" min-width="140">
          <template #default="scope">
            <span>( {{ scope.row.positionX }}, {{ scope.row.positionY }} )</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="operation" label="操作" min-width="100">
            <template #default="scope">
                <el-button type="primary" link size="small" @click="handleUpdateShelves(scope.row)">编辑</el-button>
                <el-button type="danger" link size="small" @click="handleDeleteShelves(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData"></MyPagination>
    </div>
    <AddShelves :visible="addShelvesVisible" @updateAddShelvesVisible="updateAddShelvesVisible"></AddShelves>
    <UpdateShelves :visible="updateShelvesVisible" @updateUpdateShelvesVisible="updateUpdateShelvesVisible" :currentShelves="currentShelves" />
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
.shelf-table {
  height: calc(50vh);
}
</style>
