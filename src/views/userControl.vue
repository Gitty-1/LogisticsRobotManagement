<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue';
import Header from '@/components/header.vue';
import UserInfo from '@/views/components/UserInfo/index.vue'
import UpdatePassword from '@/views/components/UpdateUserInfo/UpdatePassword/index.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const route = useRoute()
const userName = route.query.userName

const activeName = ref('userInfo')
const isReset = ref(false)

const handleClick = () => {
  
}
const handleTabChange = () => {
  isReset.value = !isReset.value
}
</script>
<template>
  <el-container class="page-container">
    <Header></Header>
    <el-main class="page-content">
      <el-card class="user-card" body-style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <div class="user-avatar">
          <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          <el-text size="large">{{ userStore.userName }}</el-text>
        </div>
      </el-card>
      <el-card class="user-card userInfo">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" @tab-change="handleTabChange">
          <el-tab-pane label="基本信息" name="userInfo">
            <div class="userCenter">
              <UserInfo />
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="updatePassword">
            <div class="userCenter update-password">
              <UpdatePassword :isReset="isReset"/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-main>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-card {
  width: 40%;
}
.userInfo {
  margin-top: 5%;
}

.user-avatar {
  display: flex;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.userCenter {
  height: calc(30vh);
}
.update-password {
  width: calc(20vw);
  margin: 0 auto;
}
</style>
