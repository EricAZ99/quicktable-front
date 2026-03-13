import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LandingPage from '../views/LandingPage.vue'
import LoginView from '../views/Auth/LoginView.vue'
import Dashboard from '../views/Admin/Dashboard.vue'
import Menus from '../views/Admin/Menus.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing-page', component: LandingPage },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/admin-home', name: 'Tableau de bord', component: Dashboard },
    { path: '/admin-menu', name: 'Menu', component: Menus },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/login', name: 'login', component: LoginView },
  ],
})

export default router
