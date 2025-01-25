//src/components/windows/ProfileWindow.vue
<template>
  <div class="profile-container pixel-font">
    <!-- Header con avatar y estadísticas -->
    <div class="profile-header">
      <div class="avatar-section">
        <div class="avatar-frame">
          <img src="/icons/avatar.png" alt="Profile Picture" />
          <div class="status-dot"></div>
        </div>
        <h2 class="username">@davidgdev</h2>
        <p class="real-name">David Gómez Díaz</p>
      </div>
      
      <div class="stats-section">
        <div class="stat-item">
          <span class="stat-number">5+</span>
          <span class="stat-label">Proyectos</span>
        </div>
        <div class="stat-separator"></div>
        <div class="stat-item">
          <span class="stat-number">850</span>
          <span class="stat-label">Horas de código</span>
        </div>
        <div class="stat-separator"></div>
        <div class="stat-item">
          <span class="stat-number">3</span>
          <span class="stat-label">Lenguajes</span>
        </div>
      </div>
    </div>

    <!-- Bio y badges -->
    <div class="profile-bio">
      <div class="bio-text">
        <p class="role">JUNIOR FULL-STACK WEB DEVELOPER</p>
        <p>Persona de altas capacidades, buscando aprender, crecer y poner a disposición mis habilidades.</p>
      </div>
      
      <div class="profile-badges">
        <div class="badge">
          <span class="badge-icon">🎯</span>
          <span>Certificado de discapacidad 33%</span>
        </div>
        <div class="badge">
          <span class="badge-icon">📍</span>
          <span>A Coruña, España</span>
        </div>
        <div class="badge">
          <span class="badge-icon">🌐</span>
          <span>www.davidgdev.es/portfolio</span>
        </div>
      </div>
    </div>

    <!-- Habilidades -->
    <div class="skills-section">
      <h3>Habilidades Destacadas</h3>
      <div class="skills-grid">
        <div v-for="(skill, index) in skills" 
             :key="index" 
             class="skill-box"
             :style="{ backgroundColor: getSkillColor(index) }">
          {{ skill }}
        </div>
      </div>
    </div>

    <!-- Footer con botones de contacto -->
    <div class="profile-footer">
      <button class="contact-btn" @click="openEmail">
        <span class="btn-icon">✉️</span> Email
      </button>
      <button class="contact-btn" @click="openLinkedIn">
        <span class="btn-icon">💼</span> LinkedIn
      </button>
    </div>
  </div>
</template>

<script setup>

const skills = [
  'Angular', 'Vue', 'React', 
  'SpringBoot', 'Laravel', 'Next.js',
  'TypeScript', 'Java', 'SQL'
]

const getSkillColor = (index) => {
  // Usar colores de la paleta proporcionada
  const colors = ['#472d3c', '#5e3643', '#7a444a', '#a05b53', '#bf7958', '#eea160']
  return colors[index % colors.length]
}

const openEmail = () => {
  window.location.href = 'mailto:davidgomez.seg@gmail.com'
}

const openLinkedIn = () => {
  window.open('https://www.linkedin.com/in/tu-perfil', '_blank')
}
</script>

<style scoped>
.profile-container {
  padding: 16px;
  color: #f4cca1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid #5e3643;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-frame {
  position: relative;
  width: 96px;
  height: 96px;
  border: 2px solid #eea160;
  border-radius: 4px;
  overflow: hidden;
}

.avatar-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

.status-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #b6d53c;
  border-radius: 2px;
}

.username {
  color: #eea160;
  margin: 0;
}

.real-name {
  opacity: 0.8;
  margin: 0;
}

.stats-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  color: #eea160;
  font-size: 18px;
}

.stat-label {
  font-size: 12px;
}

.stat-separator {
  width: 2px;
  height: 24px;
  background: #5e3643;
}

.profile-bio {
  padding: 16px;
  background: #302c2e;
  border-radius: 4px;
}

.bio-text {
  margin-bottom: 16px;
}

.role {
  color: #eea160;
  margin-bottom: 8px;
}

.profile-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skills-section {
  padding: 16px;
  background: #302c2e;
  border-radius: 4px;
}

.skills-section h3 {
  margin-bottom: 16px;
  color: #eea160;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
}

.skill-box {
  padding: 8px;
  text-align: center;
  border-radius: 2px;
  font-size: 12px;
  border: 1px solid #5e3643;
}

.profile-footer {
  margin-top: auto;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.contact-btn {
  background: #5e3643;
  border: 1px solid #f4cca1;
  color: #f4cca1;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'PixelFont', monospace;
}

.contact-btn:hover {
  background: #7a444a;
}
</style>