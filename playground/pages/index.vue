<template>
  <div class="size-full">
    <div>
      <!-- Component to be tested -->
      <SHero
        :cta="[
          {
            label: 'Install it now',
            trailingIcon: 'i-ph-arrow-right',
          },
          {
            label: isVisible ? 'Less info' : 'More info',
            color: 'gray',
            trailingIcon: 'i-ph-question',
            click: () => isVisible = !isVisible,
          },
        ]"
        headline="Welcome to s94/ui"
        horizontal
        subhead="This is a custom Nuxt layer that extends Nuxt UI's components."
      >
        <img alt="Hero image" src="https://cms.thetouchofficial.com/assets/071702b5-1a55-45d2-b81a-6ddd8d3fa707?withoutEnlargement=true&width=1920&format=webp&fit=outside">
      </SHero>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: add lorem ipsum conditional text as an example
const isVisible = useState('content-is-visible', () => false)
</script>
