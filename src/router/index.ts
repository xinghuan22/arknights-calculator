import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sami-cal',
      component: () => import('../views/SamiCalView.vue')
    }
  ]
})

export default router
