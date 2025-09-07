<template>
  <div class="checkout">
    <div class="container">
      <div class="checkout-header">
        <h1>Finalizar Compra</h1>
        <router-link to="/products" class="continue-shopping">← Continuar comprando</router-link>
      </div>
      
      <div class="checkout-content" v-if="cartItems.length > 0">
        <div class="checkout-form">
          <form @submit.prevent="processOrder">
            <div class="form-section">
              <h2>Información de Contacto</h2>
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Nombre *</label>
                  <input 
                    v-model="customer.firstName" 
                    type="text" 
                    id="firstName" 
                    required 
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label for="lastName">Apellido *</label>
                  <input 
                    v-model="customer.lastName" 
                    type="text" 
                    id="lastName" 
                    required 
                    class="form-control"
                  >
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input 
                    v-model="customer.email" 
                    type="email" 
                    id="email" 
                    required 
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label for="phone">Teléfono *</label>
                  <input 
                    v-model="customer.phone" 
                    type="tel" 
                    id="phone" 
                    required 
                    class="form-control"
                  >
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h2>Dirección de Envío</h2>
              <div class="form-group">
                <label for="address">Dirección *</label>
                <input 
                  v-model="customer.address" 
                  type="text" 
                  id="address" 
                  required 
                  class="form-control"
                >
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="city">Ciudad *</label>
                  <input 
                    v-model="customer.city" 
                    type="text" 
                    id="city" 
                    required 
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label for="postalCode">Código Postal *</label>
                  <input 
                    v-model="customer.postalCode" 
                    type="text" 
                    id="postalCode" 
                    required 
                    class="form-control"
                  >
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h2>Método de Pago</h2>
              <div class="payment-methods">
                <label class="payment-method">
                  <input type="radio" v-model="paymentMethod" value="card" checked>
                  <span class="payment-icon">💳</span>
                  <span>Tarjeta de Crédito/Débito</span>
                </label>
                <label class="payment-method">
                  <input type="radio" v-model="paymentMethod" value="paypal">
                  <span class="payment-icon">💰</span>
                  <span>PayPal</span>
                </label>
                <label class="payment-method">
                  <input type="radio" v-model="paymentMethod" value="transfer">
                  <span class="payment-icon">🏦</span>
                  <span>Transferencia Bancaria</span>
                </label>
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary place-order-btn" :disabled="isProcessing">
              {{ isProcessing ? 'Procesando...' : `Realizar Pedido - $${total.toLocaleString()}` }}
            </button>
          </form>
        </div>
        
        <div class="order-summary">
          <h2>Resumen del Pedido</h2>
          
          <div class="order-items">
            <div v-for="item in cartItems" :key="item.id" class="order-item">
              <img :src="item.image" :alt="item.name" class="item-image">
              <div class="item-details">
                <h4>{{ item.name }}</h4>
                <div class="item-meta">
                  <span class="quantity">Cantidad: {{ item.quantity }}</span>
                  <span class="price">${{ (item.price * item.quantity).toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="order-totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${{ subtotal.toLocaleString() }}</span>
            </div>
            <div class="total-row">
              <span>Envío:</span>
              <span>{{ shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString()}` }}</span>
            </div>
            <div class="total-row">
              <span>Impuestos:</span>
              <span>${{ taxes.toLocaleString() }}</span>
            </div>
            <div class="total-row total-final">
              <strong>Total: ${{ total.toLocaleString() }}</strong>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega algunos productos antes de proceder al checkout</p>
        <router-link to="/products" class="btn btn-primary">Ver Productos</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { CartItem, Customer } from '../types'

const router = useRouter()
const cartItems = inject<any>('cartItems')?.value || []

const customer = ref<Customer>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: ''
})

const paymentMethod = ref('card')
const isProcessing = ref(false)

const subtotal = computed(() => {
  return cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
})

const shippingCost = computed(() => {
  return subtotal.value >= 500 ? 0 : 50
})

const taxes = computed(() => {
  return Math.round(subtotal.value * 0.16) // 16% IVA
})

const total = computed(() => {
  return subtotal.value + shippingCost.value + taxes.value
})

const processOrder = async () => {
  isProcessing.value = true
  
  // Simular procesamiento del pedido
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  alert('¡Pedido procesado exitosamente! Recibirás un email de confirmación.')
  
  // Limpiar el carrito y redirigir
  cartItems.splice(0)
  router.push('/')
  
  isProcessing.value = false
}
</script>

<style scoped>
.checkout {
  padding: 2rem 0;
  min-height: 80vh;
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.checkout-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}

.continue-shopping {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.continue-shopping:hover {
  color: #1d4ed8;
}

.checkout-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.checkout-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.form-section {
  margin-bottom: 2.5rem;
}

.form-section:last-child {
  margin-bottom: 0;
}

.form-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e293b;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #2563eb;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-method:hover {
  background: #f8fafc;
  border-color: #2563eb;
}

.payment-method input[type="radio"]:checked + .payment-icon + span {
  color: #2563eb;
  font-weight: 600;
}

.payment-icon {
  font-size: 1.5rem;
}

.place-order-btn {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1rem;
}

.order-summary {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.order-summary h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e293b;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #2563eb;
}

.order-items {
  margin-bottom: 2rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.quantity {
  color: #64748b;
}

.price {
  color: #2563eb;
  font-weight: 600;
}

.order-totals {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.total-final {
  font-size: 1.125rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 0.5rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart h2 {
  font-size: 1.75rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #9ca3af;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .order-summary {
    position: static;
  }
}

@media (max-width: 640px) {
  .checkout-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .checkout-form,
  .order-summary {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .checkout-header h1 {
    font-size: 1.5rem;
  }
}
</style>