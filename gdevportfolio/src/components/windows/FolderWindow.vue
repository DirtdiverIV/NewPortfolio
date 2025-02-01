//src/components/windows/FolderWindow.vue
<template>
  <div class="folder-container pixel-font">
    <!-- Barra de herramientas -->
    <div class="folder-toolbar">
      <div class="view-options">
        <button 
          class="view-btn"
          :class="{ active: viewMode === 'icons' }"
          @click="viewMode = 'icons'"
          title="Vista de iconos"
        >
          <img src="/icons/view-icons.png" alt="Vista de iconos" />
        </button>
        <button 
          class="view-btn"
          :class="{ active: viewMode === 'list' }"
          @click="viewMode = 'list'"
          title="Vista de lista"
        >
          <img src="/icons/view-list.png" alt="Vista de lista" />
        </button>
      </div>
      <div class="folder-path">
        {{ currentPath }}
      </div>
    </div>

    <!-- Lista de archivos -->
    <div class="folder-content" :class="viewMode">
      <div 
        v-for="item in folderItems" 
        :key="item.id" 
        class="folder-item"
        @click="openItem(item)"
      >
        <img :src="getItemIcon(item)" :alt="item.title" class="item-icon" />
        <div class="item-info">
          <span class="item-title">{{ item.title }}</span>
          <template v-if="viewMode === 'list'">
            <span class="item-date">{{ item.date }}</span>
            <span class="item-company">{{ item.company }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- Barra de estado -->
    <div class="folder-statusbar">
      {{ folderItems.length }} elemento(s)
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDesktopStore } from '@/stores/desktop'
import { config } from '@/config/data'

const props = defineProps({
  windowId: {
    type: String,
    required: true
  }
})

const store = useDesktopStore()
const viewMode = ref('icons')

const currentPath = computed(() => {
  switch(props.windowId) {
    case 'experience':
      return 'C:\\Experiencia'
    case 'education':
      return 'C:\\Formación'
    case 'projects':
      return 'C:\\Proyectos'
    default:
      return 'C:\\'
  }
})

const folderItems = computed(() => {
  switch(props.windowId) {
    case 'experience':
      return config.experience
    case 'education':
      return config.education
    case 'projects':
      return config.projects
    default:
      return []
  }
})

const getItemIcon = (item) => {
  // Si el item tiene un icono específico, lo usamos
  if (item.icon) return item.icon
  
  // Si no, asignamos uno según la extensión
  if (item.title.endsWith('.doc')) return config.systemIcons.document
  if (item.title.endsWith('.pdf')) return config.systemIcons.pdf
  return '/icons/file.png'
}

const openItem = (item) => {
  store.openWindow(`doc-${item.id}`, {
    title: item.title,
    type: 'document',
    content: item.content
  })
}
</script>

<style scoped>
.folder-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #302c2e;
  font-family: 'PixelFont', monospace;
}

.folder-toolbar {
  padding: 8px;
  border-bottom: 1px solid #5e3643;
  display: flex;
  gap: 16px;
  align-items: center;
  background: #472d3c;
}

.view-options {
  display: flex;
  gap: 4px;
}

.view-btn {
  width: 24px;
  height: 24px;
  padding: 2px;
  background: #472d3c;
  border: 1px solid #f4cca1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn img {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}

.view-btn.active {
  background: #5e3643;
}

.view-btn:hover {
  background: #7a444a;
}

.folder-path {
  color: #f4cca1;
  font-size: 12px;
}

.folder-content {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
}

.folder-content.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  padding: 16px;
}

.folder-content.icons .folder-item {
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.folder-content.icons .item-info {
  width: 90px;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
}

.folder-content.list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.folder-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border: 1px solid transparent;
}

.folder-content.list .folder-item {
  flex-direction: row;
  gap: 8px;
}

.folder-item:hover {
  background: #5e3643;
}

.folder-item.selected {
  background: #7a444a;
  border-color: #f4cca1;
}

.item-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
  image-rendering: pixelated;
}

.folder-content.list .item-icon {
  margin-bottom: 0;
}

.item-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.folder-content.list .item-info {
  flex-direction: row;
  gap: 16px;
}

.item-title {
  color: #f4cca1;
  font-size: 12px;
  text-align: center;
  word-wrap: break-word;
}

.folder-content.list .item-title {
  flex: 1;
  text-align: left;
}

.item-date, .item-company {
  color: #a0938e;
  font-size: 11px;
  width: 150px;
}

.folder-statusbar {
  padding: 4px 8px;
  background: #472d3c;
  color: #f4cca1;
  font-size: 11px;
  border-top: 1px solid #5e3643;
}
</style>