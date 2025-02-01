// src/stores/desktop.js
import { defineStore } from 'pinia'
import { config } from '@/config/data'
import { soundManager } from '@/utils/sound'

export const useDesktopStore = defineStore('desktop', {
  state: () => ({
    windows: [],
    startMenuOpen: false,
    icons: config.desktopIcons
  }),
  
  actions: {
    toggleStartMenu() {
      soundManager.playSound('/sounds/click.wav')
      this.startMenuOpen = !this.startMenuOpen
    },
    
    openWindow(windowId, options = {}) {
      soundManager.playSound('/sounds/click.wav')
      
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

      // Calcular el z-index más alto actual
      const maxZ = Math.max(...this.windows.map(w => w.zIndex), 0)
      const offset = this.windows.length * 30
      
      this.windows.push({
        id: windowId,
        title: options.title,
        type: options.type,
        content: options.content,
        position: { 
          x: 100 + offset,
          y: 100 + offset 
        },
        size: { 
          width: options.type === 'document' ? 800 : 600,
          height: options.type === 'document' ? 600 : 400 
        },
        minimized: false,
        maximized: false,
        zIndex: maxZ + 1
      })

      this.bringToFront(windowId)
    },
    
    closeWindow(windowId) {
      soundManager.playSound('/sounds/click.wav')
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
      soundManager.playSound('/sounds/click.wav')
      const window = this.windows.find(w => w.id === windowId)
      if (window) {
        window.maximized = !window.maximized
      }
    },
    
    minimizeWindow(windowId) {
      soundManager.playSound('/sounds/click.wav')
      const window = this.windows.find(w => w.id === windowId)
      if (window) {
        window.minimized = !window.minimized
      }
    }
  }
})