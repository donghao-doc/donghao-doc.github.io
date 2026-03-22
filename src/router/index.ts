import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home/index.vue'
import NotFound from '../views/404/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
