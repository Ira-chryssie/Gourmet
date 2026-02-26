import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PanierView from '../views/PanierView.vue'
import CommandeView from '../views/CommandeView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'
import HistoriqueView from '../views/HistoriqueView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/panier',
      name: 'panier',
      component: PanierView
    },
    {
      path: '/commande',
      name: 'commande',
      component: CommandeView
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationView
    },
    {
      path: '/historique',
      name: 'historique',
      component: HistoriqueView
    }
  ],
})

export default router