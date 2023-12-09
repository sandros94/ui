<template>
  <SHeader :links="links" :socials="socials" sticky disable-socials />
  <SMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </SMain>
</template>

<script setup lang="ts">
import type { Link } from '#s94-ui/types'

const links: Link[] = [
  {
    label: 'HOME',
    to: '/'
  }, {
    label: 'sandros94/ui',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/sandros94/ui',
    target: '_blank'
  }, {
    label: 'Sandros94',
    to: 'https://github.com/sandros94',
    target: '_blank'
  }
]

const socials: Link[] = [
  {
    icon: 'i-simple-icons-github',
    to: 'https://github.com/sandros94/ui',
    target: '_blank'
  }
]
</script>
