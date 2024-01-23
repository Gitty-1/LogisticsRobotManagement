<script setup lang="ts">
import MyBreadcrumb from '@/components/myBreadcrumb.vue'
import Echarts from '@/components/echarts.vue'
import machineArmsUrl from '@/assets/machineArms.jpg'

const option = {
  title: {
    text: '货物类型'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  series: [
    {
      name: '货物类型',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 40, name: '类型一' },
        { value: 60, name: '类型二' },
        { value: 30, name: '类型三' },
        { value: 80, name: '类型四' },
        { value: 110, name: '类型五' },
      ]
    }
  ]
}
</script>
<template>
  <div>
    <MyBreadcrumb title="机械臂管理"></MyBreadcrumb>
    <div class="page-content">
      <el-card class="card">
        <template #header>
          <el-image style="width: 150px; height: 100px;" :src="machineArmsUrl"></el-image>
        </template>
        <el-descriptions direction="vertical" :column="1">
          <el-descriptions-item label="电量"><el-progress :percentage="50" style="width: 350px;"/></el-descriptions-item>
          <el-descriptions-item label="状态"><el-tag type="success">启动中</el-tag></el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="card">
        <template #header>
          机械臂状态
        </template>
        <Echarts :option="option" htmlId="echart">
          <div id="echart"></div>
        </Echarts>
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
#echart {
  width: 400px;
  height: 300px;
}
</style>
