import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FormView from '@/views/FormView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addContact',
    name: 'form',
    component: FormView
  },
  {
    path: '/contact/:id',
    name: 'details',
    component: () => import('@/views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
