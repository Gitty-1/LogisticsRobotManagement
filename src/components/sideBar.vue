<script setup lang="ts">
import { Male } from '@element-plus/icons-vue/global';
import router from '@/router';
import MenuList from './menuList.vue'
defineOptions({
    name: 'sideBar'
})
const menuList = [
    {
        path: '/console/home',
        name: '首页',
        menuId: 2
    },
    {
        path: '/console/management',
        name: '仓储管理',
        menuId: 1,
        children: [
            {
                path: '/console/management/goods',
                name: '货物管理',
                menuId: 1001,
                children: []
            },
            {
                path: '/console/management/shelves',
                name: '货架管理',
                menuId: 1002,
                children: []
            },
            {
                path: '/console/management/machineArms',
                name: '机械臂管理',
                menuId: 1003,
                chileren: []
            }
        ]
    }
]
</script>
<template>
    <el-aside class="aside-nav">
        <el-menu background-color="#314156" text-color="#fff"  active-text-color="#3e95ef" router :default-active="router.currentRoute.value.path">
            <MenuList :menuList="menuList"/>
        </el-menu>
    </el-aside>
</template>
<style scoped>
.aside-nav {
    width: 200px;
}
</style>
