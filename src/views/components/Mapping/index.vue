<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount, onMounted, onUnmounted } from 'vue'
import Default from './Default/index.vue'
import Path1 from './Path1/index.vue'
import Path2 from './Path2/index.vue'
import Path3 from './Path3/index.vue'
import type { GoodsType } from './type'
import { getGoodsList, getScheme } from '@/api/map'
// import  webSocket2  from '@/utils/webSocket2';
import { message } from '@/utils/message'
import { useWsStore } from '@/stores/ws'

let webSocket2: WebSocket

onBeforeMount(async () => {
  const res = await getGoodsList()
  const { data } = res
  goodsList.value = data

  currentSchemeComponent.value = Default
})

onMounted(() => {
  const ws = useWsStore()
  // webSocket2 = new WebSocket('ws://localhost:8082/webSocket/map')
  webSocket2 = new WebSocket(`ws://${ws.wsHost}:${ws.wsPort}/${ws.wsBaseUrl}/${ws.wsUrl[1]}`)

  webSocket2.addEventListener('open', (e: any) => {
    console.log('连接成功', e)
  })
  webSocket2.addEventListener('message', (e: any) => {
    const data = JSON.parse(e.data)
    const goodsId = data.data.goodsId
    
    console.log('goodsId', goodsId)
    //@ts-ignore
    if(currentGoods.goodsId === goodsId) {
      message(`${currentGoods.goodsName} 路径更新`, 'success')
      drawPath()
    }
  })
  webSocket2.addEventListener('error', (e: any) => {
    console.log('连接错误', e)
  })
  webSocket2.addEventListener('close', (e: any) => {
    console.log('连接关闭', e)
  })
})

onUnmounted(() => {
  console.log('map')
  // webSocket2.send('关闭map')
  webSocket2.close()
})

const currentSchemeComponent = ref<typeof Path3 | typeof Path2 | typeof Path1 | typeof Default | null>(null)

const goodsList = ref<GoodsType[]>()
const currentGoods = reactive<GoodsType>({
  goodsId: null,
  goodsName: ''
})

const currentScheme = ref<number>()

const drawPath = async () => {
    currentSchemeComponent.value = Default
    const res = await getScheme(currentGoods.goodsId as number)
    const { data } = res
    const { scheme, pathCount } = data
    currentScheme.value = scheme
    if(pathCount === 3) {
      currentSchemeComponent.value = Path3
    } else if(pathCount === 2) {
      currentSchemeComponent.value = Path2
    } else if(pathCount === 1) {
      currentSchemeComponent.value = Path1
    }
}

watch(() => currentGoods.goodsId, (value) => {
  if(value) {
    drawPath()
  } else {
    currentSchemeComponent.value = Default
  }
})


</script>

<template>
  
  <div class="map-select">
    <span>请选择货物</span>
    <el-select v-model="currentGoods.goodsId" placeholder="请选择货物" size="large" clearable>
      <el-option v-for="item in goodsList" :key="item.goodsId" :label="item.goodsName" :value="item.goodsId"></el-option>
    </el-select>
  </div>
  <component :is="currentSchemeComponent" :goodsId="currentGoods.goodsId" :scheme="currentScheme"/>
</template>

<style scoped>
#stage {
  border: 1px solid black;
}
.map-select {
  height: calc(10vh);
  padding: 20px;
}
.map-select span {
  font-weight: bold;
  margin-right: 20px;
}
</style>