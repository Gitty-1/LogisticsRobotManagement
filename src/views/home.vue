<script setup lang="ts">
import Echarts from '@/components/echarts.vue'
import { computed, onBeforeMount, ref, reactive } from 'vue';

import { getGoodsType, getDAU } from '@/api/home'

onBeforeMount(() => {
  initData()
})

const dauDate = ref<string[]>()
const dau = ref<number[]>()
const option1 = reactive({
  title: {
    text: "用户日活量",
  },
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "2%",
    right: "8%",
    bottom: "11%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  dataZoom: {
    startValue: computed(() => [...dauDate.value || []][0] || null)
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: computed(() => dauDate.value),
  },
  yAxis: {
    type: "value",
    axisLabel: {
      interval: 'auto',
      formatter: function(value: number) {
        if(value % 1 === 0) {
          return value
        }
        return ''
      }
    }
  },
  series: [
    {
      name: '用户日活量',
      type: "line",
      stack: "总量",
      data: computed(() => dau.value),
    },
  ],
});

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

interface GoodsTypeDataType {
  name: string,
  value: number
}
const goodsTypeData = ref<GoodsTypeDataType[]>()
const option4 = reactive({
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
      data: computed(() => goodsTypeData.value)
    }
  ]
})

const initData = async () => {
  const res1 = await getDAU()
  const { data } = res1
  dauDate.value = data.map((item: any) => item.date)
  dau.value = data.map((item: any) => item.dau)

  const res2 = await getGoodsType()
  const data2 = res2.data
  goodsTypeData.value = data2.map((item: any) => {
    return {
      name: item.goodsTypeName,
      value: item.value
    }
  })
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
