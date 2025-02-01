//src/components/windows/ProfileWindow.vue
<template>
  <div class="profile-container pixel-font">
    <!-- Header con avatar y estadísticas -->
    <div class="profile-header">
      <div class="avatar-section">
        <div class="avatar-frame">
          <img :src="profile.avatar" alt="Profile Picture" />
          <div class="status-dot"></div>
        </div>
        <h2 class="username">@davidgdev</h2>
        <p class="real-name">{{ profile.name }}</p>
      </div>
      
      <div class="stats-section">
        <div v-for="(stat, index) in profile.stats" 
             :key="index" 
             class="stat-item">
          <span class="stat-number">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Bio y badges -->
    <div class="profile-bio">
      <div class="bio-text">
        <p class="role">{{ profile.role }}</p>
        <p>{{ profile.bio }}</p>
      </div>
      
      <div class="profile-badges">
        <div v-for="(badge, index) in profile.badges" 
             :key="index" 
             class="badge">
          <img :src="badge.icon" :alt="badge.text" class="badge-icon" />
          <span>{{ badge.text }}</span>
        </div>
      </div>
    </div>

    <!-- Habilidades -->
    <div class="skills-section">
      <h3>Habilidades Destacadas</h3>
      <div class="skills-grid">
        <div v-for="skill in profile.skills" 
             :key="skill.name" 
             class="skill-box">
          <img :src="skill.icon" :alt="skill.name" class="skill-icon" />
          <span>{{ skill.name }}</span>
        </div>
      </div>
    </div>

    <!-- Galería de imágenes -->
    <div class="gallery-section">
      <h3>Galería</h3>
      <div class="gallery-grid">
        <div v-for="(image, index) in profile.gallery" 
             :key="index" 
             class="gallery-item">
          <img :src="image.image" :alt="image.description" />
          <p class="image-caption">{{ image.description }}</p>
        </div>
      </div>
    </div>

    <!-- Footer con botones de contacto -->
    <div class="profile-footer">
      <button class="contact-btn" @click="openEmail">
        <img src="/icons/email.png" alt="Email" class="btn-icon" />
        Email
      </button>
      <button class="contact-btn" @click="openLinkedIn">
        <img src="/icons/linkedin.png" alt="LinkedIn" class="btn-icon" />
        LinkedIn
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { config } from '@/config/data'

const profile = computed(() => config.profile)

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
  overflow-y: auto;
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
  image-rendering: pixelated;
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
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

.skill-box {
  padding: 8px;
  background: #472d3c;
  border: 1px solid #5e3643;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.skill-icon {
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
}

.gallery-section {
  padding: 16px;
  background: #302c2e;
  border-radius: 4px;
}

.gallery-section h3 {
  margin-bottom: 16px;
  color: #eea160;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.gallery-item {
  border: 1px solid #5e3643;
  padding: 8px;
  background: #472d3c;
}

.gallery-item img {
  width: 100%;
  height: auto;
  image-rendering: pixelated;
}

.image-caption {
  margin-top: 8px;
  text-align: center;
  font-size: 12px;
  color: #a0938e;
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

.btn-icon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}

.contact-btn:hover {
  background: #7a444a;
}
</style>