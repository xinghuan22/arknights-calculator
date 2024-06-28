import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mizuki-cal',
      component: () => import('../views/MizukiCalView.vue')
    }
  ]
})

export default router
