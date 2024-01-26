<script setup lang="ts">
import SideBar from '@/components/sideBar.vue'
import Header from '@/components/header.vue'
import router from '@/router';
import { onMounted } from 'vue';
onMounted(() => {
    router.push('/console/home')
})
</script>
<template>
    <el-container class="page-container">
        <Header></Header>
        <el-container>
            <SideBar />
            <el-main class="page-content">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<style scoped>
.page-container {
    width: calc(100vw);
    height: calc(90vh);
    display: flex;
    flex-direction: column;
}
.page-content {
    padding: 0;
    overflow-x: hidden;
}
</style>
