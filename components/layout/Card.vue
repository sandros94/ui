<template>
  <component
    :class="ui.wrapper"
    :is="$attrs.onSubmit ? 'form' : as"
    v-bind="attrs"
  >
    <div :class="ui.header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div :class="ui.base">
      <slot />
    </div>
    <div :class="ui.footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
import type { CardConfig, CardUi, Strategy } from '#s94-ui/types'

const { s94Ui: { card: sCard }, ui: { strategy } } = useAppConfig()

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
