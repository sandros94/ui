<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import _appConfig from '#build/app.config'
import { computed } from '#imports'

export const theme = {
  slots: {
    root: 'mx-auto font-bold',
    span: 'mx-auto leading-none',
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { headline: Partial<typeof theme> } }

const headline = tv({ extend: tv(theme), ...(appConfig.s94Ui.headline || {}) })

export interface HeadlineProps {
  value?: string | string[]
  class?: any
  ui?: Partial<typeof headline.slots>
}

export interface HeadlineSlots {
  [key: string]: (props: { value: string }) => any
}
</script>

<script setup lang="ts">
const props = defineProps<HeadlineProps>()

const lines = computed(() => {
  if (Array.isArray(props.value)) {
    return props.value
  }
  return props.value?.split(/\r?\n/).filter(e => e) || []
})

const ui = computed(() => tv({ extend: headline, slots: props.ui })())
</script>

<template>
  <h1 v-if="lines" :class="ui.root({ class: props.class })">
    <template v-for="(l, i) of lines" :key="i">
      <slot :name="`span-${i}`" :value="l">
        <SHeadlineSpan :class="ui.span()" :value="l" />
      </slot>
    </template>
  </h1>
</template>
