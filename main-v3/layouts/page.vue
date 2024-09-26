<template>
  <SPage :symmetrical>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </SPage>
</template>

<script setup lang="ts">
const { symmetrical } = useAttrs() as {
  symmetrical?: boolean
}
</script>
