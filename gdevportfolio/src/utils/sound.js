// src/utils/sound.js
class SoundManager {
    constructor() {
      this.muted = localStorage.getItem('isMuted') === 'true'
      this.sounds = new Map()
    }
  
    toggleMute() {
      this.muted = !this.muted
      localStorage.setItem('isMuted', this.muted.toString())
      
      // Mutear todos los sonidos existentes
      this.sounds.forEach(sound => {
        sound.muted = this.muted
      })
    }
  
    playSound(soundPath) {
      // Reutilizar la instancia de audio si ya existe
      let sound = this.sounds.get(soundPath)
      if (!sound) {
        sound = new Audio(soundPath)
        this.sounds.set(soundPath, sound)
      }
  
      sound.muted = this.muted
      sound.currentTime = 0 // Reiniciar el sonido si ya estaba reproduciéndose
      sound.play()
    }
  
    isMuted() {
      return this.muted
    }
  }
  
  export const soundManager = new SoundManager()