<template>
  <div class="keys">
    <el-table
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="key"
        label="key"
      >
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.key" />
        </template>
      </el-table-column>
      <el-table-column
        prop="val"
        label="名称"
      >
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.val" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" @click="add">添加</el-button>
  </div>
</template>
<script>
export default {
  props: {
    keys: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    if (this.keys) {
      const o = JSON.parse(this.keys)
      for (const i in o) {
        this.list.push({
          key: i,
          val: o[i]
        })
      }
    }
  },
  methods: {
    del(i) {
      this.list.splice(i, 1)
    },
    add() {
      this.list.push({
        key: '',
        val: ''
      })
    }
  }
}
</script>
