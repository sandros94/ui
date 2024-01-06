<template>
  <SHeader
    :links="links"
    :socials="socials"
    disable-socials
    sticky
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Links, LinksGroup } from '#s94-ui/types'

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
  {
    icon: 'i-simple-icons-mastodon',
    target: '_blank',
    to: 'https://mastodon.social/@sandros94',
  },
  {
    icon: 'i-simple-icons-twitch',
    target: '_blank',
    to: 'https://www.twitch.tv/sandros94',
  },
  {
    icon: 'i-simple-icons-youtube',
    target: '_blank',
    to: 'https://www.youtube.com/@sandros94',
  },
]

socialsState.value = socials

const otherLinksState = useState<LinksGroup[] | undefined>('linksGroup', () => undefined)

const otherLinks: LinksGroup[] = [
  {
    label: 'Navigation',
    links: [
      {
        label: 'Home',
        to: '/',
      },
      {
        label: 'Shop',
        target: '_blank',
        to: '/shop',
      },
      {
        label: 'About',
        to: '/about',
      },
      {
        label: 'Contact',
        to: '/contact',
      },
    ],
  },
  {
    label: 'Legal',
    links: [
      {
        label: 'Privacy Policy',
        to: '/privacy-policy',
      },
      {
        label: 'Terms of Use',
        to: '/terms-of-use',
      },
    ],
  },
]

otherLinksState.value = otherLinks
</script>
