//src/components/DesktopIcon.vue
<template>
  <div 
    class="desktop-icon" 
    :style="{ 
      left: `${icon.position.x}px`, 
      top: `${icon.position.y}px` 
    }"
    @click="handleClick"
    v-drag="dragOptions"
  >
    <div class="icon-image">
      <img :src="icon.icon" :alt="icon.title" />
    </div>
    <div class="icon-title">{{ icon.title }}</div>
  </div>
</template>

<script setup>
import { vDrag } from '@/directives/drag'
import { useDesktopStore } from '@/stores/desktop'
import { computed } from 'vue'
import { soundManager } from '@/utils/sound'

const props = defineProps({
  icon: {
    type: Object,
    required: true
  }
})

const store = useDesktopStore()

const dragOptions = computed(() => ({
  onDragStart: () => {
    soundManager.playSound('/sounds/grab.wav')
  },
  onDragEnd: (position) => {
    soundManager.playSound('/sounds/drop.wav')
    store.updateIconPosition(props.icon.id, position)
  }
}))

const handleClick = () => {
  soundManager.playSound('/sounds/click.wav')
  
  if (props.icon.type === 'link') {
    window.open(props.icon.url, '_blank')
  } else {
    store.openWindow(props.icon.id)
  }
}
</script>

<style scoped>
.desktop-icon {
  position: absolute;
  width: 64px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 4px;
}

.desktop-icon:hover {
  background: rgba(255, 255, 255, 0.1);
}

.icon-image {
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
}

.icon-image img {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}

.icon-title {
  color: #f4cca1;
  text-align: center;
  font-size: 12px;
  word-wrap: break-word;
  text-shadow: 1px 1px 1px #000;
  font-family: 'PixelFont', monospace;
}

.desktop-icon:hover .icon-title {
  color: #eea160;
}
</style>