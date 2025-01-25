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
          <img src="/icons/view-icons.png" alt="Vista de iconos" class="view-icon" />
        </button>
        <button 
          class="view-btn"
          :class="{ active: viewMode === 'list' }"
          @click="viewMode = 'list'"
          title="Vista de lista"
        >
          <img src="/icons/view-list.png" alt="Vista de lista" class="view-icon" />
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
        @dblclick="openItem(item)"
        @click="selectItem(item)"
        :class="{ selected: selectedItem?.id === item.id }"
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

const props = defineProps({
  windowId: {
    type: String,
    required: true
  }
})

const store = useDesktopStore()
const viewMode = ref('icons')
const selectedItem = ref(null)

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
      return [
        { 
          id: 'exp1', 
          title: 'Full Stack Web Developer.doc', 
          icon: '/icons/doc.png',
          company: 'Freelance',
          date: 'Oct 2023 - Feb 2024',
          content: {
            role: 'Full Stack Web Developer',
            company: 'Freelance',
            period: 'Octubre 2023 - Febrero 2024',
            projects: [
              'Plataforma de retransmisión de eventos en vivo',
              'Plataforma de juegos adultos',
              'Plataforma de juegos pedagógicos'
            ],
            technologies: ['Angular', 'Firebase', 'Git', 'Trello', 'CDN de video', 'Android', 'iOS'],
            links: {
              company: {
                title: 'Ver Perfil',
                url: 'https://linkedin.com/company/freelance'
              }
            }
          }
        },
        { 
          id: 'exp2', 
          title: 'Frontend Developer Nealia.doc', 
          icon: '/icons/doc.png',
          company: 'Nealia Consulting',
          date: 'Feb 2024 - Mar 2024',
          content: {
            role: 'Front-End Web Developer',
            company: 'Nealia Consulting',
            period: 'Febrero 2024 - Marzo 2024',
            description: 'Desarrollo Frontend con React y React PDF',
            note: 'Detalles omitidos por NDA',
            links: {
              company: {
                title: 'Nealia Consulting',
                url: 'https://linkedin.com/company/nealia-consulting'
              }
            }
          }
        },
        { 
          id: 'exp3', 
          title: 'Frontend Developer Aracnosoft.doc', 
          icon: '/icons/doc.png',
          company: 'Aracnosoft S.L',
          date: 'Mar 2024 - Actualidad',
          content: {
            role: 'Front-End Web Developer',
            company: 'Aracnosoft S.L',
            period: 'Marzo 2024 - Actualidad',
            technologies: ['Vue 3', 'Prime-Vue', 'WebScrapping', 'C#', 'Selenium', 'PostgreSQL'],
            note: 'Detalles omitidos por NDA',
            links: {
              company: {
                title: 'Aracnosoft S.L',
                url: 'https://linkedin.com/company/aracnosoft'
              }
            }
          }
        }
      ]
    case 'education':
      return [
        { 
          id: 'edu1', 
          title: 'Bootcamp Full-Stack.doc', 
          icon: '/icons/doc.png',
          institution: 'Factoria F5',
          date: 'Abr 2023 - Oct 2023',
          content: {
            program: 'Bootcamp Desarrollador Full-Stack',
            institution: 'Factoria F5',
            period: 'Abril 2023 - Octubre 2023',
            duration: '850 horas',
            technologies: [
              'Angular', 'Springboot', 'SQL', 'API Rest', 
              'Bootstrap', 'Jira', 'Confluence', 'Figma', 
              'Git', 'node.js'
            ],
            funding: 'Financiado por NTT DATA'
          }
        }
      ]
    case 'projects':
      return [
        { 
          id: 'proj1', 
          title: 'Plataforma Streaming.pdf', 
          icon: '/icons/pdf.png',
          date: '2024',
          content: {
            title: 'Plataforma de Streaming',
            description: 'Plataforma de retransmisión de eventos en vivo',
            technologies: ['Angular', 'Firebase', 'Git', 'Trello', 'CDN de video'],
            images: [
              {
                url: '/projects/streaming1.png',
                description: 'Panel de control de streaming'
              },
              {
                url: '/projects/streaming2.png',
                description: 'Interfaz del reproductor'
              }
            ],
            links: {
              demo: {
                title: 'Ver Demo',
                url: 'https://streaming-demo.davidgdev.es'
              },
              github: {
                title: 'Código Fuente',
                url: 'https://github.com/davidgdev/streaming-platform'
              }
            }
          }
        },
        { 
          id: 'proj2', 
          title: 'Plataforma Juegos.pdf', 
          icon: '/icons/pdf.png',
          date: '2023',
          content: {
            title: 'Plataforma de Juegos',
            description: 'Plataforma de juegos pedagógicos multiplataforma',
            technologies: ['Angular', 'Firebase', 'Git', 'Android', 'iOS'],
            images: [
              {
                url: '/projects/games1.png',
                description: 'Pantalla principal de juegos'
              },
              {
                url: '/projects/games2.png',
                description: 'Ejemplo de juego educativo'
              },
              {
                url: '/projects/games3.png',
                description: 'Versión móvil'
              }
            ],
            links: {
              demo: {
                title: 'Ver Demo',
                url: 'https://games-demo.davidgdev.es'
              },
              github: {
                title: 'Código Fuente',
                url: 'https://github.com/davidgdev/educational-games'
              }
            }
          }
        }
      ]
    default:
      return []
  }
})

const getItemIcon = (item) => {
  // Si el item tiene un icono específico, lo usamos
  if (item.icon) return item.icon
  
  // Si no, asignamos uno según la extensión
  if (item.title.endsWith('.doc')) return '/icons/doc.png'
  if (item.title.endsWith('.pdf')) return '/icons/pdf.png'
  return '/icons/file.png'
}

const selectItem = (item) => {
  selectedItem.value = item
}

const openItem = (item) => {
  // Reproducir sonido de doble clic
  const clickSound = new Audio('/sounds/double-click.wav')
  clickSound.play()

  // Crear una nueva ventana con el contenido del documento
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

.view-icon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}

.view-btn.active {
  background: #5e3643;
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