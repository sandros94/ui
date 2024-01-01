<template>
  <SHeader
    :links="links"
    :socials="socials"
    disable-socials
    sticky
  />
  <SMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </SMain>
</template>

<script setup lang="ts">
import type { Link } from '#s94-ui/types'

const isVisible = useState('link-is-visible', () => false)

const links: Link[] = [
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

const socials: Link[] = [
  {
    icon: 'i-simple-icons-github',
    target: '_blank',
    to: 'https://github.com/sandros94/ui',
  },
]
</script>
