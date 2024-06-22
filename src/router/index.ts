import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
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
export const asyncRoute: Array<menuListType> = [
  {
    path: 'home',
    name: '首页',
    meta: {
      icon: 'HomeFilled',
      permission: [1, 2]
    },
    component: () => import('@/views/Console/Home/index.vue'),
  },
  {
    path: 'management',
    name: '仓储管理',
    meta: {
      icon: 'Menu',
      permission: [1, 2]
    },
    component: () => import('@/views/Console/WarehouseManagement/index.vue'),
    children: [
      {
        path: 'goods',
        name: '货物管理',
        meta: {
          icon: 'SetUp',
          permission: [1, 2]
        },
        component: () => import('@/views/Console/WarehouseManagement/GoodsManagement/index.vue')
      },
      {
        path: 'shelves',
        name: '货架管理',
        meta: {
          icon: 'Tickets',
          permission: [1, 2]
        },
        component: () => import('@/views/Console/WarehouseManagement/ShelvesManagement/index.vue')
      },
      {
        path: 'robots',
        name: '机器人管理',
        meta: {
          icon: 'Edit',
          permission: [1, 2]
        },
        component: () => import('@/views/Console/WarehouseManagement/RobotsManagement/index.vue')
      }
    ]
  },
  {
    path: 'assignTask',
    name: '任务分配',
    meta: {
      icon: 'Operation',
      permission: [1, 2]
    },
    component: () => import('@/views/Console/AssignTask/index.vue')
  },
  {
    path: 'mapWatch',
    name: '地图&监测',
    meta: {
      icon: 'Location',
      permission: [1, 2]
    },
    component: () => import('@/views/Console/MapWatch/index.vue')
  },
  {
    path: 'userManage',
    name: '用户管理',
    meta: {
      icon: 'UserFilled',
      permission: [2]
    },
    component: () => import('@/views/Console/UserManagement/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/console/home'
    },
    {
      path: '/login-register',
      name: 'login-register',
      meta: {
        permission: [1, 2]
      },
      component: ()=>import('@/views/Login/index.vue')
    },
    {
      path: '/console',
      redirect: '/console/home',
      meta: {
        permission: [1, 2]
      },
      component: () => import('@/views/Console/index.vue'),
      children : <any>asyncRoute
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      meta: {
        permission: [1, 2]
      },
      component: () => import('@/views/UserCenter/index.vue')
    },
    {
      path: '/404',
      name: '404',
      meta: {
        permission: [1, 2]
      },
      component: () => import('@/views/404.vue')
    }
  ]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  //@ts-ignore
  if(!to.meta.permission.includes(userStore.userType)) {
    next('/404')
  } else {
    next()
  }
})

export default router
