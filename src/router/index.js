import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'dashboard' }
      }]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/report',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'Dashboard', icon: 'chart', key: 'report' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'chart', affix: true, key: 'dashboard' }
      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    redirect: '/financial/income',
    name: 'Financial',
    meta: {
      title: '财务管理',
      icon: 'money',
      key: 'financial'
    },
    children: [
      {
        path: 'income',
        component: () => import('@/views/financial/income'),
        name: 'Income',
        meta: {
          title: '入账',
          key: 'income'
        }
      },
      {
        path: 'outlay',
        component: () => import('@/views/financial/outlay'),
        name: 'Outlay',
        meta: {
          title: '入账',
          key: 'outlay'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/users',
    name: 'Admin',
    meta: {
      title: '系统管理',
      icon: 'administrator',
      key: 'admin'
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/admin/users'),
        name: 'Users',
        meta: {
          title: 'Users',
          key: 'users'
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/admin/menu/index'),
        name: 'Menu',
        meta: {
          title: 'Menus',
          key: 'menu'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: 'Role',
        meta: {
          title: 'Roles',
          key: 'role'
        }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/dictionary',
    name: 'Settings',
    meta: {
      title: '系统设置',
      icon: 'setting',
      key: 'settings'
    },
    children: [
      {
        path: 'basic',
        component: () => import('@/views/settings/dictionary'),
        name: 'Dictionary',
        meta: {
          title: '字典',
          key: 'dictionary'
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
