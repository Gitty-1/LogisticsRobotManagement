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
      component: () => import('@/views/console.vue')
    }
  ]
})

export default router
