<template>
  <component
    :is="$attrs.onSubmit ? 'form' : as"
    :class="ui.wrapper"
    v-bind="attrs"
  >
    <div v-if="$slots.header" :class="ui.header">
      <slot name="header" />
    </div>
    <div :class="ui.base">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="ui.footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { CardConfig, CardUi, Strategy } from '#s94-ui/types'

const { s94Ui: { card: sCard }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { card: CardConfig } }

const configDefault: CardConfig = {
  base: 'flex-grow px-4 py-5 sm:px-6',
  footer: 'flex-none px-4 py-5 sm:px-6',
  header: 'flex-none flex-grow-0 px-4 py-5 sm:px-6',
  wrapper: 'min-h-full flex flex-col overflow-y-auto',
}

const props = defineProps({
  as: {
    default: 'div',
    type: String as PropType<any>,
  },
  class: {
    default: () => '',
    type: String as PropType<any>,
  },
  ui: {
    default: () => ({}),
    type: Object as PropType<Partial<CardUi> & { strategy?: Strategy }>,
  },
})

const config = mergeConfig<CardConfig>(strategy, sCard, configDefault)

const { attrs, ui } = useUI('s94.card', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
