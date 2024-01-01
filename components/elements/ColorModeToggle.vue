<template>
  <ClientOnly>
    <UToggle
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
      off-icon="i-ph-sun"
      on-icon="i-ph-moon"
      v-model="isDark"
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
