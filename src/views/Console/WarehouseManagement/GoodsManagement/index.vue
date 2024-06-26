<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import MyPagination from '@/components/myPagination.vue'
import AddGoods from '@/views/components/AddGoods/index.vue'
import GoodsDetail from '@/views/components/GoodsDetail/index.vue'
import AddGoodsType from '@/views/components/AddGoodsType/index.vue'
import UpdateGoods from '@/views/components/UpdateGoods/index.vue'
import UpdateGoodsType from '@/views/components/UpdateGoodsType/index.vue'
import DeleteGoodsType from '@/views/components/DeleteGoodsType/index.vue'
import { onBeforeMount, ref, reactive } from 'vue'
import { getGoodsData, deleteGoods } from '@/api/manage'
import { getCookie } from '@/utils/setCookie'
import { messageBox } from '@/utils/message'
import type { GoodsDataType } from './type'
import type { PaginationType } from '../../type'
import { message } from '@/utils/message'

onBeforeMount(() => {
  initData()
})

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

// 编辑货物
const updateGoodsVisible = ref(false)
const updateUpdateGoodsVisible = () => {
  updateGoodsVisible.value = false
  initData()
}
const currentGoods = ref<GoodsDataType>()
const handleUpdateGoods = (goods: GoodsDataType) => {
  updateGoodsVisible.value = true
  currentGoods.value = goods
}

// 删除货物
const handleDeleteGoods = (goods: GoodsDataType) => {
  messageBox(`确认删除货物：${goods.goodsName}`, 'info', () => {
      deleteGoods(goods.goodsId)
      message('删除成功', 'success')
      initData()
  })
}

// 添加货物类型
const addGoodsTypeVisible = ref(false)
const updateAddGoodsTypeVisible = () => {
  addGoodsTypeVisible.value = false
  initData()
}

// 编辑货物类型
const updateGoodsTypeVisible = ref(false)
const updateUpdateGoodsTypeVisible = () => {
  updateGoodsTypeVisible.value = false
  initData()
}

// 删除货物类型
const deleteGoodsTypeVisible = ref(false)
const updateDeleteGoodsTypeVisible = () => {
  deleteGoodsTypeVisible.value = false
  initData()
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
        <div>
          <el-button type="primary" @click="addGoodsTypeVisible = true" v-if="getCookie('userType') === '2'">添加货物类型</el-button>
          <el-button type="primary" @click="updateGoodsTypeVisible = true" v-if="getCookie('userType') === '2'">编辑货物类型</el-button>
          <el-button type="primary" @click="deleteGoodsTypeVisible = true" v-if="getCookie('userType') === '2'">删除货物类型</el-button>
          <el-button type="primary" @click="addGoodsVisible = true">添加</el-button>
        </div>
      </div>
      <el-table :data="goodsData" class="goods-table">
        <el-table-column prop="goodsId" label="货物ID" min-width="140"></el-table-column>
        <el-table-column prop="goodsName" label="货物名称" min-width="140"></el-table-column>
        <el-table-column prop="goodsStatus" label="货物状态" min-width="140">
          <template #default="scope">
            <el-tag :type="tagType[statusType[scope.row.goodsStatus]]">{{ statusType[scope.row.goodsStatus] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="goodsTypeName" label="货物类型" min-width="140"></el-table-column>
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
        <el-table-column label="货物位置" min-width="140">
          <template #default="scope">
            <span>( {{ scope.row.positionX }}, {{ scope.row.positionY }} )</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" min-width="100">
            <template #default="scope">
                <el-button type="primary" link size="small" @click="handleUpdateGoods(scope.row)">编辑</el-button>
                <el-button type="danger" link size="small" @click="handleDeleteGoods(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        <el-table-column fixed="right" prop="detail" label="货物明细">
          <template #default="scope">
            <el-button link type="primary" :underline="false" icon="InfoFilled" @click="handleGoodsDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <MyPagination :pagination-data="pagination" @size-change="initData" @current-change="loadData"/>
    </div>
    <AddGoods :visible="addGoodsVisible" @updateAddGoodsVisible="updateAddGoodsVisible" />
    <GoodsDetail :visible="goodDetailVisible" @updateGoodsDetailVisible="updateGoodsDetailVisible" :goodsDetail="goodsDetail" />
    <UpdateGoods :visible="updateGoodsVisible" @updateUpdateGoodsVisible="updateUpdateGoodsVisible" :currentGoods="currentGoods"/>
    <AddGoodsType :visible="addGoodsTypeVisible" @updateAddGoodsTypeVisible="updateAddGoodsTypeVisible"/>
    <UpdateGoodsType :visible="updateGoodsTypeVisible" @updateUpdateGoodsTypeVisible="updateUpdateGoodsTypeVisible" />
    <DeleteGoodsType :visible="deleteGoodsTypeVisible" @updateDeleteGoodsTypeVisible="updateDeleteGoodsTypeVisible" />
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
