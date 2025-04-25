<script lang="ts" setup name="layout">
import { NLayout, NLayoutHeader, NLayoutSider } from 'naive-ui';


</script>

<template>
   <div class="layout">
    <div class="layout-left">1</div>
    <div class="layout-right">2</div>
   </div>
</template>
<style lang="scss" scoped>
.layout {
    display: flex;
    width: 100%;
    max-height: 100%;
    .left {
        width: 30%;
        max-width: 100%;
        border: 2px solid red;
    }
    .right {
        width: 70%;
        max-width: 100%;
        border: 2px solid red;
    }
}
</style>