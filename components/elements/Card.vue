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
interface DefaultConfig {
  wrapper?: string,
  header?: string,
  base?: string,
  footer?: string
}

const props = withDefaults(defineProps<{
  as?: string,
  ui?: DefaultConfig,
  class?: any,
}>(), {
  as: 'div',
  ui: undefined,
  class: undefined
})

const defaultConfig: DefaultConfig = {
  wrapper: 'min-h-full flex flex-col overflow-y-auto',
  header: 'flex-none flex-grow-0 px-4 py-5 sm:px-6 bg-red-500',
  base: 'flex-grow px-4 py-5 sm:px-6',
  footer: 'flex-none px-4 py-5 sm:px-6 bg-green-500'
}

const { ui, attrs } = useUI('s94.card', toRef(props, 'ui'), defaultConfig, toRef(props, 'class'))
</script>
