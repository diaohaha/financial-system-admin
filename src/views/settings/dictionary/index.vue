<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" class="filter-item" @click="handleAdd()">添加</el-button>
    </div>
    <!-- 表格区域 -->
    <nice-table :table-header="tableHeader" :list="list" :toolbar-list="toolbarList" :list-loading="loading" @emitEvent="(args)=>this.$emitEvent(args)" />
    <add-or-edit :dialog-visible="dialogVisible" @close="close" />
  </div>
</template>

<script>
import { list, del } from '@/api/settings'
import AddOrEdit from './addOrEdit'
export default {
  name: 'Basic',
  components: { AddOrEdit },
  data() {
    return {
      list: [],
      loading: false,
      dialogVisible: false,
      reqLoading: false,
      tableHeader: [
        { field: 'dic_title', sortable: 'custom', title: '标题' },
        { field: 'dic_key', sortable: 'custom', title: 'KEY' },
        { field: 'dic_val', sortable: 'custom', title: '内容' },
        { field: 'remark', title: '备注' },
        { field: 'toolbar', title: '操作' }
      ],
      toolbarList: [{ title: '编辑', field: 'handleEdit', type: 'primary' }],
      total: 0,
      title: '',
      alterVisible: false,
      form: { setting_title: '', setting_key: '', setting_content: '', remark: '' }
    }
  },
  created() {
    this.search()
  },
  methods: {
    close(refresh) {
      console.log(refresh)
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
    handleAdd() {
      this.dialogVisible = true
      this.title = '添加'
      this.form = this.$options.data().form
    },
    handleEdit(data) {
      this.title = '编辑'
      this.dialogVisible = true
      this.form = { ...data }
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
