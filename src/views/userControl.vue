<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const userName = route.query.userName
</script>
<template>
  个人中心
  {{ userName }}
</template>
<style scoped>
</style>
