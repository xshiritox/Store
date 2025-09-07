<template>
  <div class="contact">
    <div class="container">
      <div class="contact-hero">
        <h1>Contáctanos</h1>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card">
            <div class="info-icon">📍</div>
            <div class="info-details">
              <h3>Nuestra Oficina</h3>
              <p>123 Tech Street<br>Digital City, DC 12345</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">📞</div>
            <div class="info-details">
              <h3>Teléfono</h3>
              <p>+1 (555) 123-4567</p>
              <p class="small-text">Lun - Vie: 9:00 - 18:00</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">📧</div>
            <div class="info-details">
              <h3>Email</h3>
              <p>info@techstore.com</p>
              <p class="small-text">Respuesta en 24 horas</p>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">💬</div>
            <div class="info-details">
              <h3>Chat en Vivo</h3>
              <p>Disponible en nuestro sitio web</p>
              <p class="small-text">Lun - Dom: 8:00 - 22:00</p>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <form @submit.prevent="submitForm">
            <h2>Envíanos un Mensaje</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Nombre *</label>
                <input 
                  v-model="form.firstName" 
                  type="text" 
                  id="firstName" 
                  required 
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="lastName">Apellido *</label>
                <input 
                  v-model="form.lastName" 
                  type="text" 
                  id="lastName" 
                  required 
                  class="form-control"
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  id="email" 
                  required 
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="phone">Teléfono</label>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  id="phone" 
                  class="form-control"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="subject">Asunto *</label>
              <select v-model="form.subject" id="subject" required class="form-control">
                <option value="">Selecciona un asunto</option>
                <option value="general">Consulta General</option>
                <option value="support">Soporte Técnico</option>
                <option value="order">Sobre mi Pedido</option>
                <option value="return">Devoluciones</option>
                <option value="business">Propuesta de Negocio</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Mensaje *</label>
              <textarea 
                v-model="form.message" 
                id="message" 
                rows="6" 
                required 
                class="form-control"
                placeholder="Describe tu consulta o mensaje..."
              ></textarea>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.newsletter">
                <span>Quiero recibir noticias y ofertas especiales por email</span>
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
          </form>
        </div>
      </div>
      
      <div class="faq-section">
        <h2>Preguntas Frecuentes</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>¿Cuáles son los tiempos de envío?</h3>
            <p>Los pedidos se procesan en 1-2 días hábiles. El envío estándar toma 3-5 días hábiles, mientras que el envío express toma 1-2 días hábiles.</p>
          </div>
          
          <div class="faq-item">
            <h3>¿Qué métodos de pago aceptan?</h3>
            <p>Aceptamos todas las tarjetas de crédito principales, PayPal, transferencias bancarias y pagos en efectivo contra entrega.</p>
          </div>
          
          <div class="faq-item">
            <h3>¿Cuál es la política de devoluciones?</h3>
            <p>Ofrecemos devoluciones sin costo dentro de los 30 días de la compra. Los productos deben estar en condición original con su empaque.</p>
          </div>
          
          <div class="faq-item">
            <h3>¿Los productos tienen garantía?</h3>
            <p>Todos nuestros productos incluyen garantía oficial del fabricante. Adicionalmente, ofrecemos garantía extendida para productos seleccionados.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simular envío del formulario
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  alert('¡Gracias por tu mensaje! Te responderemos pronto.')
  
  // Limpiar formulario
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  }
  
  isSubmitting.value = false
}
</script>

<style scoped>
.contact {
  padding: 2rem 0;
}

.contact-hero {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

.contact-hero p {
  font-size: 1.25rem;
  color: #64748b;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
}

.info-icon {
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 50%;
  flex-shrink: 0;
}

.info-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.info-details p {
  color: #64748b;
  margin-bottom: 0.25rem;
}

.small-text {
  font-size: 0.875rem;
  color: #9ca3af !important;
}

.contact-form {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1e293b;
  text-align: center;
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
  min-height: 120px;
}

select.form-control {
  cursor: pointer;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
}

.faq-section {
  background: #f8fafc;
  padding: 3rem 2rem;
  border-radius: 12px;
  margin: 2rem -2rem 0;
}

.faq-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1e293b;
  text-align: center;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.faq-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.faq-item p {
  color: #64748b;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .contact-hero h1 {
    font-size: 2rem;
  }

  .contact-hero p {
    font-size: 1rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .faq-section {
    margin: 2rem 0 0;
    padding: 2rem 1rem;
  }

  .faq-section h2 {
    font-size: 1.5rem;
  }
}
</style>