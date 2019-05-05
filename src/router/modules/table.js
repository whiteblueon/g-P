/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'data-table',
      component: () => import('@/views/table/data-table'),
      name: 'dataTable',
      meta: { title: 'dataTable' }
    },
    {
      path: 'user-table',
      component: () => import('@/views/table/user-table'),
      name: 'userTable',
      meta: { title: 'userTable' }
    }
  ]
}
export default tableRouter
