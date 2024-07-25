<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { VariantProps, TV } from 'tailwind-variants'

import { tv } from 'tailwind-variants'
import _appConfig from '#build/app.config'
import { computed, defineSlots } from '#imports'

export interface FigureUi {
  wrapper: string
  container: string
  caption: string
}

export const theme = {
  slots: {
    root: 'w-full mx-4 my-8',
    container: 'shadow rounded',
    caption: 'w-full mx-12 mt-4 text-sm text-center text-gray-700 dark:text-gray-300',
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { figure: Partial<typeof theme> } }

const figure = tv({ extend: tv(theme), ...(appConfig.s94Ui.figure || {}) })

export type FigureVariants = VariantProps<typeof figure>

export interface FigureProps {
  caption?: string | string[]
  class?: any
  ui?: Partial<typeof figure.slots>
}

export interface FigureSlots {
  default: any
  caption: any
}
</script>

<script setup lang="ts">
const props = defineProps<FigureProps>()
const slots = defineSlots<FigureSlots>()

const ui = computed(() => tv({ extend: figure, slots: props.ui })({}))
</script>

<template>
  <figure v-if="slots.default" :class="ui.root({ class: props.class })">
    <div :class="ui.container">
      <slot />
    </div>
    <figcaption v-if="props.caption || slots.caption" :class="ui.caption()">
      <slot name="caption">
        {{ props.caption }}
      </slot>
    </figcaption>
  </figure>
</template>
