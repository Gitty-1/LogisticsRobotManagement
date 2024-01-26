<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from '@/components/header.vue';

const route = useRoute()
const userName = route.query.userName
</script>
<template>
  <el-container class="page-container">
    <Header></Header>
    <el-main class="page-content"></el-main>
  </el-container>
</template>
<style scoped>
.page-container {
  width: calc(100vw);
  height: calc(100vh);
  display: flex;
  flex-direction: column;
}
.page-content {
  background-color: aqua;
}
</style>
