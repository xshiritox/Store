<template>
  <div class="products-page">
    <div class="container">
      <div class="page-header">
        <h1>Nuestros Productos</h1>
        <p>Explora nuestra amplia selección de productos tecnológicos</p>
      </div>
      
      <div class="products-layout">
        <aside class="filters">
          <div class="filter-section">
            <h3>Buscar</h3>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Buscar productos..."
              class="search-input"
            >
          </div>
          
          <div class="filter-section">
            <h3>Categorías</h3>
            <div class="filter-options">
              <label>
                <input type="radio" v-model="selectedCategory" value="">
                <span>Todas</span>
              </label>
              <label v-for="category in categories" :key="category">
                <input type="radio" v-model="selectedCategory" :value="category">
                <span>{{ category }}</span>
              </label>
            </div>
          </div>
          
          <div class="filter-section">
            <h3>Precio</h3>
            <div class="price-range">
              <input v-model="minPrice" type="number" placeholder="Mín" min="0">
              <span>-</span>
              <input v-model="maxPrice" type="number" placeholder="Máx" min="0">
            </div>
          </div>
          
          <div class="filter-section">
            <label class="checkbox-label">
              <input type="checkbox" v-model="inStockOnly">
              <span>Solo en stock</span>
            </label>
          </div>
        </aside>
        
        <main class="products-content">
          <div class="products-header">
            <div class="results-info">
              <span>{{ filteredProducts.length }} productos encontrados</span>
            </div>
            <select v-model="sortBy" class="sort-select">
              <option value="name">Ordenar por nombre</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>
          
          <div v-if="filteredProducts.length === 0" class="no-results">
            <h3>No se encontraron productos</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
          
          <div v-else class="grid grid-3">
            <ProductCard 
              v-for="product in sortedProducts" 
              :key="product.id"
              :product="product"
              @add-to-cart="$emit('add-to-cart', $event)"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProducts } from '../stores/products'
import { fallbackProducts } from '../data/products'
import type { Product } from '../types'

defineEmits<{
  'add-to-cart': [product: Product]
}>()

const { products, fetchProducts } = useProducts()

const searchQuery = ref('')
const selectedCategory = ref('')
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const inStockOnly = ref(false)
const sortBy = ref('name')

const categories = computed(() => {
  const productList = products.value.length > 0 ? products.value : fallbackProducts
  return [...new Set(productList.map(p => p.category))]
})

const filteredProducts = computed(() => {
  const productList = products.value.length > 0 ? products.value : fallbackProducts
  return productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    
    const matchesPrice = (!minPrice.value || product.price >= minPrice.value) &&
                        (!maxPrice.value || product.price <= maxPrice.value)
    
    const matchesStock = !inStockOnly.value || product.inStock
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })
})

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
})

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.products-page {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

.page-header p {
  font-size: 1.125rem;
  color: #64748b;
}

.products-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.filters {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-options label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-range input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 0.875rem;
}

.products-content {
  min-width: 0;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.results-info {
  color: #64748b;
  font-size: 0.875rem;
}

.sort-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results h3 {
  font-size: 1.5rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #9ca3af;
}

@media (max-width: 1024px) {
  .products-layout {
    grid-template-columns: 1fr;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .filter-section {
    margin-bottom: 0;
  }
}

@media (max-width: 640px) {
  .filters {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .products-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
</style>