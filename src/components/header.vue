<script setup lang="ts">
import logoUrl from '../assets/logo.png';
</script>
<template>
  <el-header class="page-header">
    <el-image class="page-logo" :src="logoUrl" fit="scale-down"/>
    <div class="title">物流机器人管理系统</div>
    <div class="user-info">
        <label class="user-label">
            <el-avatar :size="25" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <span>zhengguihao</span>
        </label>
    </div>
  </el-header>
</template>
<style>
.page-header {
    background-color: rgba(0, 255, 0, 0.1);
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
    width: 120px;
    position: absolute;
    right: 2%;
    top: 25%;
}
.user-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}
</style>
