<template>
  <div class="dic">
    <el-dialog :title="form.id ? '编辑': '添加'" :visible.sync="dialogVisible" :before-close="close">
      <el-form ref="form" :model="form" label-width="100px" size="mini" :rules="rules">
        <el-form-item label="名称" prop="product_title">
          <el-input v-model.trim="form.product_title" />
        </el-form-item>
        <el-form-item label="资产类型" prop="assets_type">
          <el-select ref="role" v-model="form.assets_type" placeholder="选择资产类型" clearable class="filter-item" @change="handleChange">
            <el-option v-for="(k,i) in types" :key="i" :label="k.dic_title" :value="k.dic_key" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品类型" prop="product_type">
          <el-select ref="role" v-model="form.product_type" placeholder="选择商品类型" clearable class="filter-item">
            <el-option v-for="(v, k,i) in product_type" :key="i" :label="v" :value="k" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="product_detaiil">
          <el-input
            v-model.trim="form.product_detail"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" :loading="reqLoading" size="medium " @click="onSubmit">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { edit, add } from '@/api/products'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default() {
        return null
      }
    },
    types: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      rules: {
        product_title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        product_detail: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        assets_type: [
          { required: true, message: '请选择资产类型', trigger: 'blur' }
        ],
        product_type: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ]
      },
      reqLoading: false,
      product_type: null,
      form: {
        product_detail: '',
        product_type: '',
        assets_type: '',
        product_title: ''
      }
    }
  },
  created() {
    if (this.info) {
      this.form = { ...this.info }
      this.handleChange(this.form.assets_type,)
      this.$nextTick(() => {
        this.form.product_type = this.info.prodduct_type
        console.log(this.info)
        console.log(this.form)
      })
    }
  },
  methods: {
    close(data) {
      this.$emit('close', data === 1)
    },
    handleChange(type) {
      const target = this.types.filter(e => e.dic_key === type)
      this.product_type = JSON.parse(target[0].dic_val)
      this.form.product_type = ''
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.id
            ? edit(this.form).then(() => {
              this.close(1)
            }) : add(this.form).then(() => {
              this.close(1)
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
