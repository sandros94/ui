<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { Strategy } from '#s94-ui/types'

export interface FigureUi {
  wrapper: string
  container: string
  caption: string
}

export type FigureConfig = FigureUi

export interface FigureProps {
  // TODO: add image and image alt
  caption?: string
  class?: any
  ui?: Partial<FigureUi> & { strategy?: Strategy }
}
</script>

<script setup lang="ts">
const { s94Ui: { figure: sFigure }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { figure: FigureConfig } }

const configDefault: FigureUi = {
  wrapper: 'w-full mx-4 my-8',
  container: 'shadow rounded',
  caption: 'w-full mx-12 mt-4 text-sm text-center text-gray-700 dark:text-gray-300',
}

const props = withDefaults(defineProps<FigureProps>(), {
  ui: () => ({}),
})

const config = mergeConfig<FigureConfig>(strategy, sFigure, configDefault)

const { attrs, ui } = useUI('s94.main', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>

<template>
  <figure v-if="$slots.default" :class="ui.wrapper" v-bind="attrs">
    <div :class="ui.container">
      <slot />
    </div>
    <figcaption v-if="props.caption" :class="ui.caption">
      <slot name="caption">
        {{ props.caption }}
      </slot>
    </figcaption>
  </figure>
</template>
