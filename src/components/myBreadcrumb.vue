<script setup lang="ts">
defineProps({
    title: String
})
</script>
<template>
  <el-breadcrumb class="bread">{{ title }}</el-breadcrumb>
</template>
<style scoped>
.bread {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 1px 1px 1px #666;
}
</style>
