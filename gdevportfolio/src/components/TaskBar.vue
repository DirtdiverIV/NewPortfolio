//src/components/TaskBar.vue
<template>
  <div class="taskbar pixel-font">
    <!-- Start Section -->
    <div class="start-section">
      <button 
        class="start-button"
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
               class="menu-item"
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
        class="window-button"
        :class="{ 'active': !window.minimized }"
        @click="toggleWindow(window)"
      >
        {{ window.title }}
      </button>
    </div>

    <!-- System Tray -->
    <div class="system-tray">
      <!-- Network Status -->
      <button class="tray-icon" @click="toggleNetworkInfo" title="Estado del sistema">
        <img :src="config.systemIcons.network" alt="Red" />
        <div v-if="showNetworkInfo" class="info-popup network-info">
          <div class="info-item">
            <span>Resolución:</span> {{ networkInfo.resolution }}
          </div>
          <div class="info-item">
            <span>Zona Horaria:</span> {{ networkInfo.timeZone }}
          </div>
          <div class="info-item">
            <span>Idioma:</span> {{ networkInfo.language }}
          </div>
          <div class="info-item">
            <span>Sistema:</span> {{ networkInfo.platform }}
          </div>
        </div>
      </button>

      <!-- Sound Control -->
      <button class="tray-icon" @click="toggleSound" title="Sonido">
        <img :src="soundIcon" alt="Sonido" />
      </button>

      <!-- Clock -->
      <button class="time" @click="toggleCalendar">
        {{ currentTime }}
        <!-- Calendar Popup -->
        <div v-if="showCalendar" class="calendar-popup">
          <div class="calendar-header">
            {{ currentMonth }} {{ currentYear }}
          </div>
          <div class="calendar-days">
            <div class="day-names">
              <span v-for="day in ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']" 
                    :key="day">{{ day }}</span>
            </div>
            <div class="calendar-grid">
              <div v-for="date in calendarDates" 
                   :key="date.day"
                   :class="{ 
                     'calendar-day': true,
                     'current': date.current,
                     'other-month': !date.currentMonth 
                   }">
                {{ date.day }}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useDesktopStore } from '@/stores/desktop'
import { storeToRefs } from 'pinia'
import { config } from '@/config/data'
import { soundManager } from '@/utils/sound'

const store = useDesktopStore()
const { windows, icons, startMenuOpen } = storeToRefs(store)

// Time and Calendar
const currentTime = ref('00:00')
const showCalendar = ref(false)
let timeInterval

// Sound State
const soundIcon = computed(() =>
  soundManager.isMuted() ? config.systemIcons.soundMuted : config.systemIcons.sound
)

// Network Info
const showNetworkInfo = ref(false)
const networkInfo = ref({
  resolution: `${window.innerWidth}x${window.innerHeight}`,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  language: navigator.language,
  platform: navigator.platform
})

// Calendar Data
const currentMonth = computed(() => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return months[new Date().getMonth()]
})

const currentYear = computed(() => new Date().getFullYear())

const calendarDates = computed(() => {
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  
  let firstDayIndex = firstDay.getDay() - 1
  if (firstDayIndex === -1) firstDayIndex = 6

  const dates = []
  
  for (let i = firstDayIndex; i > 0; i--) {
    const date = new Date(firstDay)
    date.setDate(date.getDate() - i)
    dates.push({
      day: date.getDate(),
      current: false,
      currentMonth: false
    })
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push({
      day: i,
      current: i === today.getDate(),
      currentMonth: true
    })
  }
  
  return dates
})

// Event Handlers
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
  showNetworkInfo.value = false
}

const toggleSound = () => {
  soundManager.toggleMute()
  if (!soundManager.isMuted()) {
    soundManager.playSound('/sounds/click.wav')
  }
}

const toggleNetworkInfo = () => {
  showNetworkInfo.value = !showNetworkInfo.value
  showCalendar.value = false
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleGlobalClick = (event) => {
  const isCalendarClick = event.target.closest('.time')
  const isNetworkClick = event.target.closest('.tray-icon')
  
  if (!isCalendarClick) {
    showCalendar.value = false
  }
  if (!isNetworkClick) {
    showNetworkInfo.value = false
  }
}

// Lifecycle
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  document.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  clearInterval(timeInterval)
  document.removeEventListener('click', handleGlobalClick)
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
  font-family: 'PixelFont', monospace !important;
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

.start-button {
  padding: 4px 12px;
  background-color: #5e3643;
  border: 1px solid #f4cca1;
  color: #f4cca1;
  cursor: pointer;
  font-family: 'PixelFont', monospace !important;
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
  margin-bottom: 2px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 8px;
  cursor: pointer;
  color: #f4cca1;
}

.menu-item:hover {
  background-color: #5e3643;
}

.menu-item img {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}

.system-tray {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tray-icon {
  width: 24px;
  height: 24px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.tray-icon img {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}

.time {
  color: #f4cca1;
  padding: 4px 8px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  font-family: 'PixelFont', monospace !important;
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
  font-family: 'PixelFont', monospace !important;
}

.window-button.active {
  background-color: #7a444a;
}

.info-popup,
.calendar-popup {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #472d3c;
  border: 2px solid #f4cca1;
  padding: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  font-family: 'PixelFont', monospace !important;
}

.info-item {
  padding: 4px;
  color: #f4cca1;
  white-space: nowrap;
}

.info-item span {
  color: #eea160;
  margin-right: 8px;
}

/* Estilos del calendario */
.calendar-header {
  text-align: center;
  padding: 4px;
  color: #eea160;
  border-bottom: 1px solid #5e3643;
}

.day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin: 8px 0;
  color: #a0938e;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-day {
  padding: 4px;
  text-align: center;
  cursor: default;
}

.calendar-day.current {
  background: #5e3643;
  color: #eea160;
}

.calendar-day.other-month {
  color: #7d7071;
}

.open-windows {
  display: flex;
  gap: 4px;
  flex: 1;
  margin: 0 16px;
  overflow-x: hidden;
}

.start-section {
  position: relative;
}
</style>