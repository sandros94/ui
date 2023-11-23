<template>
  <main :class="ui.wrapper" v-bind="attrs">
    <slot />
  </main>
</template>

<script setup lang="ts">
const config = {
  wrapper: 'min-h-[calc(100svh-var(--header-height))] @container/main'
}

const props = defineProps<{
  ui?: Partial<typeof config>
  class?: any
}>()

const { ui, attrs } = useUI('s94.main', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
