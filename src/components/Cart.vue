<template>
  <div class="cart-overlay" :class="{ 'cart-open': isOpen }" @click="$emit('close')">
    <div class="cart" @click.stop>
      <div class="cart-header">
        <h2>Carrito de Compras</h2>
        <button @click="$emit('close')" class="close-btn">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <div class="cart-content">
        <div v-if="items.length === 0" class="empty-cart">
          <p>Tu carrito está vacío</p>
          <button @click="$emit('close')" class="btn btn-primary">Continuar Comprando</button>
        </div>
        
        <div v-else>
          <div class="cart-items">
            <div v-for="item in items" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" class="item-image">
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-price">${{ item.price.toLocaleString() }}</p>
              </div>
              <div class="quantity-controls">
                <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
              <button @click="$emit('remove-item', item.id)" class="remove-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="cart-footer">
            <div class="total">
              <strong>Total: ${{ total.toLocaleString() }}</strong>
            </div>
            <button @click="$emit('checkout')" class="btn btn-primary checkout-btn">
              Proceder al Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '../types'

const props = defineProps<{
  isOpen: boolean
  items: CartItem[]
}>()

const emit = defineEmits<{
  'close': []
  'update-quantity': [id: number, quantity: number]
  'remove-item': [id: number]
  'checkout': []
}>()

const total = computed(() => {
  return props.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const updateQuantity = (id: number, quantity: number) => {
  if (quantity > 0) {
    emit('update-quantity', id, quantity)
  }
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.cart-open {
  opacity: 1;
  pointer-events: all;
}

.cart {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.cart-open .cart {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.cart-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #f1f5f9;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}

.cart-items {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.cart-item {
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details h3 {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.item-price {
  color: #2563eb;
  font-weight: 600;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.quantity-controls button:hover:not(:disabled) {
  background: #f8fafc;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.remove-btn {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background: #fef2f2;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
}

.total {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

@media (max-width: 480px) {
  .cart {
    max-width: 100%;
  }
}
</style>