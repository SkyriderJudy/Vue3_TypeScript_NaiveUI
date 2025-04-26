// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue' // 确保路径正确

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '工作组件',
    children: [
      {
        path: '/',
        name: '收运检查单维护',
        component: () => import('@/components/syjcdwh/syjcdwh.vue'), // 动态导入，按需加载
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/components/Layout.vue'), // 动态导入，按需加载
      },
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