import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/fonts/PressStart2P-Regular.ttf'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')