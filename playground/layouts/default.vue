<template>
  <div>
    <SMain>
      <slot />
    </SMain>
    <SFooter
      :divider-avatar="{ src: 'https://avatars.githubusercontent.com/u/13056429?v=4', size: 'lg' }"
      :links="linksGroup"
      :socials="socials"
    >
      <template #legal>
        <div>
          © 1994-{{ new Date().getFullYear() }}, Made by
          <NuxtLink class="underline underline-offset-2" target="_blank" to="https://github.com/sandros94">
            Sandros94
          </NuxtLink>
        </div>
      </template>
    </SFooter>
  </div>
</template>

<script setup lang="ts">
import type { Links, LinksGroup } from '#s94-ui/types'

const socials = useState<Links | undefined>('socials')

const linksGroup = useState<LinksGroup[] | undefined>('linksGroup', () => undefined)
const linksGroupDefined: LinksGroup[] = [
  {
    links: [
      {
        label: 'Home',
        target: '_blank',
        to: '/',
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
    name: 'Navigation',
  },
  {
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
    name: 'Legal',
  },
]

linksGroup.value = linksGroupDefined
</script>
