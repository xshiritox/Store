import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          price: number
          image: string
          description: string
          category: string
          in_stock: boolean
          rating: number | null
          reviews: number | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: number
          name: string
          price: number
          image: string
          description: string
          category: string
          in_stock?: boolean
          rating?: number | null
          reviews?: number | null
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: number
          name?: string
          price?: number
          image?: string
          description?: string
          category?: string
          in_stock?: boolean
          rating?: number | null
          reviews?: number | null
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
    }
  }
}