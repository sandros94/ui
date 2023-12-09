<template>
  <main :class="ui.wrapper" v-bind="attrs">
    <slot />
    <!-- the following div is just to offset the `justify-around` and compensate for the header -->
    <div v-if="padded" />
  </main>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const config = {
  wrapper: 'min-h-[calc(100svh-var(--header-height))] @container/main'
}

const props = withDefaults(defineProps<{
  ui?: Partial<typeof config>
  class?: any
  padded?: boolean
}>(), {
  ui: () => ({}),
  class: undefined,
  padded: true
})

config.wrapper = twMerge(config.wrapper, props.padded ? 'flex flex-col justify-around' : '')

const { ui, attrs } = useUI('s94.main', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
