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
          <div class="auth-buttons">
            <router-link to="/login" class="btn btn-outline">Iniciar Sesión</router-link>
            <router-link to="/register" class="btn btn-primary">Registrarse</router-link>
          </div>
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
  gap: 1.5rem;
}

.auth-buttons {
  display: flex;
  gap: 0.75rem;
  margin-right: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-outline {
  border: 1px solid #2563eb;
  color: #2563eb;
  background: transparent;
}

.btn-outline:hover {
  background-color: rgba(37, 99, 235, 0.05);
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border: 1px solid transparent;
}

.btn-primary:hover {
  background-color: #1d4ed8;
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
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .auth-buttons {
    flex-direction: column;
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .auth-buttons .btn {
    width: 100%;
    text-align: center;
  }
  
  .header-actions {
    gap: 0.5rem;
  }
  
  .auth-buttons {
    margin-right: 0;
  }
  
  .nav.nav-open {
    display: flex;
  }
  
  .auth-buttons {
    display: none;
  }
  
  .nav.nav-open + .header-actions .auth-buttons {
    display: flex;
  }
}
</style>