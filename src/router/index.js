import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue'),
    },
    {
      path: '/posts',
      name: 'postList',
      component: () => import('../views/PostListView.vue'),
    },
    {
      path: '/posts/form',
      name: 'postForm',
      component: () => import('../views/PostFormView.vue'),
    },
    {
      path: '/posts/:id',
      name: 'postDetail',
      component: () => import('../views/PostDetailView.vue'),
    },
    {
      path: '/mypage/:userId',
      name: 'mypage',
      component: () => import('../views/MypageView.vue'),
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('../views/PasswordView.vue'),
    },
    {
      path: '/',
      redirect: '/login',
    },
  ],
})

export default router
