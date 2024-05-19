<script setup lang="ts">
definePageMeta({
  layout: 'test',
})

const text = ref('Hello, world!')
</script>

<template>
  <div>
    <UTextarea v-model="text" />
    <SHeadline :value="text" />
  </div>
</template>
