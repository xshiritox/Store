import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://khfyngrlhymsostdadlf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZnluZ3JsaHltc29zdGRhZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzMyNDcsImV4cCI6MjA3Mjg0OTI0N30.2tJmV0smVLJ9COs4KIytYZcMgQ-lykhc2oHwXjMG9IY'

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