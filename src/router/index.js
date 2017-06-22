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
        component: Home,
      },
      {
        path: '/user',
        component: UserLayout,
        redirect: '/user/profile',
        meta: {
          requiresAuth: true
        },
        children: [
          { path: 'profile', name: 'profile', component: Profile },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new Router({
  mode: 'history',
  routes: routerMap
})

export default router
