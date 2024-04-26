<template>
  <ClientOnly>
    <UButton
      v-if="!props.toggle"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
      :color="color ?? ui.default?.button?.color"
      :icon="isDark ? (onIcon ?? ui.default?.onIcon) : (offIcon ?? ui.default?.offIcon)"
      :ui="ui.style?.button"
      :variant="variant ?? ui.default?.button?.variant"
      v-bind="attrs"
      @click="isDark = !isDark"
    />
    <UToggle
      v-else
      v-bind="attrs"
      v-model="isDark"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
      :color="color ?? ui.default?.toggle?.color"
      :off-icon="offIcon ?? ui.default?.offIcon"
      :on-icon="onIcon ?? ui.default?.onIcon"
      :ui="ui.style?.toggle"
    />
    <template #fallback>
      <div :class="ui.style?.classFallback ?? ui.default?.classFallback" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { DarkModeConfig, DarkModeUi, Strategy } from '#s94-ui/types'

import { mergeConfig } from '#s94-ui/utils'
import { UButton, UToggle }from '#components'

const { s94Ui: { darkMode: sDarkMode }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { darkMode: DarkModeConfig } }

const darkModeConfigDefault: Partial<DarkModeConfig> = {
  default: {
    button: {
      color: 'gray',
      variant: 'ghost',
    },
    classFallback: 'h-8 w-8',
    offIcon: 'i-ph-sun',
    onIcon: 'i-ph-moon',
    style: 'button',
    toggle: {
      color: 'primary',
    },
  },
}

const props = defineProps<{
  class?: any
  color?: DarkModeConfig['style']['button']['color'] | DarkModeConfig['style']['toggle']['color']
  offIcon?: string
  onIcon?: string
  toggle?: boolean
  ui?: Partial<DarkModeUi> & { strategy?: Strategy }
  variant?: DarkModeConfig['style']['button']['variant']
}>()

const configDefaults = mergeConfig<typeof darkModeConfigDefault>(strategy, sDarkMode, darkModeConfigDefault)

const { attrs, ui } = useUI('s94.darkMode.button', toRef(props, 'ui'), configDefaults, toRef(props, 'class'))

const isDark = useDarkMode()
</script>
