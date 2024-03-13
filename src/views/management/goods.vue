<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import AddGoods from '@/views/components/AddGoods/index.vue'
import GoodsDetail from '@/views/components/GoodsDetail/index.vue'
import { onBeforeMount, ref, reactive } from 'vue'
import { getGoodsData } from '@/api/manage'

onBeforeMount(() => {
  initData()
})

export interface GoodsDataType {
  goodsId: number,
  goodsName: string,
  goodsStatus: number,
  goodsType: number,
  createTime: string,
  shelvingTime: string,
  details: string,
  shelfId: number
}
const goodsData = ref<GoodsDataType[]>()

type numStrKey = Record<number, string>
const statusType: numStrKey = {
  0: '未运输',
  1: '运输中',
  2: '已在架'
}
type stringKey = Record<string, string>
const tagType: stringKey = {
  未运输: 'info',
  运输中: 'success',
  已在架: ''
}

const keyWord = ref('')

interface PaginationType {
  currentPage: number,
  pageSize: number,
  total: number
}
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
  const res = await getGoodsData(params)
  // @ts-ignore
  const { data, total } = res
  goodsData.value = data
  pagination.total = total
}

// 增加货物对话框显示
const addGoodsVisible = ref(false)
const updateAddGoodsVisible = () => {
  addGoodsVisible.value = false
  initData()
}

// 货物明细
const goodDetailVisible = ref(false)
const updateGoodsDetailVisible = () => {
  goodDetailVisible.value = false
}
const goodsDetail = ref<GoodsDataType>()
const handleGoodsDetail = (row: GoodsDataType) => {
  goodsDetail.value = row
  goodDetailVisible.value = true
}

</script>
<template>
  <div>
    <MyBreadcrumb title="货物管理"></MyBreadcrumb>
    <div class="goods-container">
      <div class="search">
        <el-input v-model="keyWord" class="search-input" placeholder="搜索货物名称或者货物ID" @keyup.enter="initData" >
          <template #append>
            <el-button icon="Search" @click="initData" />
          </template>
        </el-input>
        <el-button type="primary" @click="addGoodsVisible = true">添加</el-button>
      </div>
      <el-table :data="goodsData" class="goods-table">
        <el-table-column prop="goodsId" label="货物ID" min-width="140"></el-table-column>
        <el-table-column prop="goodsName" label="货物名称" min-width="140"></el-table-column>
        <el-table-column prop="goodsStatus" label="货物状态" min-width="140">
          <template #default="scope">
            <el-tag :type="tagType[statusType[scope.row.goodsStatus]]">{{ statusType[scope.row.goodsStatus] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="goodsType" label="货物类型" min-width="140"></el-table-column>
        <el-table-column prop="createTime" label="生产时间" min-width="200">
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shelvingTime" label="上架时间" min-width="200">
          <template #default="scope">
            <span>{{ scope.row.shelvingTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shelfId" label="所在货架Id" min-width="140"></el-table-column>
        <el-table-column fixed="right" prop="detail" label="货物明细">
          <template #default="scope">
            <el-button link type="primary" :underline="false" icon="InfoFilled" @click="handleGoodsDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData"/>
    </div>
    <AddGoods :visible="addGoodsVisible" @updateAddGoodsVisible="updateAddGoodsVisible"></AddGoods>
    <GoodsDetail :visible="goodDetailVisible" @updateGoodsDetailVisible="updateGoodsDetailVisible" :goodsDetail="goodsDetail"></GoodsDetail>
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

.goods-table {
  height: calc(50vh);
}
</style>
