<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">个人博客管理系统</h1>
      <el-form ref="userRef" :model="user" :rules="userRules" class="login-form" label-width="0">
        <el-form-item prop="email">
          <el-input v-model.trim="user.email" prefix-icon="fa fa-envelope-o fa-fw"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model.trim="user.password" prefix-icon="fa fa-key fa-fw"></el-input>
        </el-form-item>
        <el-form-item class="logon-button">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {login} from "@/api/login"

export default {
  name: "Login",
  data() {
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'));
        }else {
          callback()
        }
      }, 1000);
    }
    return {
      user: {
        email: '',
        password: ''
      },
      userRules: {
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度为 6 - 20', trigger: 'blur'}
        ]
      }
    }
  },
  create() {

  },
  methods: {
    login() {
      this.$refs.userRef.validate(valid => {
        if (!valid) {
          return
        }
        login(this.user)
            .then(res => {
              if (res.data.code == 200) {
                console.log()
                this.$message.success(res.data.message)
                window.sessionStorage.setItem("Lljieeeeee-Token", res.data.data.token.tokenValue)
                this.$router.push('/')
              }else {
                this.$message.error(res.data.message)
              }
            })
      })
    }
  }

}
</script>

<style lang="less" scoped>

.login-container {
  background-image: url("https://cdn.u1.huluxia.com/g4/M01/EA/8D/rBAAdmGCmRiAZnlzAAV5GavFWJY978.jpg");
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  opacity: .7;
}

.login-title {
  text-align: center;
  color: royalblue;
}

.login-form {
  position: absolute;
  width: 410px;
  bottom: 0;
}

.logon-button {
  text-align: right;
}

</style>
