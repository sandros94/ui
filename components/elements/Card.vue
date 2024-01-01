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
import type { CardUi, Strategy } from '#s94-ui/types'

const defaultConfig: CardUi = {
  base: 'flex-grow px-4 py-5 sm:px-6',
  footer: 'flex-none px-4 py-5 sm:px-6',
  header: 'flex-none flex-grow-0 px-4 py-5 sm:px-6',
  wrapper: 'min-h-full flex flex-col overflow-y-auto',
}

const props = withDefaults(defineProps<{
  as?: string
  class?: any
  ui?: Partial<CardUi> & { strategy?: Strategy }
}>(), {
  as: 'div',
  class: undefined,
  ui: undefined,
})

const { attrs, ui } = useUI('s94.card', toRef(props, 'ui'), defaultConfig, toRef(props, 'class'))
</script>
