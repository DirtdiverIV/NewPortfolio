//src/components/TaskBar.vue
<template>
  <div class="taskbar">
    <div class="start-section">
      <button 
        class="start-button pixel-font"
        @click="toggleStartMenu"
        :class="{ 'active': startMenuOpen }"
      >
        Inicio
      </button>
      
      <!-- Start Menu -->
      <div v-if="startMenuOpen" class="start-menu">
        <div class="menu-items">
          <div v-for="icon in icons" 
               :key="icon.id"
               class="menu-item pixel-font"
               @click="handleMenuClick(icon)">
            <img :src="icon.icon" :alt="icon.title" />
            <span>{{ icon.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Open Windows -->
    <div class="open-windows">
      <button 
        v-for="window in windows"
        :key="window.id"
        class="window-button pixel-font"
        :class="{ 'active': !window.minimized }"
        @click="toggleWindow(window)"
      >
        {{ window.title }}
      </button>
    </div>

    <!-- Clock -->
    <div class="time pixel-font">
      {{ currentTime }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDesktopStore } from '@/stores/desktop'
import { storeToRefs } from 'pinia'

const store = useDesktopStore()
const { windows, icons, startMenuOpen } = storeToRefs(store)

const currentTime = ref('00:00')
let timeInterval

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

const toggleStartMenu = () => {
  store.toggleStartMenu()
}

const handleMenuClick = (icon) => {
  if (icon.type === 'link') {
    window.open(icon.url, '_blank')
  } else {
    store.openWindow(icon.id)
  }
  store.toggleStartMenu()
}

const toggleWindow = (window) => {
  store.minimizeWindow(window.id)
  if (window.minimized) {
    store.bringToFront(window.id)
  }
}
</script>

<style scoped>
.pixel-font {
  font-family: 'PixelFont', monospace;
}

.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #472d3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-top: 2px solid #f4cca1;
  z-index: 9999;
}

.start-section {
  position: relative;
}

.start-button {
  padding: 4px 12px;
  background-color: #5e3643;
  border: 1px solid #f4cca1;
  color: #f4cca1;
  cursor: pointer;
  image-rendering: pixelated;
}

.start-button.active {
  background-color: #7a444a;
}

.start-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  background-color: #472d3c;
  border: 2px solid #f4cca1;
  padding: 8px;
  min-width: 200px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 8px;
  color: #f4cca1;
  cursor: pointer;
  gap: 8px;
}

.menu-item:hover {
  background-color: #5e3643;
}

.menu-item img {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}

.open-windows {
  display: flex;
  gap: 4px;
  flex: 1;
  margin: 0 16px;
  overflow-x: hidden;
}

.window-button {
  padding: 4px 8px;
  background-color: #5e3643;
  border: 1px solid #f4cca1;
  color: #f4cca1;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.window-button.active {
  background-color: #7a444a;
}

.time {
  color: #f4cca1;
  padding: 4px 8px;
}
</style>