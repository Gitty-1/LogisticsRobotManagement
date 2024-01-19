<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import androidUrl from '@/assets/android.png'
</script>
<template>
  <div>
    <MyBreadcrumb title="机器人管理"></MyBreadcrumb>
    <div class="page-content">
      <el-card class="card">
        <template #header>
          <el-image style="width: 100px; height: 100px;" :src="androidUrl"></el-image>
        </template>
        <!-- <div class="form">
          <div class="form-item"><span>电量</span><el-progress :percentage="50" style="width: 350px;"/></div>
          <div class="form-item"><span>状态</span><el-tag type="success">启动中</el-tag></div>
        </div> -->
        <el-descriptions direction="vertical" :column="1">
          <el-descriptions-item label="名称"><span style="font-size: 12px; color: blue;">机器人A</span></el-descriptions-item>
          <el-descriptions-item label="电量"><el-progress :percentage="50" style="width: 350px;"/></el-descriptions-item>
          <el-descriptions-item label="状态"><el-tag type="success">启动中</el-tag></el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="card">
        <template #header>
          <el-image style="width: 100px; height: 100px;" :src="androidUrl"></el-image>
        </template>
        <el-descriptions direction="vertical" :column="1">
          <el-descriptions-item label="名称"><span style="font-size: 12px; color: blue;">机器人B</span></el-descriptions-item>
          <el-descriptions-item label="电量"><el-progress :percentage="100" style="width: 350px;"/></el-descriptions-item>
          <el-descriptions-item label="状态"><el-tag type="danger">未启动</el-tag></el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.page-content {
  margin: 50px;
  display: flex;
  justify-content: space-between;
}
.card {
  width: 45%;
}
.form-item {
  display: flex;
  justify-content: space-around;
}
</style>
