<template>
  <div class="product-detail" v-if="product">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">Inicio</router-link>
        <span>/</span>
        <router-link to="/products">Productos</router-link>
        <span>/</span>
        <span>{{ product.name }}</span>
      </nav>
      
      <div class="product-content">
        <div class="product-gallery">
          <img :src="product.image" :alt="product.name" class="main-image" />
        </div>
        
        <div class="product-info">
          <div class="product-category">{{ product.category }}</div>
          <h1>{{ product.name }}</h1>
          
          <div class="product-rating" v-if="product.rating">
            <div class="stars">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.floor(product.rating!) }">★</span>
            </div>
            <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reseñas)</span>
          </div>
          
          <div class="price">${{ product.price.toLocaleString() }}</div>
          
          <div class="stock-status" :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }">
            {{ product.inStock ? '✓ En stock' : '✗ Agotado' }}
          </div>
          
          <p class="description">{{ product.description }}</p>
          
          <div class="product-features">
            <h3>Características destacadas:</h3>
            <ul>
              <li>Garantía oficial del fabricante</li>
              <li>Envío gratuito en compras mayores a $500</li>
              <li>Soporte técnico especializado</li>
              <li>Devolución sin costo en 30 días</li>
            </ul>
          </div>
          
          <div class="actions">
            <div class="quantity-selector">
              <label>Cantidad:</label>
              <div class="quantity-controls">
                <button @click="quantity > 1 && quantity--" :disabled="quantity <= 1">-</button>
                <span>{{ quantity }}</span>
                <button @click="quantity++">+</button>
              </div>
            </div>
            
            <button 
              @click="addToCart"
              :disabled="!product.inStock"
              class="btn btn-primary add-to-cart-btn"
            >
              {{ product.inStock ? 'Agregar al Carrito' : 'Producto Agotado' }}
            </button>
          </div>
          
          <div class="product-specs">
            <h3>Especificaciones:</h3>
            <div class="specs-grid">
              <div class="spec-item">
                <strong>Categoría:</strong>
                <span>{{ product.category }}</span>
              </div>
              <div class="spec-item">
                <strong>Estado:</strong>
                <span>{{ product.inStock ? 'Disponible' : 'Agotado' }}</span>
              </div>
              <div class="spec-item" v-if="product.rating">
                <strong>Valoración:</strong>
                <span>{{ product.rating }}/5 estrellas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="related-products">
        <h2>Productos Relacionados</h2>
        <div class="grid grid-4">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            :product="relatedProduct"
            @add-to-cart="$emit('add-to-cart', $event)"
          />
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="not-found">
    <div class="container">
      <h2>Producto no encontrado</h2>
      <p>El producto que buscas no existe o ha sido eliminado.</p>
      <router-link to="/products" class="btn btn-primary">Ver Productos</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../stores/products'
import { fallbackProducts } from '../data/products'
import type { Product } from '../types'

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  'add-to-cart': [product: Product]
}>()

const router = useRouter()
const { products, fetchProducts } = useProducts()
const quantity = ref(1)

const product = computed(() => {
  const productList = products.value.length > 0 ? products.value : fallbackProducts
  return productList.find(p => p.id === parseInt(props.id))
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  const productList = products.value.length > 0 ? products.value : fallbackProducts
  return productList
    .filter(p => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 4)
})

const addToCart = () => {
  if (product.value && product.value.inStock) {
    for (let i = 0; i < quantity.value; i++) {
      emit('add-to-cart', product.value)
    }
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #64748b;
}

.breadcrumb a {
  color: #2563eb;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.product-gallery {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.main-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-category {
  color: #2563eb;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stars {
  display: flex;
  color: #e5e7eb;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  color: #64748b;
  font-size: 0.875rem;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2563eb;
}

.stock-status {
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  width: fit-content;
}

.in-stock {
  color: #059669;
  background: #ecfdf5;
}

.out-of-stock {
  color: #dc2626;
  background: #fef2f2;
}

.description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
}

.product-features h3,
.product-specs h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.product-features ul {
  list-style: none;
  padding: 0;
}

.product-features li {
  padding: 0.5rem 0;
  color: #64748b;
  position: relative;
  padding-left: 1.5rem;
}

.product-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #059669;
  font-weight: bold;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-selector label {
  font-weight: 500;
  color: #374151;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #374151;
}

.quantity-controls button:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #2563eb;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
  color: #1e293b;
}

.add-to-cart-btn {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.specs-grid {
  display: grid;
  gap: 1rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.spec-item:last-child {
  border-bottom: none;
}

.related-products {
  margin-top: 4rem;
}

.related-products h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1e293b;
}

.not-found {
  padding: 4rem 0;
  text-align: center;
}

.not-found h2 {
  font-size: 2rem;
  color: #64748b;
  margin-bottom: 1rem;
}

.not-found p {
  color: #9ca3af;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-info h1 {
    font-size: 2rem;
  }

  .price {
    font-size: 2rem;
  }

  .main-image {
    height: 300px;
  }

  .actions {
    padding: 1.5rem;
  }

  .quantity-selector {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
}
</style>