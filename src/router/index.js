import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import UserLayout from '@/views/layouts/userLayout'

import Login from '@/views/pages/auth/login'
import Home from '@/views/pages/home'
import Profile from '@/views/pages/user/profile'

Vue.use(Router)

const routerMap = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      // 用户中心
      {
        path: '/user',
        component: UserLayout,
        redirect: '/user/profile',
        children: [// 用户中心-个人页面
          {
            path: 'profile',
            name: 'profile',
            component: Profile,
            meta: {
              requiresAuth: true
            }
          }
        ]
      }
    ]
  },
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  }
]

const router = new Router({mode: 'history', routes: routerMap})

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录
  if (to.meta.requiresAuth) {
    if (store.state.user.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
        }
      })
    }
  } else {
    if (!to.meta.requiresAuth && to.path === '/login') {
      next({path: '/'})
    } else {
      next()
    }
  }
})

export default router
