import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

const user = ref<User | null>(null)
const profile = ref<UserProfile | null>(null)
const loading = ref(true)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => profile.value?.role === 'admin')
  const isUser = computed(() => profile.value?.role === 'user')

  const signUp = async (email: string, password: string, fullName: string, role: 'user' | 'admin' = 'user') => {
    try {
      // First, sign up the user without any additional data to avoid trigger conflicts
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined // Disable email confirmation to avoid trigger issues
        }
      })

      if (error) throw error

      // Wait a moment for the user to be fully created in the auth system
      if (data.user) {
        // Small delay to ensure user is fully created before profile insertion
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            role: role
          }, {
            onConflict: 'id'
          })

        if (profileError) {
          console.error('Error creating profile:', profileError.message)
          // If profile creation fails, we should clean up the auth user
          await supabase.auth.signOut()
          throw new Error(`Profile creation failed: ${profileError.message}`)
        }
      }
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      user.value = null
      profile.value = null
    } catch (error: any) {
      console.error('Error signing out:', error.message)
    }
  }

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      profile.value = data
      return data
    } catch (error: any) {
      console.error('Error fetching profile:', error.message)
      return null
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user.value) throw new Error('No user logged in')

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.value.id)
        .select()
        .single()

      if (error) throw error

      profile.value = data
      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  const initialize = async () => {
    try {
      loading.value = true
      
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        user.value = session.user
        await fetchProfile(session.user.id)
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          user.value = session.user
          await fetchProfile(session.user.id)
        } else {
          user.value = null
          profile.value = null
        }
      })
    } catch (error: any) {
      console.error('Error initializing auth:', error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    user: computed(() => user.value),
    profile: computed(() => profile.value),
    loading: computed(() => loading.value),
    isAuthenticated,
    isAdmin,
    isUser,
    signUp,
    signIn,
    signOut,
    fetchProfile,
    updateProfile,
    initialize
  }
}