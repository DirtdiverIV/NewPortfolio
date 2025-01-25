// src/stores/desktop.js
import { defineStore } from 'pinia'

export const useDesktopStore = defineStore('desktop', {
  state: () => ({
    windows: [],
    startMenuOpen: false,
    icons: [
      {
        id: 'about',
        title: 'Sobre Mí',
        icon: '/icons/about.png',
        position: { x: 20, y: 20 },
        type: 'profile'
      },
      {
        id: 'experience',
        title: 'Experiencia',
        icon: '/icons/folder.png',
        position: { x: 20, y: 100 },
        type: 'folder'
      },
      {
        id: 'education',
        title: 'Formación',
        icon: '/icons/folder.png',
        position: { x: 20, y: 180 },
        type: 'folder'
      },
      {
        id: 'projects',
        title: 'Proyectos',
        icon: '/icons/folder.png',
        position: { x: 20, y: 260 },
        type: 'folder'
      },
      {
        id: 'email',
        title: 'Email',
        icon: '/icons/email.png',
        position: { x: 20, y: 340 },
        type: 'link',
        url: 'mailto:davidgomez.seg@gmail.com'
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        icon: '/icons/linkedin.png',
        position: { x: 20, y: 420 },
        type: 'link',
        url: 'https://www.linkedin.com/in/tu-perfil'
      }
    ]
  }),
  
  actions: {
    toggleStartMenu() {
      this.startMenuOpen = !this.startMenuOpen
    },
    
    openWindow(windowId, options = {}) {
      // Si es un icono del escritorio
      if (!options.type) {
        const icon = this.icons.find(i => i.id === windowId)
        if (!icon) return
        
        const existingWindow = this.windows.find(w => w.id === windowId)
        if (existingWindow) {
          existingWindow.minimized = false
          this.bringToFront(windowId)
          return
        }
        
        options = {
          title: icon.title,
          type: icon.type
        }
      }
      
      this.windows.push({
        id: windowId,
        title: options.title,
        type: options.type,
        content: options.content,
        position: { x: 100, y: 100 },
        size: { width: 600, height: 400 },
        minimized: false,
        maximized: false,
        zIndex: this.windows.length + 1
      })
    },
    
    closeWindow(windowId) {
      this.windows = this.windows.filter(w => w.id !== windowId)
    },
    
    bringToFront(windowId) {
      const maxZ = Math.max(...this.windows.map(w => w.zIndex), 0)
      const window = this.windows.find(w => w.id === windowId)
      if (window && window.zIndex !== maxZ + 1) {
        window.zIndex = maxZ + 1
      }
    },
    
    updateIconPosition(iconId, position) {
      const icon = this.icons.find(i => i.id === iconId)
      if (icon) {
        icon.position = position
      }
    },
    
    updateWindowPosition(windowId, position) {
      const window = this.windows.find(w => w.id === windowId)
      if (window && !window.maximized) {
        window.position = position
      }
    },
    
    toggleMaximize(windowId) {
      const window = this.windows.find(w => w.id === windowId)
      if (window) {
        window.maximized = !window.maximized
      }
    },
    
    minimizeWindow(windowId) {
      const window = this.windows.find(w => w.id === windowId)
      if (window) {
        window.minimized = !window.minimized
      }
    }
  }
})