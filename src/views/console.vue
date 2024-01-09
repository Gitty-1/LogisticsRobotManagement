<script setup lang="ts">
import SideBar from '@/components/sideBar.vue'
import router from '@/router';
import { onMounted } from 'vue';
onMounted(() => {
    router.push('/console/home')
})
</script>
<template>
    <el-container class="page-container">
        <el-header>Header</el-header>
        <el-container>
            <SideBar />
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<style scoped>
.page-container {
    width: calc(100vw);
    height: calc(100vh);
}
</style>
