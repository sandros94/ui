<template>
  <div class="w-full h-full grid place-items-center">
    <!-- Component to be tested -->
    <SLinks class="text-2xl" :links="links" />
  </div>
</template>

<script setup>
const links = [
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
