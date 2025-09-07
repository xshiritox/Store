<template>
  <div class="about">
    <div class="container">
      <div class="about-hero">
        <div class="hero-content">
          <h1>Sobre TechStore</h1>
          <p class="hero-subtitle">Tu tienda de tecnología de confianza desde 2020</p>
        </div>
      </div>
      
      <div class="about-content">
        <section class="story-section">
          <div class="content-grid">
            <div class="text-content">
              <h2>Nuestra Historia</h2>
              <p>TechStore nació con la visión de democratizar el acceso a la tecnología más avanzada. Comenzamos como una pequeña tienda local y hemos crecido hasta convertirnos en una de las plataformas de e-commerce tecnológico más confiables del país.</p>
              <p>Nos especializamos en ofrecer productos de alta calidad de las mejores marcas, siempre al mejor precio y con un servicio al cliente excepcional.</p>
            </div>
            <div class="image-content">
              <img src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Nuestro equipo" />
            </div>
          </div>
        </section>
        
        <section class="values-section">
          <h2>Nuestros Valores</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">🎯</div>
              <h3>Calidad</h3>
              <p>Seleccionamos cuidadosamente cada producto para garantizar la mejor experiencia.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">⚡</div>
              <h3>Innovación</h3>
              <p>Always at the forefront of technology, offering the latest innovations.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🤝</div>
              <h3>Confianza</h3>
              <p>Construimos relaciones duraderas basadas en transparencia y confiabilidad.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🚀</div>
              <h3>Excelencia</h3>
              <p>Nos esforzamos por superar las expectativas en cada interacción.</p>
            </div>
          </div>
        </section>
        
        <section class="team-section">
          <h2>Nuestro Compromiso</h2>
          <div class="commitment-content">
            <div class="commitment-item">
              <h3>🌱 Sostenibilidad</h3>
              <p>Trabajamos con marcas comprometidas con el medio ambiente y promovemos el reciclaje responsable de productos electrónicos.</p>
            </div>
            <div class="commitment-item">
              <h3>📚 Educación</h3>
              <p>Creemos en empoderar a nuestros clientes con conocimiento, ofreciendo guías y soporte técnico especializado.</p>
            </div>
            <div class="commitment-item">
              <h3>🔒 Seguridad</h3>
              <p>Tu privacidad y seguridad son fundamentales. Utilizamos las últimas tecnologías de encriptación para proteger tu información.</p>
            </div>
          </div>
        </section>
        
        <section class="stats-section">
          <h2>TechStore en Números</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">50,000+</div>
              <div class="stat-label">Clientes Satisfechos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Productos Vendidos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Soporte al Cliente</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">4.9/5</div>
              <div class="stat-label">Valoración Promedio</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem 0;
}

.about-hero {
  text-align: center;
  padding: 3rem 0 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 4rem;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.story-section,
.team-section,
.stats-section {
  margin-bottom: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.text-content h2,
.values-section h2,
.team-section h2,
.stats-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.text-content p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 1rem;
}

.image-content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.values-section {
  background: #f8fafc;
  padding: 4rem 2rem;
  border-radius: 12px;
  margin: 2rem -2rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-4px);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.value-card p {
  color: #64748b;
  line-height: 1.6;
}

.commitment-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.commitment-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.commitment-item p {
  color: #64748b;
  line-height: 1.6;
}

.stats-section {
  background: #1e293b;
  color: white;
  padding: 4rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin: 2rem -2rem;
}

.stats-section h2 {
  color: white;
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .values-section,
  .stats-section {
    margin: 2rem 0;
    padding: 2rem 1rem;
  }

  .about-content {
    gap: 2rem;
  }

  .text-content h2,
  .values-section h2,
  .team-section h2,
  .stats-section h2 {
    font-size: 1.5rem;
  }
}
</style>