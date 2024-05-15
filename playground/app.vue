<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Links, LinksGroup } from '#s94-ui/types'

const linksState = useState<Links | undefined>('links', () => undefined)
const socialsState = useState<Links | undefined>('socials', () => undefined)
const linksGroupState = useState<LinksGroup[] | undefined>('linksGroup', () => undefined)

callOnce(() => {
  const links: Links = [
    {
      label: 'HOME',
      to: '/',
    }, {
      icon: 'i-simple-icons-github',
      label: 'sandros94/ui',
      target: '_blank',
      to: 'https://github.com/sandros94/ui',
    },
  ]

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

  const linksGroup: LinksGroup[] = [
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

  linksState.value = links
  socialsState.value = socials
  linksGroupState.value = linksGroup
})
</script>
