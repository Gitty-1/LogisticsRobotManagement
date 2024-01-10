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
        meta: {
            icon: 'HomeFilled'
        }
    },
    {
        path: '/console/management',
        name: '仓储管理',
        meta: {
            icon: 'Menu'
        },
        children: [
            {
                path: '/console/management/goods',
                name: '货物管理',
                meta: {
                    icon: 'SetUp'
                },
                children: []
            },
            {
                path: '/console/management/shelves',
                name: '货架管理',
                meta: {
                    icon: 'Tickets'
                },
                children: []
            },
            {
                path: '/console/management/machineArms',
                name: '机械臂管理',
                meta: {
                    icon: 'Van'
                },
                chileren: []
            }
        ]
    },
    {
        path: '/console/userManage',
        name: '用户管理',
        meta: {
            icon: 'UserFilled'
        },
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
