<template>
  <el-container class="home-container">
    <el-header class="header-container">
      <div class="header-left">
        <span><router-link to="/">个人博客管理系统</router-link></span>
        <div class="header-menu">
          <el-menu router default-active="dashboard" mode="horizontal">
            <el-menu-item index="/dashboard">
              <i class="fa fa-dashboard menu-icon"></i>
              仪表盘
            </el-menu-item>
            <el-submenu index="/article">
              <template slot="title">
                <i class="fa fa-list menu-icon"></i>
                文章
              </template>
              <el-menu-item index="/list">文章列表</el-menu-item>
              <el-menu-item index="/write">写文章</el-menu-item>
              <el-menu-item index="/category">分类</el-menu-item>
              <el-menu-item index="/tag">标签</el-menu-item>
            </el-submenu>
            <el-submenu index="comment">
              <template slot="title">
                <i class="fa fa-comments menu-icon"></i>
                评论
              </template>
              <el-menu-item index="4-1">评论列表</el-menu-item>
              <el-menu-item index="4-2">审核评论</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="fa fa-upload menu-icon"></i>
                附件
              </template>
              <el-menu-item index="5-1">图片</el-menu-item>
              <el-menu-item index="5-2">文件</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="fa fa-cog menu-icon"></i>
                系统
              </template>
              <el-menu-item index="6-1">博客设置</el-menu-item>
              <el-menu-item index="6-2">系统设置</el-menu-item>
            </el-submenu>
            <el-menu-item index="7">
              <i class="fa fa-user menu-icon"></i>
                用户
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="header-right">
        <el-dropdown>
          <div>
            <span>{{user.username}}</span>
            <img style="height: 40px;width: 40px;margin-left: 10px" :src="user.avatar" alt="">
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item>关 于</el-dropdown-item>
            <el-dropdown-item divided>
              <a @click="logout">退 出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </el-header>
    <el-main class="main-container">
      <router-view></router-view>
    </el-main>
    <el-footer class="footer-container">
      <p >2021 © Lljieeeeee</p>
    </el-footer>
  </el-container>
</template>

<script>

import {getUserInfoByToken} from "@/api/user";

export default {
  name: "Home",
  data() {
    return {
      user: {}
    }
  },
  created() {
    getUserInfoByToken()
      .then(res => {
        this.user = res.data.data.user
      }).catch(err => {
        this.logout()
    })
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("Lljieeeeee-Token")
      this.$router.push('/login')
    },
    handleSelect(a,b,c) {
      console.log(a)
      console.log(b)
      console.log(c)
      //this.$router.push('/write')
    }
  }
}
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
}

.header-container{
  padding: 0;
  height: 60px;
  .header-left {
    float: left;
    span {
      float: left;
      display: block;
      height: 60px;
      line-height: 60px;
      margin-left: 50px;
      font-size: 24px;
    }
    .header-menu {
      float: left;
      margin-left: 20px;
      .menu-icon {
        margin-right: 5px;
      }
    }
  }
  .header-right {
    float: right;
    height: 60px;
    line-height: 60px;
    margin-right: 50px;
  }
}

.main-container {
  padding: 20px 50px;
  background-color: #eee;
}

.footer-container {
  text-align: center;
  height: 50px!important;
  padding: 10px 0;
  margin: 0;
  border-top: 1px solid skyblue;
  p {
    height: 30px;
    line-height: 30px;
  }
}
</style>
