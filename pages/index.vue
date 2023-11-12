<template>
  <div class="w-full h-full grid place-items-center">
    <SLinks class="text-7xl" :links="links" vertical />
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
    label: 'TEST',
    to: '/test'
  }
]
</script>
