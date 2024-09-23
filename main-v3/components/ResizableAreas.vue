<template>
  <div class="flex h-screen">
    <div ref="leftPane" class="bg-gray-200 p-4" :style="{ width: leftWidth + '%' }">
      <h2 class="text-lg font-bold mb-2">
        Left Pane
      </h2>
      <p>Resize me by dragging the handle!</p>
    </div>
    <div
      ref="resizeHandle"
      class="w-1 bg-gray-400 cursor-col-resize hover:bg-blue-500 transition-colors"
      @mousedown="startResize"
    />
    <div ref="rightPane" class="bg-gray-300 p-4 flex-grow">
      <h2 class="text-lg font-bold mb-2">
        Right Pane
      </h2>
      <p>I will adjust my size automatically!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const leftPane = ref(null)
const rightPane = ref(null)
const resizeHandle = ref(null)
const leftWidth = ref(50) // Initial width of the left pane (50%)

const startResize = (e) => {
  e.preventDefault()
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

const resize = (e) => {
  if (!leftPane.value) return
  const containerWidth = leftPane.value.parentElement.clientWidth
  const newLeftWidth = (e.clientX / containerWidth) * 100
  leftWidth.value = Math.max(10, Math.min(90, newLeftWidth)) // Limit between 10% and 90%
}

const stopResize = () => {
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

onMounted(() => {
  if (resizeHandle.value) {
    resizeHandle.value.addEventListener('mousedown', startResize)
  }
})

onUnmounted(() => {
  if (resizeHandle.value) {
    resizeHandle.value.removeEventListener('mousedown', startResize)
  }
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
})
</script>
