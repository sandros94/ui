<template>
  <SPage symmetrical>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template #left>
      <div class="size-full bg-red-500" />
    </template>
    <template #right>
      <div class="size-full bg-red-500" />
    </template>
    <template #top>
      <div class="h-24 bg-cyan-500" />
    </template>
    <template #bottom>
      <div class="h-32 bg-green-500" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <slot />
  </SPage>
</template>
