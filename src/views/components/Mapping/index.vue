<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue'
import Scheme2 from './Scheme2/index.vue'
import Default from './Default/index.vue'
import Path1 from './Path1/index.vue'
import Path2 from './Path2/index.vue'
import Path3 from './Path3/index.vue'
import type { GoodsType } from './type'
import { getGoodsList, getScheme } from '@/api/map'

onBeforeMount(async () => {
  const res = await getGoodsList()
  const { data } = res
  goodsList.value = data

  currentSchemeComponent.value = Default
})

const currentSchemeComponent = ref<typeof Path3 | typeof Path2 | typeof Default | null>(null)

const goodsList = ref<GoodsType[]>()
const currentGoods = reactive<GoodsType>({
  goodsId: null,
  goodsName: ''
})

const currentScheme = ref<number>()

watch(() => currentGoods.goodsId, async (value) => {
  if(value) {
    const res = await getScheme(currentGoods.goodsId as number)
    const { data } = res
    const { scheme, pathCount } = data
    currentScheme.value = scheme
    if(pathCount === 3) {
      currentSchemeComponent.value = Path1
    }
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