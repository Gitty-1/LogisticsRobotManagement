<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted, ref, type PropType } from 'vue'
import MenuList from './menuList.vue'
import { useUserStore } from '@/stores/user';
import type { use } from 'echarts';

interface menuListType {
    path: String,
    name: String,
    meta: {
        icon: String,
        permission: Array<Number>
    },
    component: () => Promise<any>
    children?: Array<menuListType>
}
const props = defineProps({
  menuList: {
    type: Array as PropType<menuListType[]>,
    default: () => []
  },
  fatherPath: String
})

interface UserType {
    userName: String,
    email: String,
    userType: Number
}
const user = ref<UserType>({
    userName: '',
    email: '',
    userType: 1
})

onBeforeMount(() => {
    console.log('res', props.menuList)
    user.value = useUserStore()
})
</script>
<template>
    <template v-for="menu in props.menuList" :key="menu.path">
        <el-sub-menu v-if="menu.children?.length && menu.meta.permission.includes(user.userType)" :key="menu.name" :index="`${props.fatherPath}/${menu.path}`">
            <template #title>
                <component :is="menu.meta.icon" style="width: 16px;height: 16px;margin-right: 5px;"></component>
                <span>{{ menu.name }}</span>
            </template>
            <MenuList :menuList="menu.children" :fatherPath="`${props.fatherPath}/${menu.path}`" />
        </el-sub-menu>
        <el-menu-item v-if="!menu.children?.length && menu.meta.permission.includes(user.userType)" :key="menu.path" :index="`${props.fatherPath}/${menu.path}`">
            <template #title>
                <component :is="menu.meta.icon" style="color: #fff; width: 16px;height: 16px;margin-right: 5px;"></component>
                <span>{{ menu.name }}</span>
            </template>
        </el-menu-item>
    </template>
</template>
<style>
</style>
