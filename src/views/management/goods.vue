<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import AddGoods from '@/views/components/AddGoods/index.vue'
import { onBeforeMount, ref, reactive } from 'vue'
import { getGoodsData } from '@/api/manage'

onBeforeMount(() => {
  initData()
})

const goodsData = [
  {
    id: '111',
    name: '货物1',
    status: '未运输',
    type: 1,
    createTime: '2024-01-01 20:20:20',
    shelvesTime: '2024-01-02 20:20:20',
  },
  {
    id: '222',
    name: '货物2',
    status: '运输中',
    type: 2,
    createTime: '2024-01-01 20:20:20',
    shelvesTime: '2024-01-02 20:20:20',
  },
  {
    id: '333',
    name: '货物3',
    status: '未运输',
    type: 1,
    createTime: '2024-01-01 20:20:20',
    shelvesTime: '2024-01-02 20:20:20',
  },
  {
    id: '444',
    name: '货物4',
    status: '已在架',
    type: 3,
    createTime: '2024-01-01 20:20:20',
    shelvesTime: '2024-01-02 20:20:20',
  },
  {
    id: '555',
    name: '货物5',
    status: '未运输',
    type: 2,
    createTime: '2024-01-01 20:20:20',
    shelvesTime: '2024-01-02 20:20:20',
  },
]

type stringKey = Record<string, string>
const tagType: stringKey = {
  未运输: 'info',
  运输中: 'success',
  已在架: ''
}

const keyWord = ref('')
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

const initData = () => {
  pagination.currentPage = 1
  loadData()
}
const loadData = async () => {
  // 
  const params = {
    key: keyWord.value,
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize
  }
  const res = await getGoodsData(params)
  console.log('ressss', res)
}

// 增加货物对话框显示
const addGoodsVisible = ref(false)
const updateAddGoodsVisible = () => {
  addGoodsVisible.value = false
}

</script>
<template>
  <div>
    <MyBreadcrumb title="货物管理"></MyBreadcrumb>
    <div class="goods-container">
      <div class="search">
        <el-input v-model="keyWord" class="search-input" placeholder="搜索货物名称或者货物ID" >
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-button type="primary" @click="addGoodsVisible = true">添加</el-button>
      </div>
      <el-table :data="goodsData">
        <el-table-column prop="id" label="货物ID" min-width="140"></el-table-column>
        <el-table-column prop="name" label="货物名称" min-width="140"></el-table-column>
        <el-table-column prop="status" label="货物状态" min-width="140">
          <template #default="scope">
            <el-tag :type="tagType[scope.row.status]">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="货物类型" min-width="140"></el-table-column>
        <el-table-column prop="createTime" label="生产时间" min-width="200"></el-table-column>
        <el-table-column prop="shelvesTime" label="上架时间" min-width="200"></el-table-column>
        <el-table-column fixed="right" prop="detail" label="货物明细">
          <el-button link type="primary" :underline="false" icon="Edit">详情</el-button>
        </el-table-column>
      </el-table>
      <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData"/>
    </div>
    <AddGoods :visible="addGoodsVisible" @updateAddGoodsVisible="updateAddGoodsVisible"></AddGoods>
  </div>
</template>
<style scoped>
.goods-container {
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
