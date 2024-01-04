<template>
  <SHeader
    :links="links"
    :socials="socials"
    disable-socials
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Links } from '#s94-ui/types'

const isVisible = useState('link-is-visible', () => false)

const links: Links = [
  {
    label: 'HOME',
    to: '/',
  }, {
    icon: 'i-simple-icons-github',
    label: 'sandros94/ui',
    target: '_blank',
    to: 'https://github.com/sandros94/ui',
  }, {
    if: () => isVisible.value,
    label: 'Sandros94',
    target: '_blank',
    to: 'https://github.com/sandros94',
  },
]

const socialsState = useState<Links | undefined>('socials', () => undefined)

const socials: Links = [
  {
    icon: 'i-simple-icons-github',
    target: '_blank',
    to: 'https://github.com/sandros94/ui',
  },
]

socialsState.value = socials
</script>
