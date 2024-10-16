<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { TV, VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import _appConfig from '#build/app.config'
import { computed, defineSlots } from '#imports'

export const theme = {
  slots: {
    root: 'max-w-breakpoint-lg h-full mx-auto p-2 lg:p-4',
    base: 'min-h-fit w-full mx-auto',
  },
  variants: {
    centered: {
      true: {
        root: 'min-h-[calc(100svh-var(--ui-header-height)*2)] flex flex-col justify-center',
        base: 'w-fit',
      },
    },
    padded: {
      true: {
        root: 'min-h-[calc(100svh-var(--ui-header-height)*2)] flex flex-col justify-around',
        base: 'w-fit',
      },
    },
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { main: Partial<typeof theme> } }

const main = tv({ extend: tv(theme), ...(appConfig.s94Ui.main || {}) })

export type MainVariants = VariantProps<typeof main>

export interface MainProps {
  centered?: boolean
  padded?: boolean
  class?: any
  ui?: Partial<typeof main.slots>
}

export interface MainSlots {
  default: any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<MainProps>(), {
  centered: false,
  padded: false,
})
const slots = defineSlots<MainSlots>()

const ui = computed(() => tv({ extend: main, slots: props.ui })({
  centered: props.centered,
  padded: props.padded,
}))
</script>

<template>
  <main :class="ui.root({ class: props.class })">
    <div v-if="slots.default" :class="ui.base()">
      <slot />
    </div>
    <div v-if="padded">
      <!-- this `div` is only to offset the `justify-around` and compensate for the empty space if present -->
    </div>
  </main>
</template>
