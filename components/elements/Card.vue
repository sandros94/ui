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
const defaultConfig = {
  wrapper: 'min-h-full flex flex-col overflow-y-auto',
  header: 'flex-none flex-grow-0 px-4 py-5 sm:px-6 bg-red-500',
  base: 'flex-grow px-4 py-5 sm:px-6',
  footer: 'flex-none px-4 py-5 sm:px-6 bg-green-500'
}

const props = withDefaults(defineProps<{
  as?: string,
  ui?: Partial<typeof defaultConfig>,
  class?: any,
}>(), {
  as: 'div',
  ui: undefined,
  class: undefined
})

const { ui, attrs } = useUI('s94.card', toRef(props, 'ui'), defaultConfig, toRef(props, 'class'))
</script>
