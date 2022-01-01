<template>
  <div>
    <el-card class="operation-card">
      <div class="article-title-input">
        <el-input v-model="article.articleTitle" placeholder="请输入文章标题"></el-input>
      </div>
      <div class="operation">
        <el-button @click="saveDraft">保存草稿</el-button>
        <el-button type="primary">预览</el-button>
        <el-button @click="showPublishDialog" type="success">发布</el-button>
      </div>
    </el-card>
    <mavon-editor class="article-editor" previewBackground="#ffe" style="z-index: 1" :ishljs="true" ref="md" v-model="article.articleContent"/>

    <el-dialog :close-on-click-modal="false" width="600px" title="发布文章" :visible.sync="isShowPublishDialog">
      <el-form label-position="top" :model="article">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题" v-model="article.articleTitle"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-checkbox-group v-model="checkedCategoryList">
            <el-checkbox v-for="category in categoryList" :key="category.categoryId" :label="category.categoryId">{{category.categoryName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
              v-model="selectTagList"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签">
            <el-option
                v-for="tag in tagList"
                :key="tag.tagId"
                :label="tag.tagName"
                :value="tag.tagId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input
              type="textarea"
              placeholder="请输入文章简介"
              v-model="article.articleSummary"
              maxlength="100"
              show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="文章封面图">
          <el-upload
              class="article-cover-image"
              action="http://localhost:16666/blog/api/v1/admin/upload/image"
              :show-file-list="false"
              name="multipartFile"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="article.articleCoverImage" :src="article.articleCoverImage">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input style="margin-top: 10px" placeholder="请输入图片外链" v-model="article.articleCoverImage"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowPublishDialog = false">取 消</el-button>
        <el-button type="primary" @click="publish">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAllCategory} from "@/api/category";
import {getAllTag} from "@/api/tag";
import {getArticleById, addArticle, updateArticle} from "@/api/article";

export default {
  name: "Edit",
  data() {
    return {
      article: {
        articleId: '',
        articleTitle: '',
        articleCoverImage: '',
        articleContent: '',
        articleHtml: '',
        articleSummary: '',
        articleStatus: 0,
        isTop: 0,
        publicTime: ''
      },
      categoryList: [],
      tagList: [],
      selectTagList: [],
      checkedCategoryList: [],
      isShowPublishDialog: false
    }
  },
  created() {
    this.getArticleById(this.$route.params.id)
  },
  methods: {
    getArticleById(id) {
      getArticleById(id)
        .then(res => {
          this.article = res.data.data.articleInfo.article
          this.checkedCategoryList = res.data.data.articleInfo.articleCategoryList
          this.selectTagList = res.data.data.articleInfo.articleTagList
        })
    },
    handleAvatarSuccess(res, file) {
      this.article.articleCoverImage = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    },
    showPublishDialog() {
      this.isShowPublishDialog = true
      console.log(this.isShowPublishDialog)
      this.getAllCategory()
      this.getAllTag()
    },
    getAllCategory() {
      getAllCategory()
          .then(res => {
            this.categoryList = res.data.data.list
          })
    },
    getAllTag() {
      getAllTag()
          .then(res => {
            this.tagList = res.data.data.list
          })
    },
    publish() {
      if (this.article.articleTitle == null || this.article.articleTitle == '') {
        this.$message.error("文章标题不能为空")
        return
      }
      this.article.articleStatus = 0
      updateArticle(this.article, this.checkedCategoryList, this.selectTagList)
          .then(res => {
            this.$message.success(res.data.message)
          })
      this.$router.push('/list')
    },
    saveDraft() {
      if (this.article.articleTitle == null || this.article.articleTitle == '') {
        this.article.articleTitle = this.getDate()
      }
      this.article.articleStatus = 1
      updateArticle(this.article)
          .then(res => {
            this.$message.success(res.data.message);
          })
    },
    getDate(datetime) {
      let date
      if (datetime) {
        date = datetime
      }else {
        date = new Date()
      }
      let year=date.getFullYear(); //获取当前年份
      let month=date.getMonth()+1; //获取当前月份
      month = month >= 10 ? month : '0' + month
      let day=date.getDate(); //获取当前日
      day = day >= 10 ? day : '0' + day
      let hour=date.getHours(); //获取小时
      hour = hour >= 10 ? hour : '0' + hour
      let minutes=date.getMinutes(); //获取分钟
      minutes = minutes >= 10 ? minutes : '0' + minutes
      let second=date.getSeconds(); //获取秒
      second = second >= 10 ? second : '0' + second
      return year+'-'+month+'-'+day + ' '+hour+':'+minutes+':'+second;
    },
  }
}
</script>

<style lang="less" scoped>
.operation-card{
  padding-bottom: 20px;
  border-radius: 10px;
  .article-title-input {
    width: 500px!important;
    float: left;
  }

  .operation {
    float: right;
  }
}

.article-editor {
  margin-top: 50px;
  height: 666px;
  border-radius: 10px!important;
}

.article-cover-image {
  width: 100%;
  text-align: center;
  height: 300px;
  line-height: 300px;
  img {
    height: 300px;
  }
  i {
    font-size: 100px;
  }
}
</style>
