//src/directives/drag.js
export const vDrag = {
  mounted(el, binding) {
    const handler = binding.value || {}
    let startX, startY, initialMouseX, initialMouseY
    let isDragging = false

    const moveElement = (e) => {
      if (!isDragging) return
      
      e.preventDefault()
      const dx = e.clientX - initialMouseX
      const dy = e.clientY - initialMouseY
      
      const newX = Math.max(0, startX + dx)
      const newY = Math.max(0, startY + dy)
      
      el.style.left = `${newX}px`
      el.style.top = `${newY}px`
    }

    const stopDragging = () => {
      if (!isDragging) return
      
      isDragging = false
      document.removeEventListener('mousemove', moveElement)
      document.removeEventListener('mouseup', stopDragging)
      
      if (handler.onDragEnd) {
        const position = {
          x: parseInt(el.style.left),
          y: parseInt(el.style.top)
        }
        handler.onDragEnd(position)
      }
    }

    const startDragging = (e) => {
      // Solo permitir arrastre desde el elemento si no hay un controlador específico
      if (handler.dragHandle && !e.target.closest(handler.dragHandle)) {
        return
      }
      
      if (e.button !== 0) return // Solo botón izquierdo
      
      e.preventDefault()
      isDragging = true
      initialMouseX = e.clientX
      initialMouseY = e.clientY
      
      // Obtener la posición actual del elemento
      const style = window.getComputedStyle(el)
      startX = parseInt(style.left) || 0
      startY = parseInt(style.top) || 0

      // Llamar al handler de inicio si existe
      if (handler.onDragStart) {
        handler.onDragStart()
      }
      
      document.addEventListener('mousemove', moveElement)
      document.addEventListener('mouseup', stopDragging)
    }

    el.addEventListener('mousedown', startDragging)

    // Cleanup
    el._dragCleanup = () => {
      el.removeEventListener('mousedown', startDragging)
      document.removeEventListener('mousemove', moveElement)
      document.removeEventListener('mouseup', stopDragging)
    }
  },
  
  unmounted(el) {
    if (el._dragCleanup) {
      el._dragCleanup()
    }
  }
}