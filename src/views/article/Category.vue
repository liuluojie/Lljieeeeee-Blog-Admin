<template>
  <el-row :gutter="20">
    <el-col :span="11"  :offset="1">
      <el-card v-loading="loading" class="tag-card">
        <el-table
            :data="categoryList"
            stripe
            border
            style="width: 100%">
          <el-table-column
              prop="categoryName"
              label="分类名">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            class="my-change-page"
            background
            @current-change="getCategoryPage"
            layout="prev, pager, next"
            :page-size="size"
            :current-page="current"
            hide-on-single-page
            :total="total">
        </el-pagination>
      </el-card>
    </el-col>
    <el-col :span="10" :offset="1">
      <el-card>
        <el-form ref="form" :model="category" position="top">
          <el-form-item label="分类名">
            <el-input v-model="category.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="分类描述">
            <el-input
                type="textarea"
                placeholder="请输入分类描述"
                v-model="category.description"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="分类页封面">
            <el-input v-model="category.categoryImage"></el-input>
            <img :src="category.categoryImage" style="width: 100%; margin-top: 10px" alt="">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveCategory">保存</el-button>
            <el-button @click="category = {}">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {getCategoryPage, addCategory, updateCategory, deleteCategory} from "@/api/category";

export default {
  name: "Category",
  data() {
    return {
      category: {
        categoryId: '',
        categoryName: '',
        categoryImage: '',
        description: ''
      },
      categoryList: [],
      current: 1,
      total: 0,
      size: 10,
      loading: false
    }
  },
  created() {
    this.getCategoryPage()
  },
  methods: {
    saveCategory() {
      if (this.category.categoryId) {
        this.handleUpdate()
      }else {
        this.handleAdd()
      }
      this.category = {}
      this.flash()
    },
    handleAdd() {
      addCategory(this.category)
        .then(res => {
          this.$message.success(res.data.message)
        })
    },
    handleUpdate() {
      updateCategory(this.category)
        .then(res =>  {
          this.$message.success(res.data.message)
        })
    },
    handleEdit(category) {
      this.category = category
    },
    handleDelete(category) {
      this.$confirm('此操作将永久删除【' + category.categoryName + '】分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(category.categoryId)
            .then(res => {
              this.$message.success(res.data.message)
              this.flash()
            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    flash() {
      let current = (this.current - 1) * this.size < (this.total - 1) ? this.current : this.current - 1
      this.getCategoryPage(current)
    },
    getCategoryPage(current = 1) {
      this.loading = true
      this.current = current
      getCategoryPage(this.current, this.size)
        .then(res => {
          this.categoryList = res.data.data.list
          this.total = res.data.data.total
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
