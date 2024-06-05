<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import { tv } from 'tailwind-variants'

import _appConfig from '#build/app.config'
import theme from '#s94-ui/themes/headline-span'

const appConfig = _appConfig as AppConfig & { s94Ui: { headlineSpan: Partial<typeof theme> } }

const headlineSpan = tv({ extend: tv(theme), ...(appConfig.s94Ui.headlineSpan || {}) })

export interface HeadlineSpanProps {
  value?: string
  class?: any
}
</script>

<script setup lang="ts">
const props = defineProps<HeadlineSpanProps>()

const text = toRef(props, 'value')
const headline = ref<HTMLElement | null>(null)
const orStyle = ref<{
  fontSize?: number
  width?: number
}>()
const style = reactive({
  display: 'block',
  fontSize: '1em',
  whiteSpace: 'nowrap',
  width: 'fit-content',
})

const { width: windowWidth } = useWindowSize()
const { width: parentWidth } = useElementSize(useParentElement(headline))

function getOrStyle(el: HTMLElement) {
  return {
    fontSize: Number.parseInt(window.getComputedStyle(el).fontSize),
    width: el.offsetWidth,
  }
}

watchDebounced([text, windowWidth], async ([prevText], [newText]) => {
  if (!orStyle.value && !!headline.value) {
    orStyle.value = getOrStyle(headline.value)
  }
  if (prevText !== newText && !!headline.value) {
    style.fontSize = `${orStyle.value?.fontSize}px`
    await nextTick()
    orStyle.value = getOrStyle(headline.value)
  }
  if (!orStyle.value?.width || !orStyle.value.fontSize) {
    return
  }
  style.fontSize = `${parentWidth.value / orStyle.value.width * orStyle.value.fontSize}px`
}, {
  debounce: 50,
  immediate: true,
})
</script>

<template>
  <span
    v-if="value"
    ref="headline"
    :class="headlineSpan({ class: props.class })"
    :style="style"
  >
    <slot :value="value">
      {{ value }}
    </slot>
  </span>
</template>
