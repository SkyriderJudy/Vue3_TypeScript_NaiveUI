<script setup lang="ts">
import { MenuOption } from 'naive-ui'
import {ref,computed, h} from 'vue'
import { RouteRecordNormalized, RouteRecordRaw, RouterLink, useRoute, useRouter } from 'vue-router'


const route = useRoute()
const collapsed = ref(false) // 初始状态为未折叠

const router = useRouter().getRoutes().filter((it)=> it.children.length !== 0)

// 定义转换函数
const transformRoutesToMenu = (routes: RouteRecordRaw[]): MenuOption[] => {
  return routes.map((route:RouteRecordRaw) => {
    const menuItem: MenuOption = {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: route.path,
            }
          },
          { default: () => route.meta?.title || route.name || route.path }
        ),
      key: route.path,
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      menuItem.children = transformRoutesToMenu(route.children)
    }
    return menuItem
  })
}

const handleMenuSelect = (key: string | any ) => {
  if(key === '') return
  router.push(key)
}

</script>
<template>
     <div class="main-content">
        <NMenu
            v-model:value="route.path"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="transformRoutesToMenu(router)"
            @update:value="handleMenuSelect"
          />
     </div>
</template>
<style lang="scss" scoped>

</style>