<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>TechStore</h1>
        </router-link>
        
        <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
          <router-link to="/" @click="closeMenu">Inicio</router-link>
          <router-link to="/products" @click="closeMenu">Productos</router-link>
          <router-link to="/about" @click="closeMenu">Nosotros</router-link>
          <router-link to="/contact" @click="closeMenu">Contacto</router-link>
        </nav>
        
        <div class="header-actions">
          <button @click="$emit('toggle-cart')" class="cart-btn">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5 6m0 0h9"/>
            </svg>
            <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
          </button>
          
          <button @click="toggleMenu" class="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  cartCount: number
}>()

defineEmits<{
  'toggle-cart': []
}>()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.logo h1 {
  color: #2563eb;
  font-size: 1.75rem;
  font-weight: 700;
  text-decoration: none;
}

.logo {
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  transition: color 0.2s;
  padding: 0.5rem 0;
  position: relative;
}

.nav a:hover,
.nav a.router-link-active {
  color: #2563eb;
}

.nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #2563eb;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-btn {
  position: relative;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.cart-btn:hover {
  color: #2563eb;
  background: #f1f5f9;
}

.cart-count {
  position: absolute;
  top: 0;
  right: 0;
  background: #dc2626;
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
}

.user-role {
  font-size: 0.75rem;
  color: #2563eb;
  font-weight: 600;
}

.logout-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.logout-btn:hover {
  color: #dc2626;
  background: #fef2f2;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.auth-link {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.auth-link:hover {
  color: #2563eb;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.25rem;
}

.menu-toggle span {
  width: 1.5rem;
  height: 2px;
  background: #64748b;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    border-bottom: 1px solid #e5e7eb;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    padding: 0 1rem;
  }

  .nav-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav a {
    padding: 1rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .user-info {
    display: none;
  }

  .auth-links {
    gap: 0.5rem;
  }

  .auth-links .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>