import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login/index.vue'
import home from '../view/home/index.vue'
import welcome from '../view/welcome/index.vue'
import group from '../view/group/index.vue'
import project from '../view/project/index.vue'
import projectView from '../view/projectView/index.vue'
import task from '../view/task/index.vue'
import taskView from '../view/taskView/index.vue'
import user from '../view/user/index.vue'
import userView from '../view/userView/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: welcome
      },
      {
        path: '/groups',
        component: group
      },
      {
        path: '/projects',
        component: project
      },
      {
        path: '/projectView',
        component: projectView
      },
      {
        path: '/tasks',
        component: task
      },
      {
        path: '/taskView',
        component: taskView
      },
      {
        path: '/users',
        component: user
      },
      {
        path: '/userView',
        component: userView
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next() 放行 next("/login") 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})
export default router
