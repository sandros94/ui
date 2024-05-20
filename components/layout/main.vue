<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import { tv } from 'tailwind-variants'
import { main as theme } from '#s94-ui/themes'
import _appConfig from '#build/app.config'

const appConfig = _appConfig as AppConfig & { s94Ui: { main: Partial<typeof theme> } }

const main = tv({ extend: tv(theme), ...(appConfig.s94Ui.main || {}) })

export interface MainProps {
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
  padded: false,
})
const slots = defineSlots<MainSlots>()

const ui = computed(() => tv({ extend: main, slots: props.ui })({
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
