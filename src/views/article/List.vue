<template>
  <el-card class="article-list-card" shadow="hover">
    <el-table
        :data="articleList"
        stripe
        border
        style="width: 100%">
      <el-table-column
          prop="articleTitle"
          label="标题">
      </el-table-column>
      <el-table-column
          prop="articleStatus"
          label="状态"
          width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.articleStatus">草稿箱</span>
          <span v-else>已发布</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="categoryList"
          label="分类">
        <template slot-scope="scope">
          <el-tag :key="categoryId" v-for="categoryId in scope.row.categoryList">{{categoryMap[categoryId]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="tagList"
          label="标签">
        <template slot-scope="scope">
          <el-tag type="success" class="my-tag" :key="tagId" v-for="tagId in scope.row.tagList">{{tagMap[tagId]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="isTop"
          label="置顶">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.isTop"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="发布时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="$router.push('/edit/' + scope.row.articleId)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleRecycle(scope.row.articleId)">回收站</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="my-change-page"
        background
        @current-change="getArticlePage"
        layout="prev, pager, next"
        :page-size="size"
        :current-page="current"
        hide-on-single-page
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script>

import {getArticlePage, updateArticleStatus} from "@/api/article";
import {getTagMap} from "@/api/tag";
import {getCategoryMap} from "@/api/category";

export default {
  name: "List",
  data() {
    return {
      articleList: [],
      categoryMap: {},
      tagMap: {},
      current: 1,
      size: 10,
      total: 0,
      loaded: 0
    }
  },
  activated() {
    this.init()

  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getCategoryMap()
      this.getTagMap()
      this.getArticlePage()
    },
    handleRecycle(articleId) {
      updateArticleStatus(articleId, 2)
          .then(res => {
            this.getArticlePage(this.current)
          })
    },
    getArticlePage(current = 1) {
      this.current = current
      getArticlePage(this.current, this.size)
        .then(res => {
          this.articleList = res.data.data.list
          this.total = res.data.data.total
        })
    },
    getCategoryMap() {
      getCategoryMap()
        .then(res => {
          this.categoryMap = res.data.data.categoryMap
          this.loaded++
        })
    },
    getTagMap() {
      getTagMap()
        .then(res => {
          this.loaded++
          this.tagMap = res.data.data.tagMap
        })
    }
  }
}
</script>

<style lang="less" scoped>

.article-list-card {
  padding: 20px;
}
.my-tag {
  display: inline-block;
  margin: 5px 5px;
}

.my-change-page {
  text-align: center;
  margin: 30px auto 0;
}

</style>
