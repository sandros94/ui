<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import { tv } from 'tailwind-variants'
import { headlineSpan as theme } from '#s94-ui/themes'
import _appConfig from '#build/app.config'

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
const style = reactive({
  display: 'block',
  fontSize: '2em',
  whiteSpace: 'nowrap',
  width: 'fit-content',
})

const { width: windowWidth } = useWindowSize()
const { width: parentWidth } = useElementSize(useParentElement(headline))
const { width } = useElementSize(headline)

watchDebounced([windowWidth, parentWidth, text], () => {
  if (headline.value !== null) {
    const fontSize = Number.parseFloat(window.getComputedStyle(headline.value).fontSize)
    style.fontSize = `${parentWidth.value / width.value * fontSize}px`
  }
}, {
  debounce: 100,
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
