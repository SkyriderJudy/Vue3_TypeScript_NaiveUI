// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue' // 确保路径正确

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout, // 使用 Layout 组件作为根组件
    children: [
    //   {
    //     path: '',
    //     name: 'HomeView',
    //     component: () => import('@/views/Home.vue'), // 动态导入，按需加载
    //   },
    //   {
    //     path: 'about',
    //     name: 'About',
    //     component: () => import('@/views/About.vue'), // 动态导入，按需加载
    //   },
    ],
  },
  // 其他路由...
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router