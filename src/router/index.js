import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import MainLayout from '@/views/layouts/MainLayout'
import UserLayout from '@/views/layouts/userLayout'

import Login from '@/views/pages/auth/login'
import Home from '@/views/pages/home'
import Profile from '@/views/pages/user/profile'

Vue.use(Router)

const routerMap = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      }, {
        path: '/user',
        component: UserLayout,
        redirect: '/user/profile',
        children: [
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
  }, {
    path: '/login',
    name: 'login',
    component: Login
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
    next()
  }
})

export default router
