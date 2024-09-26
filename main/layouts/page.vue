<template>
  <SPage :symmetrical="$attrs.symmetrical as (boolean | undefined)">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </SPage>
</template>
