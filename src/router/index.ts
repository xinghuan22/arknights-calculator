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
      path: '/mizuki',
      name: 'mizuki',
      component: () => import('../views/MizukiCalView.vue')
    },
    {
      path: '/readme',
      name: 'readme',
      component: () => import('../views/ReadmeView.vue')
    },
    {
      path: '/sagou',
      name: 'sagou',
      component: () => import('../views/SagouCalView.vue')
    }
  ]
})

export default router
