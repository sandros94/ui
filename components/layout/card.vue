<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import _appConfig from '#build/app.config'

export const theme = {
  slots: {
    root: 'min-h-full flex flex-col overflow-hidden',
    header: 'flex-none px-4 py-5 sm:px-6',
    base: 'grow px-4 py-5 sm:px-6 overflow-y-auto',
    footer: 'flex-none px-4 py-5 sm:px-6',
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { card: Partial<typeof theme> } }

const card = tv({ extend: tv(theme), ...(appConfig.s94Ui.card || {}) })

export interface CardProps {
  as?: string
  class?: any
  ui?: Partial<typeof card.slots>
}

export interface CardSlots {
  header: any
  default: any
  footer: any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<CardProps>(), {
  as: 'div',
})
const slots = defineSlots<CardSlots>()

const ui = computed(() => tv({ extend: card, slots: props.ui })())
</script>

<template>
  <component
    :is="$attrs.onSubmit ? 'form' : as"
    :class="ui.root({ class: props.class })"
  >
    <div v-if="slots.header" :class="ui.header()">
      <slot name="header" />
    </div>
    <div :class="ui.base()">
      <slot />
    </div>
    <div v-if="slots.footer" :class="ui.footer()">
      <slot name="footer" />
    </div>
  </component>
</template>
