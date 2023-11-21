Example of using the `SLinks` component.

Use `links` prop to define the links to be rendered. Same goes for `socials` prop.

Use `vertical` prop to define a vertical instance.

Use `disable-socials` to only show `socials` links in the menu when on mobile.

```vue
<template>
  <div class="w-full h-full grid place-items-start">
    <!-- Component to be tested -->
    <SHeader class="w-full" :links="links" :socials="socials" disable-socials />
  </div>
</template>

<script setup lang="ts">
import type { Link } from '#s94-ui/types'

const links: Link[] = [
  {
    label: 'HOME',
    to: '/'
  }, {
    label: 'Google',
    to: 'https://google.com',
    target: '_blank'
  }, {
    label: 'GUNSweek',
    to: 'https://gunsweek.com',
    target: '_blank'
  }
]

const socials: Link[] = [
  {
    icon: 'i-simple-icons-instagram',
    to: 'https://instagram.com'
  }, {
    icon: 'i-simple-icons-x',
    to: 'https://twitter.com'
  }, {
    icon: 'i-simple-icons-github',
    to: 'https://github.com'
  }
]
</script>
```