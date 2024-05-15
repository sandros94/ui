<template>
  <SPage symmetrical>
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
    <SMain>
      <slot />
    </SMain>
  </SPage>
</template>
