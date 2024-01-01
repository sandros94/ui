<template>
  <ClientOnly>
    <UButton
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
      :icon="isDark ? 'i-ph-moon' : 'i-ph-sun'"
      @click="isDark = !isDark"
      color="gray"
      variant="ghost"
    />
    <template #fallback>
      <div class="h-8 w-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>
