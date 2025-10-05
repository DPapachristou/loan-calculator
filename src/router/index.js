import { createRouter, createWebHistory } from 'vue-router'
import DemoPage from '@/views/DemoPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DemoPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
