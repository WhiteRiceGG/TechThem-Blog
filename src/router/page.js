export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/src/views/HomeView.vue'),
    meta: { isMenu: true, title: '首页' },
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('@/src/views/ArchiveView.vue'),
    meta: { isMenu: true, title: '归档' },
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/src/views/CategoriesView.vue'),
    meta: { isMenu: true, title: '分类' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/src/views/AboutView.vue'),
    meta: { isMenu: true, title: '关于' },
  },
  {
    path: '/posts/:id',
    name: 'post-detail',
    component: () => import('@/src/views/PostDetail.vue'),
  },
];