<script setup lang="ts">
</script>
<template>
  <el-header class="page-header">
    <el-image class="page-logo" src="https://upload.shejihz.com/2019/03/16dd1d1ec500dbccfcb52f210c4c1b07.jpg" fit="scale-down"/>
    <div class="title">物流机器人管理系统</div>
    <div class="user-info">
        <el-avatar :size="25" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <span>zhengguihao</span>
    </div>
  </el-header>
</template>
<style>
.page-header {
    background-color: #fff;
    padding: 0;
    position: relative;
}

.page-logo {
    width: 200px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
