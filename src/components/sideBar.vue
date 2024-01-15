<script setup lang="ts">
import router from '@/router';
import { asyncRoute } from '@/router';
import MenuList from './menuList.vue'
defineOptions({
    name: 'sideBar'
})
const rootPath = '/console'
</script>
<template>
    <el-aside class="aside-nav">
        <el-menu class="aside-menu" background-color="#314156" text-color="#fff"  active-text-color="#3e95ef" router :default-active="router.currentRoute.value.path">
            <MenuList :menuList="asyncRoute" :fatherPath="rootPath"/>
        </el-menu>
    </el-aside>
</template>
<style scoped>
.aside-nav {
    width: 200px;
}
.aside-menu {
    height: calc(100vh);
}
</style>
