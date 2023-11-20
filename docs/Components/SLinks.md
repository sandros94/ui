Example of using the `SLinks` component.

Use `vertical` prop to define a vertical instance.

```vue
<template>
  <div>
    <SLinks class="text-2xl" :links="links" />
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
  }, {
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