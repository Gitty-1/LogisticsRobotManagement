import { createRouter, createWebHistory } from 'vue-router'

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
      children : [
        {
          path: 'home',
          name: '首页',
          component: () => import('@/views/home.vue'),
        },
        {
          path: 'management',
          name: '仓储管理',
          component: () => import('@/views/management/index.vue'),
          children: [
            {
              path: 'goods',
              name: '货物管理',
              component: () => import('@/views/management/goods.vue')
            },
            {
              path: 'shelves',
              name: '货架管理',
              component: () => import('@/views/management/shelves.vue')
            },
            {
              path: 'machineArms',
              name: '机械臂管理',
              component: () => import('@/views/management/machineArms.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
