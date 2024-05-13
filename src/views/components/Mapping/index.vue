<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import Scheme1 from './Scheme1/index.vue'
import Scheme2 from './Scheme2/index.vue'
import Default from './Default/index.vue'
import type { GoodsType } from './type'

const currentSchemeComponent = ref<typeof Scheme1 | typeof Scheme2 | typeof Default | null>(null)

const currentGoods = reactive<GoodsType>({
  goodsId: null,
  goodsName: ''
})

watch(() => currentGoods.goodsId, (value) => {
  // await ...
  if(currentGoods.goodsId === 1) {
    currentSchemeComponent.value = Scheme1
  } else if(currentGoods.goodsId === 2) {
    currentSchemeComponent.value = Scheme2
  } else {
    currentSchemeComponent.value = Default
  }
}, {immediate: true})

</script>

<template>
  
  <div class="map-select">
    <span>请选择货物</span>
    <el-select v-model="currentGoods.goodsId" placeholder="请选择货物" size="large" clearable>
      <el-option label="货物1" :value="1"></el-option>
      <el-option label="货物2" :value="2"></el-option>
    </el-select>
  </div>
  <component :is="currentSchemeComponent"/>
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