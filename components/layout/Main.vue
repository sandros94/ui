<template>
  <main :class="ui.wrapper" v-bind="attrs">
    <slot />
    <!-- the following div is just to offset the `justify-around` and compensate for the header -->
    <div v-if="padded" />
  </main>
</template>

<script setup lang="ts">
import type { MainConfig, MainUi, Strategy } from '#s94-ui/types'

import { twMerge } from 'tailwind-merge'

const { s94Ui: { main: sMain }, ui: { strategy } } = useAppConfig()

const configDefault: MainConfig = {
  wrapper: 'min-h-[calc(100svh-var(--header-height))] @container/main',
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
