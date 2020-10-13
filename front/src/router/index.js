import { createRouter, createWebHashHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'

const routes = [
  {
    path: '/',
    name: 'Feed',
    component: Feed
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
