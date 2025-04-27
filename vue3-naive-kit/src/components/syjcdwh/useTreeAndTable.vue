<script setup lang="ts">
import { ref, h } from 'vue';
import { itIT, NButton, NDataTable, NSpace, NTag, NTree } from 'naive-ui';
import type { DataTableColumns, TreeOption } from 'naive-ui'
import useModalHook from '../modal/useModalHook.vue';

const useModalHookComponents = ref<typeof useModalHook>()

const openModal = () => {

}

// 树形数据
const treeData = ref<TreeOption[]>([
  {
    label: '检查货物外包装',
    key: 'package-check',
    isParent: true,
    children: [
      { label: '检查货物外包装1', key: 'package-check-1' },
      { label: '检查货物外包装2', key: 'package-check-2' }
    ]
  },
  {
    label: '检查运输标记',
    key: 'mark-check',
    isParent: true,
    children: [
      { label: '检查运输标记1（包括标签、标志）', key: 'mark-check-1' },
      { label: '检查运输标记2（包括标签、标志）', key: 'mark-check-2' }
    ]
  },
  {
    label: '其他检查项',
    key: 'other-checks',
    isParent: true,
    children: [
      { label: '检查件数', key: 'quantity-check' },
      { label: '重量', key: 'weight-check' },
      { label: '其他1', key: 'other-1' },
      { label: '其他2', key: 'other-2' },
      { label: '其他3', key: 'other-3' }
    ]
  },
  {
    label: '特殊检查项',
    key: 'special-checks',
    isParent: true,
    children: [
      { label: '开箱验视检查记录单', key: 'unpack-record' },
      { label: '开箱验视', key: 'unpack-check' },
      { label: '隐含危险品排查记录单', key: 'hazard-check' }
    ]
  }
])

// const columns: DataTableColumns<UserData> = [
//   {
//     title: 'ID',
//     key: 'id',
//     sorter: true
//   },
//   {
//     title: '姓名',
//     key: 'name',
//     render: (row) => h('span', { style: { color: 'var(--primary-color)' } }, row.name)
//   },
//   {
//     title: '年龄',
//     key: 'age',
//     sorter: (row1, row2) => row1.age - row2.age
//   },
//   {
//     title: '性别',
//     key: 'gender',
//     filterOptions: [
//       { label: '男', value: 'male' },
//       { label: '女', value: 'female' }
//     ],
//     filter: (value, row) => row.gender === value
//   },
//   {
//     title: '状态',
//     key: 'status',
//     render: (row) => h(
//       NTag,
//       { type: row.status === 'active' ? 'success' : 'error' },
//       { default: () => row.status === 'active' ? '活跃' : '禁用' }
//     )
//   },
//   {
//     title: '操作',
//     key: 'actions',
//     render: (row) => h(
//       NButton,
//       {
//         size: 'small',
//         onClick: () => handleAction(row)
//       },
//       { default: () => '编辑' }
//     )
//   }
// ]


// 节点属性，用于处理整行悬停
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onMouseenter: () => (option.showActions = true),
    onMouseleave: () => (option.showActions = false)
  }
}

// 渲染后缀
const renderSuffix = ({ option }: { option: TreeOption }) => {
  const createButton = (type: 'primary' | 'error', action: string, icon: string) => {
    return h(NButton, {
      circle: true,
      type,
      size: 'small',
      style: {
        opacity: option.showActions ? 1 : 0,
        visibility: option.showActions ? 'visible' : 'hidden',
        transition: 'opacity 0.2s ease',
        minWidth: '28px'
      },
      title: `${action}: ${option.label}`,
      onClick: (e: Event) => {
        e.stopPropagation()
      }
    }, () => icon)
  }

  return h(NSpace, {
    align: 'center',
    size: 'small',
  }, option.isParent
    ? [
        createButton('primary', '新增子类别到', '+'),
        createButton('primary', '编辑', '✎'),
        createButton('error', '删除', '×')
      ]
    : [
        createButton('primary', '编辑', '✎'),
        createButton('error', '删除', '×')
      ])
}
</script>

<template>
    <div class="container">
        <div class="left">
            <div class="header">
               <div style="display: flex;">
                <div style="width: 2px; height: 20px; background: #2080f0; margin-right: 8px;">
                </div>
                <span>文件类别</span>
               </div>


                <NButton  type="primary" class="add-button">新增</NButton>
            </div>

            <NTree
                block-line
                :data="treeData"
                :render-suffix="renderSuffix"
                :selectable="true"
                :node-props="nodeProps"
                :default-expand-all="true"
            />
            
        </div>
        <div class="right">
          <div>
            <NButton type="primary" @click="openModal">打开模态框</NButton>
          </div>
            <!-- <NDataTable 
                :columns="columns"
                :data="data"
                :pagination="pagination"
                :loading="loading"
                @update:sorter="handleSorterChange"
                @update:filters="handleFiltersChange"
            /> -->
        </div>
        <useModalHook ref="useModalHookComponents"></useModalHook>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    width: 100%;
    height: 100%;
    .left {
        height: 100%;
        width: 30%;
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 16px;
        overflow: hidden;
        border-right: 1px solid #000;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20px;
            background-color: white;
            position: relative;
            z-index: 1;
            span {
                font-size: 14px;
                font-weight: 700;
            }
        }
    }
    .right {
        height: 100%;
        flex: 1;
    }
}
.node-actions {
  display: flex;
  gap: 6px;
  margin-left: 12px;
}


/* 悬停效果优化 */
:deep(.n-tree-node-content:hover .node-actions .n-button) {
  opacity: 1 !important;
  visibility: visible !important;
}
</style>