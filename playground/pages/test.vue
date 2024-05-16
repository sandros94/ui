<template>
  <div>
    <SHero
      :cta="[
        {
          label: 'Install it now',
          size: 'xl',
          trailingIcon: 'i-ph-arrow-right',
        },
      ]"
      headline="Welcome to s94/ui"
      subhead="This is a custom Nuxt layer that extends Nuxt UI's components."
      variant="opening"
      img="https://cms.thetouchofficial.com/assets/071702b5-1a55-45d2-b81a-6ddd8d3fa707?withoutEnlargement=true&width=1920&format=webp&fit=outside"
      img-alt="Hero image"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'test',
})
</script>
