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

        <!-- Nota -->
        <p v-if="content.note" class="note">
          Nota: {{ content.note }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
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
  font-size: 14px;
}

.company, .period {
  margin: 4px 0;
}

.document-content {
  line-height: 1.6;
}

.description {
  margin-bottom: 24px;
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

.note {
  margin-top: 24px;
  padding: 12px;
  background: #472d3c;
  border: 1px solid #5e3643;
  font-style: italic;
}
</style>