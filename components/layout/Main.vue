<template>
  <main :class="ui.wrapper" v-bind="attrs">
    <slot />
    <div v-if="padded">
      <!-- this `div` is only to offset the `justify-around` and compensate for the empty space if present -->
    </div>
  </main>
</template>

<script setup lang="ts">
import type { AppConfig } from 'nuxt/schema'
import { twMerge } from 'tailwind-merge'
import type { MainConfig, MainUi, Strategy } from '#s94-ui/types'

const { s94Ui: { main: sMain }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { main: MainConfig } }

const configDefault: MainConfig = {
  wrapper: 'min-h-full h-fit w-full @container/main mx-auto max-w-7xl',
}

const props = defineProps({
  class: {
    default: () => '',
    type: String as PropType<any>,
  },
  padded: {
    default: true,
    type: Boolean,
  },
  ui: {
    default: () => ({}),
    type: Object as PropType<Partial<MainUi> & { strategy?: Strategy }>,
  },
})

const config = mergeConfig<MainConfig>(strategy, sMain, configDefault)

config.wrapper = twMerge(config.wrapper, props.padded ? 'flex flex-col justify-around' : '')

const { attrs, ui } = useUI('s94.main', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
