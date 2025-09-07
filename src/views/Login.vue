<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-form">
          <div class="auth-header">
            <h1>Iniciar Sesión</h1>
            <p>Accede a tu cuenta para continuar</p>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="form-control"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                v-model="form.password"
                type="password"
                id="password"
                required
                class="form-control"
                :disabled="loading"
              >
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <button type="submit" class="btn btn-primary auth-btn" :disabled="loading">
              {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
            </button>
          </form>

          <div class="auth-footer">
            <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
          </div>
        </div>

        <div class="auth-image">
          <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Login" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const router = useRouter()
const { signIn } = useAuth()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    const { data, error: signInError } = await signIn(form.value.email, form.value.password)

    if (signInError) {
      error.value = signInError
      return
    }

    // Redirect to home page
    router.push('/')
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.auth-form {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #64748b;
  font-size: 1rem;
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
  padding: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-control:disabled {
  background: #f9fafb;
  opacity: 0.7;
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

.auth-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.auth-footer {
  text-align: center;
}

.auth-footer p {
  color: #64748b;
  font-size: 0.875rem;
}

.auth-footer a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.auth-image {
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .auth-container {
    grid-template-columns: 1fr;
    margin: 1rem;
  }

  .auth-form {
    padding: 2rem;
  }

  .auth-image {
    display: none;
  }
}
</style>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const router = useRouter()
const { signIn } = useAuth()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    const { data, error: signInError } = await signIn(form.value.email, form.value.password)

    if (signInError) {
      error.value = signInError
      return
    }

    // Redirect to home page
    router.push('/')
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>