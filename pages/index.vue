<template>
  <div class="w-full min-h-[inherit] grid place-items-center">
    <div>
      <!-- Component to be tested -->
      <SHero headline="Welcome to s94/ui" subhead="This is a custom Nuxt layer that extends Nuxt UI's components." :cta="[{label: 'Get yours now', trailingIcon: 'i-ph-arrow-right'}, {label: 'More info', color: 'gray', trailingIcon: 'i-ph-question'}]" horizontal>
        <img src="https://cms.thetouchofficial.com/assets/071702b5-1a55-45d2-b81a-6ddd8d3fa707?withoutEnlargement=true&width=1920&format=webp&fit=outside" alt="Hero image">
      </SHero>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
