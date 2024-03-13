<script setup lang="ts">
import { getCurrentInstance, onMounted, watch } from "vue";

const props = defineProps({
    option: Object,
    htmlId: String
})

const { proxy } = getCurrentInstance() as any;

const setEcharts = (chartDom: any, option: any) => {
  let myChart = proxy.$echarts.init(chartDom)
  if(chartDom) {
    if(myChart != null && myChart !== undefined && myChart !== "") {
      myChart.dispose();
    }
    myChart = proxy.$echarts.init(chartDom)
  }
  myChart.setOption(option)
  window.onresize = function () {
    myChart.resize()
  }
}

onMounted(() => {
  const chartDom1 = <HTMLElement>document.getElementById(props.htmlId as string)
  setEcharts(chartDom1, props.option)
})

watch(() => props.option, (newValue: any) => {
  const chartDom1 = <HTMLElement>document.getElementById(props.htmlId as string)
  setEcharts(chartDom1, newValue)
}, { deep: true})
</script>
<template>
  <slot></slot>
</template>
<style scoped>
</style>
