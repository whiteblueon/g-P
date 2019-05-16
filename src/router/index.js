import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
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
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
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
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'table',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'data-table',
        component: () => import('@/views/table/data-table'),
        name: 'dataTable',
        meta: { title: '数据管理' }
      }
      // {
      //   path: 'user-table',
      //   component: () => import('@/views/table/user-table'),
      //   name: 'userTable',
      //   meta: { title: 'userTable', roles: ['admin'] }
      // }
    ]
  },

  {
    hidden: true,
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: '数据目录',
      icon: 'nested'
    },
    children: [
      {
        path: 'M1',
        component: () => import('@/views/detail/DetailsMessage'), // Parent router-view
        name: 'M1',
        meta: { title: '畜牧业数据' },
        redirect: '/nested/M1/M1',
        children: [
          {
            path: 'M1-1',
            name: 'cattle',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '出栏情况-牛' }
          },
          {
            path: 'M1-2',
            name: 'sheep',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '出栏情况-羊' }
          },
          {
            path: 'M1-3',
            name: 'situation',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '半牧区县基本情况' }
          }
        ]
      },
      {
        path: 'M2',
        component: () => import('@/views/detail/DetailsMessage'), // Parent router-view
        name: 'M2',
        meta: { title: '水果行业' },
        redirect: '/nested/menu2/menu2-1',
        children: [
          {
            path: 'M2-1',
            name: 'tea',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '茶' }
          },
          {
            path: 'M2-2',
            name: 'grape',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '葡萄' }
          },
          {
            path: 'menu1-3',
            name: 'orange',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '脐橙' }
          }
        ]
      },
      {
        path: 'M3',
        component: () => import('@/views/detail/DetailsMessage'), // Parent router-view
        name: 'M3',
        meta: { title: '棉花纺织行业' },
        redirect: '/nested/menu3/menu3-1',
        children: [
          {
            path: 'M3-1',
            name: 'rMaterial',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '原材料' }
          },
          {
            path: 'M3-2',
            name: 'cPrice',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '价格' }
          }
        ]
      },
      {
        path: 'M4',
        component: () => import('@/views/detail/DetailsMessage'), // Parent router-view
        name: 'M4',
        meta: { title: '饲料养殖' },
        redirect: '/nested/menu4/menu4-1',
        children: [
          {
            path: 'M4-1',
            name: 'chicken',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '鸡' }
          },
          {
            path: 'M4-2',
            name: 'oats',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '燕麦' }
          },
          {
            path: 'M4-3',
            name: 'cray',
            // component: () => import('@/views/detail/DetailsMessage'),
            meta: { title: '小龙虾' }
          }
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
