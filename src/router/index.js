import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/pages/home'

Vue.use(Router)

const routerMap = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new Router({
  mode: 'history',
  routes: routerMap
})

export default router
