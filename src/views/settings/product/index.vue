<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" class="filter-item" @click="handleAdd()">添加</el-button>
    </div>
    <!-- 表格区域 -->
    <nice-table :table-header="tableHeader" :list="list" :toolbar-list="toolbarList" :list-loading="loading" @emitEvent="(args)=>this.$emitEvent(args)" />
    <add-or-edit v-if="dialogVisible" :dialog-visible="dialogVisible" :info="info" :types="types" @close="close" />
  </div>
</template>

<script>
import { list, del } from '@/api/products'
import { types } from '@/api/settings'
import AddOrEdit from './addOrEdit'
export default {
  name: 'Product',
  components: { AddOrEdit },
  data() {
    return {
      list: [],
      dialogVisible: false,
      info: null,
      loading: false,
      types: [],
      tableHeader: [
        { field: 'product_title', sortable: 'custom', title: '名称' },
        { field: 'assets_type', sortable: 'custom', title: '资产类型' },
        { field: 'product_type', sortable: 'custom', title: '商品类别' },
        { field: 'detail', title: '详情' },
        { field: 'update_time', title: '更新时间' },
        { field: 'toolbar', title: '操作' }
      ],
      toolbarList: [
        { title: '编辑', field: 'handleEdit', type: 'primary' },
        { title: '删除', field: 'handleDelete', type: 'danger' }
      ],
      total: 0
    }
  },
  created() {
    this.getTypes()
    this.search()
  },
  methods: {
    close(refresh) {
      this.dialogVisible = false
      refresh && this.search()
    },
    search() {
      this.loading = true
      list().then(res => {
        this.list = res
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getTypes() {
      types({ dic_type: 'assets' }).then(res => {
        this.types = res
      }).catch(() => {})
    },
    handleAdd() {
      this.info = null
      this.dialogVisible = true
    },
    handleEdit(data) {
      this.info = { ...data }
      this.dialogVisible = true
    },
    handleDelete(data) {
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        del({ id: data.id }).then(() => {
          this.search()
          this.loading = false
        }).catch(() => { this.loading = false })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
