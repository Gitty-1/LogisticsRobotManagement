<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
</script>
<template>
  <div>
    <MyBreadcrumb title="机械臂管理"></MyBreadcrumb>
    <div>
      <el-card>
        <template #header>
          <span>机械二臂</span>
        </template>
        <el-form>
          <el-form-item label="电量">
            <el-progress :+="50" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
</style>
