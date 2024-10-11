<script setup lang="ts">
const text = ref(`Understanding Vue's
reactivity
A Deep Dive into Vue's Reactive Principles`)
</script>

<template>
  <div>
    <div class="w-1/2 mx-auto">
      <UTextarea v-model="text" />
    </div>
    <SHeadline :value="text">
      <template #span-1="{ value }">
        <SHeadlineSpan class="text-green-500" :value="value.toUpperCase()" />
      </template>
    </SHeadline>
  </div>
</template>
