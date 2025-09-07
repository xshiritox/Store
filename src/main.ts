import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import ProductDetail from './views/ProductDetail.vue'
import Checkout from './views/Checkout.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import AdminDashboard from './views/AdminDashboard.vue'
import { useAuth } from './stores/auth'

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/product/:id', component: ProductDetail, props: true },
  { path: '/checkout', component: Checkout },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/admin', 
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  const { user, profile, initialize } = useAuth()
  
  // Initialize auth if not already done
  if (!user.value && !profile.value) {
    await initialize()
  }
  
  if (to.meta.requiresAuth && !user.value) {
    next('/login')
  } else if (to.meta.requiresAdmin && profile.value?.role !== 'admin') {
    next('/')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')