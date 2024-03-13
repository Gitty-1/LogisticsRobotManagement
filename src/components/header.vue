<script setup lang="ts">
import logoUrl from '../assets/logo.png';
import router from '@/router';
import { useUserStore } from '@/stores/user'

// 数据
const userStore = useUserStore()

// 方法
const handleUserControl = () => {
    router.push({path: '/userCenter', query: { userName: '郑桂浩' }})
}
const exit = () => {
    router.replace({path: '/login-register'})
}



</script>
<template>
  <el-header class="page-header" height="calc(10vh)">
    <el-image class="page-logo" :src="logoUrl" fit="scale-down"/>
    <div class="title">物流机器人管理系统</div>
    <div class="user-info">
        <el-avatar :size="25" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <el-dropdown trigger="click">
            <span>
                <span>{{ userStore.userName }}</span>
                <el-icon>
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleUserControl">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
  </el-header>
</template>
<style>
.page-header {
    background-color: skyblue;
    padding: 0;
    position: relative;
}

.page-logo {
    width: 200px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 5px;
}

.user-info {
    display: flex;
    justify-content: space-around;
    width: 130px;
    position: absolute;
    right: 2%;
    top: 25%;
    cursor: pointer;
}
</style>
