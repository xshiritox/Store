<template>
  <div id="app">
    <Header 
      @toggle-cart="toggleCart" 
      :cart-count="cartItemsCount"
      :user="user"
      :is-admin="isAdmin"
      @logout="handleLogout"
    />
    
    <main>
      <router-view @add-to-cart="addToCart" />
    </main>
    
    <Cart 
      :is-open="isCartOpen" 
      :items="cartItems" 
      @close="toggleCart"
      @update-quantity="updateCartItemQuantity"
      @remove-item="removeFromCart"
      @checkout="goToCheckout"
    />
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Cart from './components/Cart.vue'
import Footer from './components/Footer.vue'
import { useAuth } from './stores/auth'
import type { Product, CartItem } from './types'

const router = useRouter()
const { user, profile, isAdmin, signOut, initialize } = useAuth()

const isCartOpen = ref(false)
const cartItems = ref<CartItem[]>([])

const cartItemsCount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const addToCart = (product: Product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    })
  }
}

const updateCartItemQuantity = (id: number, quantity: number) => {
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    item.quantity = quantity
  }
}

const removeFromCart = (id: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

const goToCheckout = () => {
  isCartOpen.value = false
  router.push('/checkout')
}

const handleLogout = async () => {
  await signOut()
  router.push('/')
}

// Provide cart data to child components
provide('cartItems', cartItems)
provide('addToCart', addToCart)

onMounted(() => {
  initialize()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1f2937;
  background-color: #ffffff;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background-color: #f1f5f9;
}

.grid {
  display: grid;
  gap: 2rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>