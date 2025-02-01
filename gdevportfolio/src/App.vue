<template>
  <div class="desktop" 
       :style="{ backgroundColor: colors.background }"
       @click="handleGlobalClick">
    <div class="desktop-content">
      <template v-for="icon in icons" :key="icon.id">
        <DesktopIcon :icon="icon" />
      </template>
      
      <template v-for="window in windows" :key="window.id">
        <WindowModal 
          v-if="!window.minimized"
          :window="window" 
        />
      </template>
    </div>
    <TaskBar />
  </div>
</template>

<script setup>
import { useDesktopStore } from './stores/desktop'
import { storeToRefs } from 'pinia'
import TaskBar from './components/TaskBar.vue'
import DesktopIcon from './components/DesktopIcon.vue'
import WindowModal from './components/WindowModal.vue'

const store = useDesktopStore()
const { icons, windows } = storeToRefs(store)
import { soundManager } from '@/utils/sound.js'

// Definimos los colores base de nuestra paleta
const colors = {
  background: '#3c5956',
  primary: '#472d3c',
  secondary: '#5e3643',
  accent: '#eea160',
  text: '#f4cca1'
}

// Audio setup
const handleGlobalClick = () => {
  soundManager.playSound('/sounds/click.wav')
}
</script>

<style>
/* Reset básico y estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  image-rendering: pixelated;
}

.desktop {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.desktop-content {
  width: 100%;
  height: calc(100% - 40px); /* Altura total menos la barra de tareas */
  position: relative;
}

/* Estilos para que las fuentes sean pixel perfect */
@font-face {
  font-family: 'PixelFont';
  src: url('@/assets/fonts/PressStart2P-Regular.ttf') format('truetype');
}

body {
  font-family: 'PixelFont', monospace;
  font-size: 12px;
  line-height: 1.2;
  overflow: hidden;
}
</style>