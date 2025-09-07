<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>TechStore</h3>
          <p>Tu tienda de tecnología de confianza. Productos de calidad con la mejor atención al cliente.</p>
        </div>
        
        <div class="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/products">Productos</router-link></li>
            <li><router-link to="/about">Nosotros</router-link></li>
            <li><router-link to="/contact">Contacto</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Contacto</h4>
          <div class="contact-info">
            <p>📧 info@techstore.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Tech Street, Digital City</p>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Síguenos</h4>
          <div class="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 TechStore. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

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
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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