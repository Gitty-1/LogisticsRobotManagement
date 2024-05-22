<script setup lang="ts">
import Echarts from '@/components/echarts.vue'
import { computed, onBeforeMount, ref, reactive } from 'vue';

import { getGoodsType, getDAU, getAssignTaskCountChart, getGoodsShelvingCountChart } from '@/api/home'

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
    left: "4%",
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

const assignTaskDate = ref<string[]>()
const assignTaskData = ref<number[]>()
const option2 = reactive({
  title: {
    text: "任务分配数量",
  },
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "4%",
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
    startValue: computed(() => [...assignTaskDate.value || []][0] || null)
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: computed(() => assignTaskDate.value),
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
      name: '任务分配数量',
      type: "line",
      stack: "总量",
      data: computed(() => assignTaskData.value),
    },
  ],
});

const shelfDate = ref<string>()
const shelfData = ref<number>()
const option3 = reactive({
  title: {
    text: '每日货物上架数量'
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: "4%",
    right: "8%",
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
      startValue: computed(() => [...shelfDate.value || []][0] || null)
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: computed(() => shelfDate.value)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'line',
      data: computed(() => shelfData.value)
    },
  ]
})

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
  dau.value = data.map((item: any) => item.value)

  const res2 = await getGoodsType()
  const data2 = res2.data
  goodsTypeData.value = data2.map((item: any) => {
    return {
      name: item.goodsTypeName,
      value: item.value
    }
  })

  const res3 = await getAssignTaskCountChart()
  const data3 = res3.data
  assignTaskData.value = data3.map((item: any) => item.value)
  assignTaskDate.value = data3.map((item: any) => item.date)

  const res4 = await getGoodsShelvingCountChart()
  const data4 = res4.data
  shelfData.value = data4.map((item: any) => item.value)
  shelfDate.value = data4.map((item: any) => item.date)
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
