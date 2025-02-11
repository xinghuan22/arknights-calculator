import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sami_naotan',
      name: 'sami_naotan',
      component: () => import('../views/SamiCalView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/mizuki',
      name: 'mizuki',
      component: () => import('../views/MizukiCalView.vue')
    }
  ]
})

export default router
