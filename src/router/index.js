import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home";
import Login from "@/views/Login";
import Dashboard from "@/components/Dashboard";
import Error404 from "@/components/Error404";
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        meta: {
          title: '仪表盘'
        }
      },
    ]
  },
  {
    path: '*',
    component: Error404
  }
]





const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  // to 将访问哪一个路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  //   next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const token = window.sessionStorage.getItem('Lljieeeeee-Token')
  if (!token) return next('/login')
  if (to.meta.title) {
    document.title = to.meta.title + ' - Lljieeeeee 个人博客管理系统'
  }
  next()
})

export default router
