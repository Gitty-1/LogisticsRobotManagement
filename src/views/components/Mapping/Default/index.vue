<script setup lang="ts">
</script>
<template>
    <div class="default-container">
        <el-card class="card">
            <template #header>
            <div class="card-header">
                <span>物流方案一</span>
            </div>
            </template>
            <p class="text">装载货物--装载机器人</p>
            <p class="text">运输货物--带机械臂装载机器人</p>
            <p class="text">上架货物--带机械臂装载机器人</p>
        </el-card>
        <el-card class="card">
            <template #header>
            <div class="card-header">
                <span>物流方案二</span>
            </div>
            </template>
            <p class="text">装载货物--装载机器人</p>
            <p class="text">运输货物--装载机器人</p>
            <p class="text">上架货物--机械臂</p>
        </el-card>
    </div>
</template>
<style scoped>
.default-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.card {
    min-width: 480px;
    min-height: 500px;
    margin: 20px 80px;
}
.text {
    margin: 50px 10px;
    font-size: 20px;
    font-weight: bold;
}
</style>
