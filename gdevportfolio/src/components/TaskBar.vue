//src/components/TaskBar.vue
<template>
  <div class="taskbar">
    <!-- Start Section -->
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

    <!-- System Tray -->
    <div class="system-tray">
      <!-- Network Status -->
      <button class="tray-icon" @click="toggleNetworkInfo" title="Estado de red">
        <img :src="'/icons/network.png'" alt="Red" />
        <div v-if="showNetworkInfo" class="info-popup network-info pixel-font">
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
      <button class="time pixel-font" @click="toggleCalendar">
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

const store = useDesktopStore()
const { windows, icons, startMenuOpen } = storeToRefs(store)

// Time and Calendar
const currentTime = ref('00:00')
const showCalendar = ref(false)
let timeInterval

// Sound State
const isMuted = ref(false)
const soundIcon = computed(() => 
  isMuted.value ? '/icons/sound-muted.png' : '/icons/sound.png'
)

// Network Info
const showNetworkInfo = ref(false)
const networkInfo = ref({
  ip: 'Cargando...',
  location: 'Cargando...'
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
  
  // Ajustar para que la semana empiece en lunes (0 = lunes, 6 = domingo)
  let firstDayIndex = firstDay.getDay() - 1
  if (firstDayIndex === -1) firstDayIndex = 6

  const dates = []
  
  // Días del mes anterior
  for (let i = firstDayIndex; i > 0; i--) {
    const date = new Date(firstDay)
    date.setDate(date.getDate() - i)
    dates.push({
      day: date.getDate(),
      current: false,
      currentMonth: false
    })
  }
  
  // Días del mes actual
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push({
      day: i,
      current: i === today.getDate(),
      currentMonth: true
    })
  }
  
  return dates
})

// Network Functions
const fetchNetworkInfo = async () => {
  try {
    const response = await fetch('https://ip-api.com/json/')
    const data = await response.json()
    networkInfo.value = {
      ip: data.query,
      location: `${data.city}, ${data.country}`
    }
  } catch (error) {
    networkInfo.value = {
      ip: 'No disponible',
      location: 'No disponible'
    }
  }
}

// Event Handlers
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
  showNetworkInfo.value = false
}

const toggleSound = () => {
  isMuted.value = !isMuted.value
  // Guardar el estado en localStorage para mantenerlo entre recargas
  localStorage.setItem('isMuted', isMuted.value.toString())
  
  // Modificar el contexto de audio global
  const clickSound = new Audio('/sounds/click.wav')
  clickSound.muted = isMuted.value
  
  // Guardar el estado para que otros componentes lo consulten
  window.isSoundMuted = isMuted.value
}

const toggleNetworkInfo = () => {
  showNetworkInfo.value = !showNetworkInfo.value
  showCalendar.value = false
  if (showNetworkInfo.value) {
    fetchNetworkInfo()
  }
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
}

/* Calendar Styles */
.calendar-popup {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #472d3c;
  border: 2px solid #f4cca1;
  padding: 8px;
  margin-bottom: 8px;
  min-width: 250px;
}

.calendar-header {
  text-align: center;
  padding: 4px;
  border-bottom: 1px solid #5e3643;
  color: #eea160;
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

/* Network Info Popup */
.info-popup {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #472d3c;
  border: 2px solid #f4cca1;
  padding: 8px;
  margin-bottom: 8px;
  min-width: 200px;
}

.info-item {
  padding: 4px;
  color: #f4cca1;
}

.info-item span {
  color: #eea160;
  margin-right: 8px;
}
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