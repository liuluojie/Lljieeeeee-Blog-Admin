import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from "@/views/Dashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Dashboard,
    meta: {
      title: '首页'
    }
  },
]





const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title + ' - Lljieeeeee 个人博客'
  }
  next()
})

export default router
