<script setup lang="ts">
const text = ref(`Understanding Vue's
REACTIVITY
A Deep Dive into Vue's Reactive Principles`)
</script>

<template>
  <div>
    <UTextarea v-model="text" class="w-1/3 mx-auto mb-24" />
    <SHeadline :value="text">
      <template #span-1="{ value }">
        <SHeadlineSpan class="text-green-500" :value="value" />
      </template>
    </SHeadline>
  </div>
</template>
