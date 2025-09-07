<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Tecnología de Vanguardia</h1>
            <p>Descubre los últimos productos tecnológicos con la mejor calidad y precios competitivos. Tu tienda de confianza para todo lo digital.</p>
            <div class="hero-actions">
              <router-link to="/products" class="btn btn-primary">Explorar Productos</router-link>
              <router-link to="/about" class="btn btn-secondary">Conoce Más</router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Tecnología moderna" />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <div class="container">
        <div class="section-header">
          <h2>Productos Destacados</h2>
          <p>Los productos más populares y mejor valorados por nuestros clientes</p>
        </div>
        
        <div class="grid grid-3">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="$emit('add-to-cart', $event)"
          />
        </div>
        
        <div class="text-center">
          <router-link to="/products" class="btn btn-primary">Ver Todos los Productos</router-link>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="container">
        <div class="grid grid-3">
          <div class="feature">
            <div class="feature-icon">🚚</div>
            <h3>Envío Gratuito</h3>
            <p>Envío gratis en compras mayores a $500. Recibe tus productos en 2-3 días hábiles.</p>
          </div>
          
          <div class="feature">
            <div class="feature-icon">🛡️</div>
            <h3>Garantía Total</h3>
            <p>Todos nuestros productos incluyen garantía oficial del fabricante y soporte técnico.</p>
          </div>
          
          <div class="feature">
            <div class="feature-icon">💳</div>
            <h3>Pago Seguro</h3>
            <p>Múltiples métodos de pago seguros. Transacciones protegidas con encriptación SSL.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../stores/products'
import { fallbackProducts } from '../data/products'
import type { Product } from '../types'

defineEmits<{
  'add-to-cart': [product: Product]
}>()

const { products, fetchProducts } = useProducts()

const featuredProducts = computed(() => {
  const productList = products.value.length > 0 ? products.value : fallbackProducts
  return productList
    .filter(p => p.rating && p.rating >= 4.5)
    .slice(0, 6)
})

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  margin-bottom: 4rem;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero-text p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.featured-products {
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

.section-header p {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.text-center {
  text-align: center;
  margin-top: 3rem;
}

.features {
  background: #f8fafc;
  padding: 4rem 0;
}

.feature {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.feature p {
  color: #64748b;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .section-header h2 {
    font-size: 2rem;
  }
}
</style>