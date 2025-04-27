/**
* 在父组件创建ref对象，通过ref访问子组件实例，
* 子组件内部defineExpose出 onShowModalCallBack，控制modal的开启
*
*/
<script lang="ts" setup>
import { NButton, NModal, NSpace } from 'naive-ui';
import { Type } from 'naive-ui/es/button/src/interface';
import { ref } from 'vue';

const {
        modalTitleProps = '模态框',
        modelBtnProps = 'default'
     } = defineProps<{
    modalTitleProps?:string;
    modelBtnProps?: Type
}>()

const emits = defineEmits<{
    (e : 'change'): void
    (e : 'update'): void
}>()


const showModal = ref<boolean>(false)
const onShowModalCallBack = () => {
    showModal.value = true
}

const onLeaveModal = () => {
    
}

const onsubmit = () => {
    emits("update")
}

defineExpose({
    onShowModalCallBack
})
</script>

<template>
    <NModal
        :title="modalTitleProps"
        v-model:show="showModal"
        :after-leave="onLeaveModal"
    >
        <slot></slot>

        <template #footer>
            <NSpace>
                <NButton>取消</NButton>
                <NButton :type="modelBtnProps" @click="onsubmit">确定</NButton>
            </NSpace>
        </template>
    </NModal>

</template>

<style lang="scss" scoped>

</style>