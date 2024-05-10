<script setup lang="ts">
import { ref, watch } from 'vue'
import Scheme1 from './Scheme1/index.vue'
import Scheme2 from './Scheme2/index.vue'

const scheme = ref<number>()
const currentSchemeComponent = ref<typeof Scheme1 | typeof Scheme2 | null>(null)

watch(() => scheme.value, (value) => {
  if (value === 1) {
    currentSchemeComponent.value = Scheme1
  } else if (value === 2) {
    currentSchemeComponent.value = Scheme2
  }
})

</script>

<template>
  
  <div class="map-select">
    <span>请选择物流方案</span>
    <el-select v-model="scheme" placeholder="请选择物流方案" size="large">
      <el-option label="使用带机械臂装载机器人" :value="1"></el-option>
      <el-option label="不使用带机械臂装载机器人" :value="2"></el-option>
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