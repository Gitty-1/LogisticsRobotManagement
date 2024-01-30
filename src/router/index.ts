import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
interface menuListType {
  path: String,
  name: String,
  meta: {
      icon: String
  },
  component: () => Promise<any>
  children?: Array<menuListType>
}
export const asyncRoute: Array<menuListType> = [
  {
    path: 'home',
    name: '首页',
    meta: {
      icon: 'HomeFilled'
    },
    component: () => import('@/views/home.vue'),
  },
  {
    path: 'management',
    name: '仓储管理',
    meta: {
      icon: 'Menu'
    },
    component: () => import('@/views/management/index.vue'),
    children: [
      {
        path: 'goods',
        name: '货物管理',
        meta: {
          icon: 'SetUp'
        },
        component: () => import('@/views/management/goods.vue')
      },
      {
        path: 'shelves',
        name: '货架管理',
        meta: {
          icon: 'Tickets'
        },
        component: () => import('@/views/management/shelves.vue')
      },
      {
        path: 'machineArms',
        name: '机械臂管理',
        meta: {
          icon: 'Van'
        },
        component: () => import('@/views/management/machineArms.vue')
      },
      {
        path: 'robots',
        name: '机器人管理',
        meta: {
          icon: 'Edit'
        },
        component: () => import('@/views/management/robots.vue')
      }
    ]
  },
  {
    path: 'mapWatch',
    name: '地图&监测',
    meta: {
      icon: 'Location'
    },
    component: () => import('@/views/mapWatch.vue')
  },
  {
    path: 'errorWatch',
    name: '故障检测',
    meta: {
      icon: 'Warning'
    },
    component: () => import('@/views/errorWatch.vue')
  },
  {
    path: 'userManage',
    name: '用户管理',
    meta: {
      icon: 'UserFilled'
    },
    component: () => import('@/views/userManage.vue')
  },
  {
    path: 'setting',
    name: '设置',
    meta: {
      icon: 'Setting'
    },
    component: () => import('@/views/setting.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login.vue')
    },
    {
      path: '/console',
      name: 'console',
      component: () => import('@/views/console.vue'),
      children : <any>asyncRoute
    },
    {
      path: '/userControl',
      name: 'userControl',
      component: () => import('@/views/userControl.vue')
    }
  ]
})

export default router
