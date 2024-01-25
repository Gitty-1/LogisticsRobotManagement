<script setup lang="ts">
import Echarts from '@/components/echarts.vue'

const option1 = {
  title: {
    text: "用户日活量",
  },
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "1%",
    right: "10%",
    bottom: "11%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  dataZoom: [
    {
      startValue: '2014-06-01'
    },
  ],
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: '用户日活量',
      type: "line",
      stack: "总量",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  ],
};

const option2 = {
  title: {
    text: "任务分配数量",
  },
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "1%",
    right: "10%",
    bottom: "11%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  dataZoom: [
    {
      startValue: '2014-06-01'
    },
  ],
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: '任务分配数量',
      type: "line",
      stack: "总量",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  ],
};

const option3 = {
  title: {
    text: '货物日出入库数量'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['入库', '出库']
  },
  grid: {
    left: "1%",
    right: "15%",
    bottom: "11%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      startValue: '2014-06-01'
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07"]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '入库',
      type: 'line',
      data: [50, 60, 70, 20, 40, 11, 44]
    },
    {
      name: '出库',
      type: 'line',
      data: [20, 43, 65, 44, 22, 11, 42]
    }
  ]
}

const option4 = {
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
  <div class="page-container">
    <div class="container">
      <Echarts :option="option1" htmlId="echart1">
        <div id="echart1"></div>
      </Echarts>
      <Echarts :option="option2" htmlId="echart2">
        <div id="echart2"></div>
      </Echarts>

    </div>
    <div class="container">
      <Echarts :option="option3" htmlId="echart3">
        <div id="echart3"></div>
      </Echarts>
      <Echarts :option="option4" htmlId="echart4">
        <div id="echart4"></div>
      </Echarts>
    </div>
  </div>
</template>
<style scoped>
.page-container {
  display: flex;
  /* background-image: linear-gradient(#dbedf3,#d7f1c2, #ffffff); */
}

.container {
  display: flex;
  flex: row nowrap;
}

#echart1, #echart2, #echart3, #echart4 {
  width: calc(35vw);
  height: calc(30vh);
  margin: 40px;
}

</style>
