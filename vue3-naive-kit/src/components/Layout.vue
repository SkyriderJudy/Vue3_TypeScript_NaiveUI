<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { NIcon, NLayout, NLayoutSider, NMenu, NSpace } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'
import Menu from "./menu/Menu.vue"

const collapsed = ref(false) // 初始状态为未折叠
</script>
<template>
  <div class="layout-man">
    <NSpace vertical>
      <NLayout has-sider>
        <NLayoutSider
        style="height: 100vh;"
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"  
          @expand="collapsed = false"  
        >
        <Menu />
         
        </NLayoutSider>
        <NLayout>
          <div class="content">
            <router-view />
          </div>
        </NLayout>
      </NLayout>
    </NSpace>
  </div>
</template>

<style lang="scss" scoped>
.layout-man {
  height: 100%; /* 使用视口高度 */
  width: 100%;
}

.content {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}
</style>