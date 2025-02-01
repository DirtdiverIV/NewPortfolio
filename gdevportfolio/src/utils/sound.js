// src/utils/sound.js
import { ref } from 'vue'

class SoundManager {
  constructor() {
    // Estado reactivo
    this._muted = ref(localStorage.getItem('isMuted') === 'true')
  }

  toggleMute() {
    this._muted.value = !this._muted.value
    localStorage.setItem('isMuted', this._muted.value)
  }

  isMuted() {
    return this._muted.value
  }

  playSound(soundPath) {
    if (this._muted.value) return
    const audio = new Audio(soundPath)
    audio.play()
  }
}

export const soundManager = new SoundManager()