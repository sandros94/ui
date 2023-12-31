<template>
  <div class="h-full w-full mx-auto">
    <div>
      <!-- Component to be tested -->
      <span class="w-full inline-flex justify-center gap-x-4">
        <p>Show Link</p>
        <UToggle v-model="isVisible" />
      </span>
      <SHero headline="Welcome to s94/ui" subhead="This is a custom Nuxt layer that extends Nuxt UI's components." :cta="[{label: 'Install it now', trailingIcon: 'i-ph-arrow-right'}, {label: 'More info', color: 'gray', trailingIcon: 'i-ph-question'}]" horizontal>
        <img src="https://cms.thetouchofficial.com/assets/071702b5-1a55-45d2-b81a-6ddd8d3fa707?withoutEnlargement=true&width=1920&format=webp&fit=outside" alt="Hero image">
      </SHero>
    </div>
  </div>
</template>

<script setup lang="ts">
const isVisible = useState('link-is-visible', () => false)
</script>
