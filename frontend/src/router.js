import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import AboutView from './pages/AboutView.vue'
import Class from './pages/Class.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/class/:id', name: 'class', component: Class },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;