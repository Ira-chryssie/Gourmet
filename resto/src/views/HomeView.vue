<template>
  <div>

    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🍽️</span>
          <span>Le Petit Gourmet</span>
        </div>
        <router-link to="/panier" class="cart-btn">
          🛒 <span>{{ nombreArticles }}</span>
        </router-link>
      </div>
    </header>

    <!-- Recherche -->
    <div class="search-container">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-input" placeholder="Rechercher un plat..." v-model="recherche">
      </div>
    </div>

    <!-- Catégories -->
    <div class="categories">
      <button class="category-btn" :class="{ active: categorieActive === 'Tous' }" @click="filtrer('Tous')">Tous</button>
      <button class="category-btn" :class="{ active: categorieActive === 'Entrée' }" @click="filtrer('Entrée')">Entrées</button>
      <button class="category-btn" :class="{ active: categorieActive === 'Plat' }" @click="filtrer('Plat')">Plats</button>
      <button class="category-btn" :class="{ active: categorieActive === 'Dessert' }" @click="filtrer('Dessert')">Desserts</button>
      <button class="category-btn" :class="{ active: categorieActive === 'Boisson' }" @click="filtrer('Boisson')">Boissons</button>
    </div>

    <!-- Liste des plats -->
    <main class="menu-container">
      <div class="plat-card" v-for="plat in platsFiltres" :key="plat.nom">
        <div class="plat-image">{{ plat.emoji }}</div>
        <div class="plat-info">
          <div class="plat-header">
            <h3 class="plat-nom">{{ plat.nom }}</h3>
            <span class="plat-prix">{{ plat.prix }}€</span>
          </div>
          <p class="plat-description">{{ plat.description }}</p>
          <div class="plat-footer">
            <span class="plat-category">{{ plat.categorie }}</span>
            <button class="add-btn" @click="ajouterAuPanier(plat)">+</button>
          </div>
        </div>
      </div>

      <!-- Aucun résultat -->
      <div v-if="platsFiltres.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🔍</div>
        <p class="empty-cart-text">Aucun plat trouvé</p>
      </div>

    </main>

    <!-- Navigation -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>Accueil</span>
      </router-link>
      <router-link to="/historique" class="nav-item">
        <span class="nav-icon">📋</span>
        <span>Commandes</span>
      </router-link>
      <router-link to="/panier" class="nav-item">
        <span class="nav-icon">🛒</span>
        <span>Panier</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'HomeView',
  data() {
    return {
      categorieActive: 'Tous',
      recherche: '',
      plats: [
        { nom: 'Burger Classic', prix: 12.90, emoji: '🍔', description: 'Pain buns, steak haché, fromage, salade, tomate, oignons', categorie: 'Plat' },
        { nom: 'Pasta Carbonara', prix: 14.50, emoji: '🍝', description: 'Pâtes fraîches, œufs, lardons, parmesan, crème', categorie: 'Plat' },
        { nom: 'Salade César', prix: 11.00, emoji: '🥗', description: 'Laitue romaine, poulet grillé, croûtons, parmesan, sauce césar', categorie: 'Entrée' },
        { nom: 'Pizza Margherita', prix: 13.50, emoji: '🍕', description: 'Tomate, mozzarella fraîche, basilic, huile d\'olive', categorie: 'Plat' },
        { nom: 'Tiramisu', prix: 6.90, emoji: '🍰', description: 'Mascarpone, café, biscuits, cacao, œufs', categorie: 'Dessert' },
        { nom: 'Coca-Cola', prix: 2.50, emoji: '🥤', description: '33cl - Canette', categorie: 'Boisson' },
        { nom: 'Frites Maison', prix: 4.50, emoji: '🍟', description: 'Pommes de terre fraîches, sel, herbes', categorie: 'Accompagnement' },
        { nom: 'Cheesecake', prix: 6.50, emoji: '🧁', description: 'Fromage frais, spéculos, fruits rouges', categorie: 'Dessert' },
      ]
    }
  },
  computed: {
    nombreArticles() {
      return store.nombreArticles
    },
    platsFiltres() {
      let resultat = this.plats
      if (this.categorieActive !== 'Tous') {
        resultat = resultat.filter(p => p.categorie === this.categorieActive)
      }
      if (this.recherche) {
        resultat = resultat.filter(p =>
          p.nom.toLowerCase().includes(this.recherche.toLowerCase())
        )
      }
      return resultat
    }
  },
  methods: {
    ajouterAuPanier(plat) {
      store.ajouterPlat(plat)
    },
    filtrer(categorie) {
      this.categorieActive = categorie
    }
  }
}
</script>