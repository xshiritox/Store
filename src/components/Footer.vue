<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Glow Make-up Store</h3>
          <p>Tu tienda de maquillaje de confianza. Productos de calidad con la mejor atención al cliente.</p>
        </div>
       
        <div class="footer-section">
          <h4>Contactanos</h4>
          <div class="contact-info">
            <p><Mail :size="18" class="icon" /> info@glowmakeup.com</p>
            <p><Phone :size="18" class="icon" /> +1 (555) 123-4567</p>
            <p><MapPin :size="18" class="icon" /> 123 Beauty Street, Glow City</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025  Glow Make-up Store. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next'
</script>

<style scoped>
.footer {
  background: #1f2937;
  color: #d1d5db;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 3rem 0 2rem;
}

.footer-section h3,
.footer-section h4 {
  color: white;
  margin-bottom: 1rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  color: #2563eb;
}

.footer-section h4 {
  font-size: 1.1rem;
}

.footer-section p {
  color: #9ca3af;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: #2563eb;
}

.contact-info p {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #9ca3af;
  transition: color 0.2s;
}

.contact-info p:hover {
  color: #3b82f6;
}

.contact-info .icon {
  color: #3b82f6;
  flex-shrink: 0;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  font-size: 1.5rem;
  transition: transform 0.2s;
}

.social-links a:hover {
  transform: scale(1.1);
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding: 1.5rem 0;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 0 1rem;
  }
}
</style>