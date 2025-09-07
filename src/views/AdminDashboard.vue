<template>
  <div class="admin-dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1>Panel de Administración</h1>
        <p>Gestiona tus productos y ventas</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-info">
            <h3>{{ products.length }}</h3>
            <p>Productos Totales</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <h3>{{ inStockProducts }}</h3>
            <p>En Stock</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">❌</div>
          <div class="stat-info">
            <h3>{{ outOfStockProducts }}</h3>
            <p>Agotados</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <h3>${{ totalValue.toLocaleString() }}</h3>
            <p>Valor Total</p>
          </div>
        </div>
      </div>

      <div class="dashboard-actions">
        <button @click="showAddProduct = true" class="btn btn-primary">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Agregar Producto
        </button>
      </div>

      <div class="products-table">
        <h2>Mis Productos</h2>
        
        <div v-if="loading" class="loading">
          Cargando productos...
        </div>

        <div v-else-if="products.length === 0" class="empty-state">
          <h3>No tienes productos</h3>
          <p>Comienza agregando tu primer producto</p>
        </div>

        <div v-else class="table-container">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>
                  <img :src="product.image" :alt="product.name" class="product-thumb">
                </td>
                <td>
                  <div class="product-name">{{ product.name }}</div>
                </td>
                <td>{{ product.category }}</td>
                <td>${{ product.price.toLocaleString() }}</td>
                <td>
                  <span class="stock-badge" :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }">
                    {{ product.inStock ? 'En Stock' : 'Agotado' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button @click="editProduct(product)" class="btn-icon edit">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button @click="deleteProductConfirm(product)" class="btn-icon delete">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div v-if="showAddProduct || editingProduct" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ editingProduct ? 'Editar Producto' : 'Agregar Producto' }}</h2>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        
        <form @submit.prevent="saveProduct" class="modal-body">
          <div class="form-group">
            <label for="name">Nombre del Producto</label>
            <input v-model="productForm.name" type="text" id="name" required class="form-control">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="price">Precio</label>
              <input v-model.number="productForm.price" type="number" id="price" required min="0" step="0.01" class="form-control">
            </div>
            <div class="form-group">
              <label for="category">Categoría</label>
              <input v-model="productForm.category" type="text" id="category" required class="form-control">
            </div>
          </div>

          <div class="form-group">
            <label for="image">URL de la Imagen</label>
            <input v-model="productForm.image" type="url" id="image" required class="form-control">
          </div>

          <div class="form-group">
            <label for="description">Descripción</label>
            <textarea v-model="productForm.description" id="description" required rows="4" class="form-control"></textarea>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="productForm.inStock">
              <span>Producto en stock</span>
            </label>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Crear') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../stores/auth'
import { useProducts } from '../stores/products'
import type { Product } from '../types'

const { user } = useAuth()
const { products, loading, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts()

const showAddProduct = ref(false)
const editingProduct = ref<Product | null>(null)
const saving = ref(false)
const error = ref('')

const productForm = ref({
  name: '',
  price: 0,
  category: '',
  image: '',
  description: '',
  inStock: true
})

const inStockProducts = computed(() => products.value.filter(p => p.inStock).length)
const outOfStockProducts = computed(() => products.value.filter(p => !p.inStock).length)
const totalValue = computed(() => products.value.reduce((sum, p) => sum + p.price, 0))

const editProduct = (product: Product) => {
  editingProduct.value = product
  productForm.value = {
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    description: product.description,
    inStock: product.inStock
  }
}

const deleteProductConfirm = async (product: Product) => {
  if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
    const { error: deleteError } = await deleteProduct(product.id)
    if (deleteError) {
      alert('Error al eliminar el producto: ' + deleteError)
    }
  }
}

const closeModal = () => {
  showAddProduct.value = false
  editingProduct.value = null
  error.value = ''
  productForm.value = {
    name: '',
    price: 0,
    category: '',
    image: '',
    description: '',
    inStock: true
  }
}

const saveProduct = async () => {
  try {
    saving.value = true
    error.value = ''

    if (!user.value) {
      error.value = 'Usuario no autenticado'
      return
    }

    const productData = {
      name: productForm.value.name,
      price: productForm.value.price,
      category: productForm.value.category,
      image: productForm.value.image,
      description: productForm.value.description,
      inStock: productForm.value.inStock,
      rating: null,
      reviews: null
    }

    if (editingProduct.value) {
      const { error: updateError } = await updateProduct(editingProduct.value.id, productData)
      if (updateError) {
        error.value = updateError
        return
      }
    } else {
      const { error: createError } = await createProduct(productData, user.value.id)
      if (createError) {
        error.value = createError
        return
      }
    }

    closeModal()
  } catch (err: any) {
    error.value = err.message || 'Error al guardar el producto'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem 0;
  min-height: 80vh;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #64748b;
  font-size: 1.125rem;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 50%;
}

.stat-info h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.stat-info p {
  color: #64748b;
  font-size: 0.875rem;
}

.dashboard-actions {
  margin-bottom: 2rem;
}

.dashboard-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.products-table {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.products-table h2 {
  padding: 2rem;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 1px solid #e5e7eb;
}

.loading,
.empty-state {
  padding: 3rem;
  text-align: center;
  color: #64748b;
}

.empty-state h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

th {
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
}

.product-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}

.product-name {
  font-weight: 500;
  color: #1e293b;
}

.stock-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.stock-badge.in-stock {
  background: #ecfdf5;
  color: #059669;
}

.stock-badge.out-of-stock {
  background: #fef2f2;
  color: #dc2626;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon.edit {
  background: #eff6ff;
  color: #2563eb;
}

.btn-icon.edit:hover {
  background: #dbeafe;
}

.btn-icon.delete {
  background: #fef2f2;
  color: #dc2626;
}

.btn-icon.delete:hover {
  background: #fecaca;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #64748b;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.close-btn:hover {
  background: #f1f5f9;
}

.modal-body {
  padding: 2rem;
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

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  border: 1px solid #fecaca;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal {
    margin: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>