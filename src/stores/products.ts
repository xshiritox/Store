import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import type { Product } from '../types'

const products = ref<Product[]>([])
const loading = ref(false)

export const useProducts = () => {
  const fetchProducts = async () => {
    try {
      loading.value = true
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform database format to app format
      products.value = data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        inStock: product.in_stock,
        rating: product.rating,
        reviews: product.reviews
      }))

      return { data: products.value, error: null }
    } catch (error: any) {
      return { data: [], error: error.message }
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData: Omit<Product, 'id'>, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          price: productData.price,
          image: productData.image,
          description: productData.description,
          category: productData.category,
          in_stock: productData.inStock,
          rating: productData.rating,
          reviews: productData.reviews,
          created_by: userId
        })
        .select()
        .single()

      if (error) throw error

      // Add to local state
      const newProduct: Product = {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        category: data.category,
        inStock: data.in_stock,
        rating: data.rating,
        reviews: data.reviews
      }

      products.value.unshift(newProduct)

      return { data: newProduct, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          price: updates.price,
          image: updates.image,
          description: updates.description,
          category: updates.category,
          in_stock: updates.inStock,
          rating: updates.rating,
          reviews: updates.reviews
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = {
          id: data.id,
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          category: data.category,
          inStock: data.in_stock,
          rating: data.rating,
          reviews: data.reviews
        }
      }

      return { data: products.value[index], error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Remove from local state
      products.value = products.value.filter(p => p.id !== id)

      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  return {
    products,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}