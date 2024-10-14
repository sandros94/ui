<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import _appConfig from '#build/app.config'
import { computed, defineSlots } from '#imports'

export const theme = {
  slots: {
    root: 'min-h-svh flex flex-col overflow-x-hidden',
    header: 'h-[var(--s94-ui-header)] flex-none',
    wrapper: 'grow flex flex-col lg:flex-row',
    asides: 'flex-none max-lg:w-full lg:w-72',
    left: 'text-let',
    right: 'text-right',
    container: 'grow max-lg:order-last flex flex-col',
    top: 'flex-none',
    base: 'grow',
    bottom: 'flex-none',
    footer: 'flex-none',
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { page: Partial<typeof theme> } }

const page = tv({ extend: tv(theme), ...(appConfig.s94Ui.page || {}) })

export interface PageProps {
  asidesClass?: string
  class?: any
  symmetrical?: boolean
  ui?: Partial<typeof page.slots>
}

export interface PageSlots {
  header: any
  left: any
  right: any
  top: any
  bottom: any
  default: any
  footer: any
}
</script>

<script setup lang="ts">
const props = defineProps<PageProps>()
const slots = defineSlots<PageSlots>()

const ui = computed(() => tv({ extend: page, slots: props.ui })())
</script>

<template>
  <div id="s-page" :class="ui.root({ class: props.class })">
    <div v-if="slots.header" :class="ui.header()">
      <slot name="header" />
    </div>

    <div :class="ui.wrapper()">
      <div
        v-if="slots.left || props.symmetrical"
        :class="ui.asides({ class: ui.left() })"
      >
        <slot name="left" />
      </div>

      <div :class="ui.container()">
        <div v-if="slots.top" :class="ui.top()">
          <slot name="top" />
        </div>

        <div :class="ui.base()">
          <slot />
        </div>

        <div v-if="slots.bottom" :class="ui.bottom()">
          <slot name="bottom" />
        </div>
      </div>

      <div
        v-if="slots.right || props.symmetrical"
        :class="ui.asides({ class: ui.right() })"
      >
        <slot name="right" />
      </div>
    </div>

    <div v-if="slots.footer" :class="ui.footer()">
      <slot name="footer" />
    </div>
  </div>
</template>
