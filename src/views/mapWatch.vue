<script setup lang="ts">
import { ref } from 'vue'
import LoadGoods from '@/views/components/Tasks/LoadGoods/index.vue'
import TransportGoods from '@/views/components/Tasks/TransportGoods/index.vue'
import ShelvesGoods from '@/views/components/Tasks/ShelvesGoods/index.vue'

const loadGoodsVisible = ref(false)
const updateLoadGoodsVisible = () => {
  loadGoodsVisible.value = false
}
const transportGoodsVisible = ref(false)
const updateTransportGoodsVisible = () => {
  transportGoodsVisible.value = false
}
const shelvesGoodsVisible = ref(false)
const updateShelvesGoodsVisible = () => {
  shelvesGoodsVisible.value = false
}
</script>
<template>
  <div class="map-button">
    <el-button type="primary" @click="loadGoodsVisible = true">装载货物</el-button>
    <el-button type="primary" @click="transportGoodsVisible = true">运送货物</el-button>
    <el-button type="primary" @click="shelvesGoodsVisible = true">货物上架</el-button>
  </div>
  <LoadGoods :visible="loadGoodsVisible" @updateLoadGoodsVisible="updateLoadGoodsVisible" />
  <TransportGoods :visible="transportGoodsVisible" @updateTransportGoodsVisible="updateTransportGoodsVisible" />
  <ShelvesGoods :visible="shelvesGoodsVisible" @updateShelvesGoodsVisible="updateShelvesGoodsVisible" />
</template>
<style scoped>
.map-button {
  margin: 2%;
}
</style>
