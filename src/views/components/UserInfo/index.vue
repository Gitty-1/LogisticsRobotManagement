<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

// 数据
const userStore = useUserStore()
const userName = ref(userStore.userName)
const isEnableEdit = ref(false)

// 方法
const handleEdit = (isEdit: boolean) => {
    isEnableEdit.value = isEdit
}

</script>
<template>
  <div class="info">
    <div class="info-item">
        <el-text>用户名称：</el-text>
        <el-text style="display: flex;">
            <el-input v-model="userName" style="width: 50%;" :disabled="!isEnableEdit" />
            <el-button v-show="!isEnableEdit" link type="primary" :underline="false" icon="Edit" @click="handleEdit(true)"></el-button>
            <el-button v-show="isEnableEdit" link type="primary" :underline="false" @click="handleEdit(false)">确定</el-button>
        </el-text>
    </div>
    <div class="info-item">
        <el-text>邮箱：</el-text>
        <el-text type="primary">{{ userStore.email }}</el-text>
    </div>
    <div class="info-item">
        <el-text>用户类型：</el-text>
        <el-text>{{ userStore.userType }}</el-text>
    </div>
  </div>
</template>
<style scoped>
.info {
    
}
.info-item {
    display: flex;
    width: 100%;
}
.info-item span:first-child {
    width: 20%;
    font-size: 16px;
    font-weight: bold;
}
</style>
