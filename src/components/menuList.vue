<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted } from 'vue'
import MenuList from './menuList.vue'
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  fatherPath: String
})

onBeforeMount(() => {
    console.log('res', props.menuList)
})
</script>
<template>
    <template v-for="menu in props.menuList" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length" :key="menu.name" :index="`${props.fatherPath}/${menu.path}`">
            <template #title>
                <component :is="menu.meta.icon" style="width: 16px;height: 16px;margin-right: 5px;"></component>
                <span>{{ menu.name }}</span>
            </template>
            <MenuList :menuList="menu.children" :fatherPath="`${props.fatherPath}/${menu.path}`" />
        </el-sub-menu>
        <el-menu-item :key="menu.name" :index="`${props.fatherPath}/${menu.path}`" v-else >
            <template #title>
                <component :is="menu.meta.icon" style="color: #fff; width: 16px;height: 16px;margin-right: 5px;"></component>
                <span>{{ menu.name }}</span>
            </template>
        </el-menu-item>
    </template>
</template>
<style>
</style>
