<template>
  <div>
    Home
    <router-view></router-view>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      window.sessionStorage.removeItem("Lljieeeeee-Token")
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
