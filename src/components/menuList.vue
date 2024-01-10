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
        <el-sub-menu v-if="menu.children && menu.children.length" :key="menu.name" :index="menu.path">
            <template #title>
                <component :is="menu.meta.icon" style="width: 16px;height: 16px;margin-right: 5px;"></component>
                <span>{{ menu.name }}</span>
            </template>
            <MenuList :menuList="menu.children" />
        </el-sub-menu>
        <el-menu-item :key="menu.name" :index="menu.path" v-else >
            <template #title>
                <component :is="menu.meta.icon" style="color: #fff; width: 16px;height: 16px;margin-right: 5px;"></component>
                <span>{{ menu.name }}</span>
            </template>
        </el-menu-item>
    </template>
</template>
<style>
</style>
