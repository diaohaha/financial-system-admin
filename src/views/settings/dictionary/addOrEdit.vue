<template>
  <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close">
    <el-form ref="form" :model="form" label-width="100px" size="mini">
      <el-form-item label="名称" prop="setting_title">
        <el-input v-model.trim="form.setting_title" />
      </el-form-item>
      <el-form-item label="标识" prop="setting_key">
        <el-input v-model.trim="form.setting_key" placeholder="长度4至8位，以字母开头，字母，数字，减号，下划线" />
      </el-form-item>
      <el-form-item label="内容" prop="setting_content">
        <el-input v-model.trim="form.setting_content" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="form.remark" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="reqLoading" size="medium " @click="onSubmit">立即提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { edit, add } from '@/api/settings'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reqLoading: false,
      form: {
        remark: ''
      }
    }
  },
  methods: {
    close(data) {
      this.$emit('close', data === 1)
    },
    onSubmit() {
      this.form.id
        ? add(this.form).then(() => {
          this.close(1)
        }) : edit(this.form).then(() => {
          this.close(1)
        })
    }
  }
}
</script>
