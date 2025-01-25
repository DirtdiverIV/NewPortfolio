//src/components/WindowModal.vue
<template>
  <div 
    class="window-modal"
    :class="{ 'maximized': window.maximized }"
    :style="windowStyle"
    @mousedown="bringToFront"
    v-drag="dragOptions"
  >
    <!-- Barra de título -->
    <div 
      class="window-titlebar pixel-font"
      ref="titleBar"
    >
      <div class="title">{{ window.title }}</div>
      <div class="window-controls">
        <button class="control-btn minimize" @click="minimize">
          <img src="/icons/minimize.png" alt="minimize" />
        </button>
        <button class="control-btn maximize" @click="toggleMaximize">
          <img src="/icons/maximize.png" alt="maximize" />
        </button>
        <button class="control-btn close" @click="close">
          <img src="/icons/close.png" alt="close" />
        </button>
      </div>
    </div>

    <!-- Contenido de la ventana -->
    <div class="window-content">
      <component 
        :is="contentComponent"
        v-bind="contentProps"
      />
    </div>

    <!-- Esquinas para redimensionar -->
    <div v-if="!window.maximized" class="resize-handles">
      <div class="resize-handle top-left"></div>
      <div class="resize-handle top-right"></div>
      <div class="resize-handle bottom-left"></div>
      <div class="resize-handle bottom-right"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useDesktopStore } from '@/stores/desktop'
import { vDrag } from '@/directives/drag'

const props = defineProps({
  window: {
    type: Object,
    required: true
  }
})

const store = useDesktopStore()

// Carga dinámica de componentes según el tipo
const contentComponent = computed(() => {
  switch(props.window.type) {
    case 'profile':
      return defineAsyncComponent(() => import('./windows/ProfileWindow.vue'))
    case 'folder':
      return defineAsyncComponent(() => import('./windows/FolderWindow.vue'))
    case 'document':
      return defineAsyncComponent(() => import('./windows/DocumentWindow.vue'))
    default:
      return defineAsyncComponent(() => import('./windows/DefaultWindow.vue'))
  }
})

const contentProps = computed(() => ({
  windowId: props.window.id,
  content: props.window.content
}))

const windowStyle = computed(() => {
  if (props.window.maximized) {
    return {
      width: '100%',
      height: 'calc(100% - 40px)', // Altura total menos la barra de tareas
      left: '0',
      top: '0',
      zIndex: props.window.zIndex
    }
  }
  
  return {
    width: `${props.window.size.width}px`,
    height: `${props.window.size.height}px`,
    left: `${props.window.position.x}px`,
    top: `${props.window.position.y}px`,
    zIndex: props.window.zIndex
  }
})

const dragOptions = computed(() => ({
  onDragEnd: (position) => {
    if (!props.window.maximized) {
      store.updateWindowPosition(props.window.id, position)
    }
  },
  dragHandle: '.window-titlebar'
}))

const bringToFront = () => {
  store.bringToFront(props.window.id)
}

const minimize = () => {
  const clickSound = new Audio('/sounds/click.wav')
  clickSound.play()
  store.minimizeWindow(props.window.id)
}

const toggleMaximize = () => {
  const clickSound = new Audio('/sounds/click.wav')
  clickSound.play()
  store.toggleMaximize(props.window.id)
}

const close = () => {
  const clickSound = new Audio('/sounds/click.wav')
  clickSound.play()
  store.closeWindow(props.window.id)
}
</script>

<style scoped>
.pixel-font {
  font-family: 'PixelFont', monospace;
}

.window-modal {
  position: absolute;
  background: #472d3c;
  border: 2px solid #f4cca1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 150px;
}

.window-titlebar {
  background: #5e3643;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  cursor: move;
  color: #f4cca1;
  user-select: none;
}

.window-controls {
  display: flex;
  gap: 2px;
}

.control-btn {
  width: 16px;
  height: 16px;
  border: 1px solid #f4cca1;
  background: #472d3c;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.control-btn img {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}

.control-btn:hover {
  background: #7a444a;
}

.window-content {
  flex: 1;
  overflow: auto;
  padding: 8px;
  background: #302c2e;
}

.resize-handles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #f4cca1;
  pointer-events: auto;
  cursor: pointer;
}

.top-left {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.top-right {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.bottom-left {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.bottom-right {
  bottom: -3px;
  right: -3px;
  cursor: se-resize;
}

.maximized {
  border: none;
}
</style>