import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layout/index'
import EmptyLayout from '../layout/empty'
import store from '../store'
// import NotFound from '../components/NotFound'
Vue.use(VueRouter)

const routes = [
  // {
  //   name: 'Dashboard',
  //   component: MainLayout,
  //   icon: 'mdi-view-dashboard',
  //   path: '/dashboard',
  //   open: true,
  //   beforeEnter: (to, from, next) => {
  //     if (!store.getters['auth/authenticated']) {
  //       return next({
  //         name: 'Login',
  //       })
  //     }
  //     next()
  //   },
  //   children: [
  //     {
  //       name: 'Home',
  //       component: () => import('../views/Dashboard/Dashboard'),
  //       path: '',
  //     },
  //   ],
  // },
  {
    name: 'Helper',
    component: MainLayout,
    icon: 'mdi-account-group',
    subtitle: 'Components',
    path: '/helper',
    open: false,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: 'Help',
        component: () => import('../views/Helper/Helper'),
        path: '',
      },
    ],
  },
  {
    name: 'Create Helper',
    component: MainLayout,
    subtitle: 'Components',
    path: '/helper/create-helper',
    open: false,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: 'Registration Helper',
        component: () => import('../views/Helper/RegistrationHelper'),
        path: '/helper/registration-helper',
      },
      {
        name: 'Update Helper',
        component: () => import('../views/Helper/UpdateHelper'),
        path: '/helper/update-helper',
      },
    ],
  },
  {
    name: 'Auth',
    component: EmptyLayout,
    icon: 'mdi-clipboard-account-outline',
    subtitle: 'Pages',
    path: '/',
    open: false,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'Help',
        })
      }
      next()
    },
    children: [
      {
        name: 'Login',
        component: () => import('../views/Auth/Login'),
        path: '',
      },
      {
        name: 'Logout',
        component: () => import('../views/Auth/Login'),
        path: 'logout',
      },
    ],
  },
  {
    name: 'Packing',
    component: MainLayout,
    icon: 'mdi-package-variant-closed',
    path: '/packing',
    open: false,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: '',
        component: () => import('../views/Packing/Packing'),
        path: '',
      },
    ],
  },
  {
    name: 'Picking',
    component: MainLayout,
    icon: 'mdi-import',
    path: '/picking',
    open: false,
    beforeEnter: (to, from, next) => {
      if (!store.getters[('auth/authenticated', 'auth/user')]) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: '',
        component: () => import('../views/Picking/Picking'),
        path: '',
        meta: { hideNavigation: true },
      },
    ],
  },
  {
    name: 'Report',
    component: MainLayout,
    icon: 'mdi-import',
    path: '/report',
    open: true,
    beforeEnter: (to, from, next) => {
      if (!store.getters[('auth/authenticated', 'auth/user')]) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: 'Report Packing',
        component: () => import('../views/Report/Packing'),
        path: '/report/packing',
        meta: { hideNavigation: true },
      },
      {
        name: 'Report Picking',
        component: () => import('../views/Report/Picking'),
        path: '/report/picking',
        meta: { hideNavigation: true },
      },
      {
        name: 'Picking Item',
        component: () => import('../views/Report/PickingItem'),
        path: '/report/picking-item',
        meta: { hideNavigation: true },
      },
    ],
  },
  // {
  //   path: '*',
  //   component: NotFound,
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
