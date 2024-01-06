<template>
  <div class="mx-auto h-full w-full">
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
          }
        ]"
        headline="Welcome to s94/ui"
        horizontal
        subhead="This is a custom Nuxt layer that extends Nuxt UI's components."
      >
        <img alt="Hero image" src="https://cms.thetouchofficial.com/assets/071702b5-1a55-45d2-b81a-6ddd8d3fa707?withoutEnlargement=true&width=1920&format=webp&fit=outside">
      </SHero>
      <SLinksGroup :links="linksGroup" v-slot="{ linksGroup: links }">
        {{ links.name }} {{ links.links }}
      </SLinksGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LinksGroup } from '#s94-ui/types'

const isVisible = useState('link-is-visible', () => false)
const linksGroup = useState<LinksGroup[] | undefined>('linksGroup', () => undefined)
</script>
