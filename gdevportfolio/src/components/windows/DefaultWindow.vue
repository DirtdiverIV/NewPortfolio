<template>
    <div class="default-container">
      <div class="default-content">
        <p>No se ha podido cargar el contenido de esta ventana.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    windowId: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .default-container {
    padding: 16px;
    color: #f4cca1;
  }
  
  .default-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  </style>