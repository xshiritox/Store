<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Conoce nuestra tienda digital</h1>
            <p>Descubre los mejores productos con la mejor calidad y precios desde tu comodidad.</p>
            <div class="hero-actions">
              <router-link to="/products" class="btn btn-primary">Ver Productos</router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="/images/home.webp" alt="Productos de maquillaje" />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <div class="container">
        <div class="section-header">
          <h2> Nuevos Productos</h2>
          <p>Los productos más recientes de nuestra tienda</p>
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
            <div class="feature-icon"><Award :size="40" stroke-width="1.5" /></div>
            <h3>Calidad</h3>
            <p>Todos nuestros productos son de alta calidad y cumplen con los estándares más altos.</p>
          </div>
          
          <div class="feature">
            <div class="feature-icon"><Handshake :size="40" stroke-width="1.5" /></div>
            <h3>Confianza</h3>
            <p>Construimos relaciones duraderas basadas en transparencia y confiabilidad.</p>
          </div>
          
          <div class="feature">
            <div class="feature-icon"><ShieldCheck :size="40" stroke-width="1.5" /></div>
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
import { Award, Handshake, ShieldCheck } from 'lucide-vue-next'
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

.hero-image {
  margin: 2rem 0;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.hero-image img {
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
  display: block;
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
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
  color: #3b82f6;
  transition: transform 0.3s ease;
}

.feature:hover .feature-icon {
  transform: scale(1.1);
  color: #2563eb;
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