<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <div v-if="!product.inStock" class="out-of-stock">Agotado</div>
    </div>
    
    <div class="product-info">
      <div class="product-category">{{ product.category }}</div>
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-rating" v-if="product.rating">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.floor(product.rating!) }">★</span>
        </div>
        <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reseñas)</span>
      </div>
      
      <div class="product-footer">
        <div class="price">${{ product.price.toLocaleString() }}</div>
        <div class="actions">
          <router-link :to="`/product/${product.id}`" class="btn btn-secondary">Ver Detalles</router-link>
          <button 
            @click="$emit('add-to-cart', product)"
            :disabled="!product.inStock"
            class="btn btn-primary"
          >
            {{ product.inStock ? 'Agregar' : 'Agotado' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'

defineProps<{
  product: Product
}>()

defineEmits<{
  'add-to-cart': [product: Product]
}>()
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.out-of-stock {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #dc2626;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-info {
  padding: 1.5rem;
}

.product-category {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.product-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  color: #e5e7eb;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  font-size: 0.75rem;
  color: #64748b;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions .btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .product-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .actions {
    justify-content: space-between;
  }

  .actions .btn {
    flex: 1;
  }
}
</style>