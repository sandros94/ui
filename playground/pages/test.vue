<script setup lang="ts">
const text = ref(`Understanding Vue's
reactivity
A Deep Dive into Vue's Reactive Principles`)
</script>

<template>
  <div class="max-w-full w-full">
    <UTextarea v-model="text" class="w-1/3 mx-auto mb-24" />
    <SHeadline :value="text">
      <template #span-1="{ value }">
        <SHeadlineSpan class="text-green-500" :value="value.toUpperCase()" />
      </template>
    </SHeadline>
  </div>
</template>
