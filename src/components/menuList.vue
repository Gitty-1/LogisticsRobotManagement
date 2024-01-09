<script setup lang="ts">
import { defineProps } from 'vue'
import MenuList from './menuList.vue'
defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
    <template v-for="menu in menuList" :key="menu.menuId">
        <el-sub-menu v-if="menu.children && menu.children.length" :key="menu.menuId" :index="menu.path">
            <template #title>
                <el-icon>{{ menu.icon }}</el-icon>
                <span>{{ menu.name }}</span>
            </template>
            <MenuList :menuList="menu.children" />
        </el-sub-menu>
        <el-menu-item :key="menu.menuId" :index="menu.path" v-else >
            <template #title>
                <el-icon>{{ menu.icon }}</el-icon>
                <span>{{ menu.name }}</span>
            </template>
        </el-menu-item>
    </template>
</template>
<style>
</style>
