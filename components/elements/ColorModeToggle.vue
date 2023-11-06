<template>
  <ClientOnly>
    <UToggle
      v-model="isDark"
      on-icon="i-ph-moon"
      off-icon="i-ph-sun"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>
