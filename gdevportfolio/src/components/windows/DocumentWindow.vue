//src/components/windows/DocumentWindow.vue
<template>
  <div class="document-container pixel-font">
    <template v-if="content">
      <!-- Cabecera del documento -->
      <div class="document-header">
        <h1 class="doc-title">{{ content.role || content.title || content.program }}</h1>
        <div class="doc-metadata">
          <p class="company">{{ content.company || content.institution }}</p>
          <p class="period">{{ content.period }}</p>
          <p v-if="content.duration" class="duration">{{ content.duration }}</p>
        </div>
      </div>

      <!-- Contenido del documento -->
      <div class="document-content">
        <!-- Descripción -->
        <p v-if="content.description" class="description">
          {{ content.description }}
        </p>

        <!-- Proyectos -->
        <div v-if="content.projects" class="section">
          <h2>Proyectos:</h2>
          <ul>
            <li v-for="(project, index) in content.projects" :key="index">
              {{ project }}
            </li>
          </ul>
        </div>

        <!-- Tecnologías -->
        <div v-if="content.technologies" class="section">
          <h2>Tecnologías:</h2>
          <div class="tech-tags">
            <span v-for="(tech, index) in content.technologies" 
                  :key="index" 
                  class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Enlaces -->
        <div v-if="content.links" class="section links-section">
          <h2>Enlaces:</h2>
          <div class="links-container">
            <a 
              v-for="(link, key) in content.links" 
              :key="key"
              :href="link.url"
              target="_blank"
              class="doc-link"
              @click="handleLinkClick"
            >
              {{ link.title }}
            </a>
          </div>
        </div>

        <!-- Imágenes -->
        <div v-if="content.images" class="section images-section">
          <h2>Imágenes:</h2>
          <div class="image-grid">
            <div 
              v-for="(image, index) in content.images" 
              :key="index"
              class="image-container"
            >
              <img :src="image.url" :alt="image.description" />
              <p class="image-caption">{{ image.description }}</p>
            </div>
          </div>
        </div>

        <!-- Nota -->
        <div v-if="content.note" class="note-section">
          <p class="note">
            {{ content.note }}
          </p>
        </div>

        <!-- Financiación (específico para educación) -->
        <div v-if="content.funding" class="funding-section">
          <p class="funding">
            {{ content.funding }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { soundManager } from '@/utils/sound'

defineProps({
  windowId: {
    type: String,
    required: true
  },
  content: {
    type: Object,
    required: true
  }
})

const handleLinkClick = () => {
  soundManager.playSound('/sounds/click.wav')
}
</script>

<style scoped>
.document-container {
  padding: 24px;
  color: #f4cca1;
  height: 100%;
  overflow-y: auto;
  background: #302c2e;
}

.document-header {
  border-bottom: 2px solid #5e3643;
  margin-bottom: 24px;
  padding-bottom: 16px;
}

.doc-title {
  color: #eea160;
  font-size: 18px;
  margin-bottom: 8px;
}

.doc-metadata {
  color: #a0938e;
}

.company, .period, .duration {
  margin: 4px 0;
}

.document-content {
  line-height: 1.6;
}

.section {
  margin: 24px 0;
}

.section h2 {
  color: #eea160;
  font-size: 16px;
  margin-bottom: 12px;
}

ul {
  list-style-type: none;
  padding-left: 16px;
}

li {
  margin-bottom: 8px;
  position: relative;
}

li:before {
  content: "•";
  color: #eea160;
  position: absolute;
  left: -16px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: #472d3c;
  padding: 4px 8px;
  border-radius: 2px;
  font-size: 12px;
  border: 1px solid #5e3643;
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.doc-link {
  background: #472d3c;
  padding: 8px 16px;
  color: #f4cca1;
  text-decoration: none;
  border: 1px solid #5e3643;
  transition: background-color 0.2s;
}

.doc-link:hover {
  background: #5e3643;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.image-container {
  border: 1px solid #5e3643;
  padding: 8px;
  background: #472d3c;
}

.image-container img {
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

.note-section {
  margin-top: 24px;
  padding: 12px;
  background: #472d3c;
  border: 1px solid #5e3643;
}

.note {
  font-style: italic;
  color: #a0938e;
}

.funding-section {
  margin-top: 24px;
  padding: 12px;
  background: #472d3c;
  border: 1px solid #5e3643;
  color: #eea160;
}
</style>