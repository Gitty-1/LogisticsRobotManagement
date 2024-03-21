<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue';

// 数据
const tableData = [
  {
    name: '机械臂',
    isError: true,
    errorType: '电路故障',
    fixTime: '2024-02-20',
  },
  {
    name: '机器人A',
    isError: true,
    errorType: '电路故障',
    fixTime: '2024-02-20',
  },{
    name: '机器人B',
    isError: false,
    errorType: '--',
    fixTime: '--',
  },
]
</script>
<template>
  <div>
    <MyBreadcrumb title="故障检测"></MyBreadcrumb>
    <div class="error-table">
      <el-table :data="tableData">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="isError" label="是否故障"></el-table-column>
        <el-table-column prop="errorType" label="故障类型"></el-table-column>
        <el-table-column prop="fixTime" label="预计修复时间"></el-table-column>
        <el-table-column prop="operator" label="操作">
          <template #default="scope">
            <el-button type="primary" link :disabled="!scope.row.isError">提醒修复</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
.error-table {
  padding: 20px;
}
</style>
