<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { Strategy } from '#s94-ui/types'
import type { ButtonColor, ButtonSize, ButtonVariant, ToggleColor, ToggleSize } from '#ui/types'
import type { button, toggle as toggleConfig } from '#ui/ui.config'

import { mergeConfig } from '#s94-ui/utils'
import { UButton, UToggle } from '#components'

export interface DarkModeUi {
  button: typeof button
  toggle: typeof toggleConfig
}

export interface DarkModeConfig {
  default: {
    button: {
      color: ButtonColor
      size: ButtonSize
      variant: ButtonVariant
    }
    offIcon: string
    onIcon: string
    style: 'button' | 'toggle'
    toggle: {
      color: ToggleColor
      size: ToggleSize
    }
  }
  style: Partial<DarkModeUi>
}

export interface DarkModeProps {
  offIcon?: string
  onIcon?: string
  color?: ButtonColor | ToggleColor
  toggle?: boolean
  variant?: ButtonVariant
  class?: any
  ui?: Partial<DarkModeUi> & { strategy?: Strategy }
}
</script>

<script setup lang="ts">
const { s94Ui: { darkMode: sDarkMode }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { darkMode: DarkModeConfig } }
const { $colorMode: { unknown }, hook } = useNuxtApp()

const darkModeConfigDefault: Partial<DarkModeConfig> = {
  default: {
    button: {
      color: 'primary',
      size: 'md',
      variant: 'ghost',
    },
    offIcon: 'i-ph-sun',
    onIcon: 'i-ph-moon',
    style: 'button',
    toggle: {
      color: 'primary',
      size: 'md',
    },
  },
}

const props = defineProps<DarkModeProps>()

const configDefaults = mergeConfig<typeof darkModeConfigDefault>(strategy, sDarkMode, darkModeConfigDefault)

const { attrs, ui } = useUI('s94.darkMode.button', toRef(props, 'ui'), configDefaults, toRef(props, 'class'))

const isDark = useDarkMode()
const isLoading = ref(true)
const idToggleLoading = useId()

hook('page:finish', () => {
  !unknown ? isLoading.value = false : isLoading.value = true
})
</script>

<template>
  <UButton
    v-if="!props.toggle"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
    :color="color ?? ui.default?.button?.color"
    :icon="isDark ? (onIcon ?? ui.default?.onIcon) : (offIcon ?? ui.default?.offIcon)"
    :loading="isLoading"
    :ui="ui.style?.button"
    :variant="variant ?? ui.default?.button?.variant"
    v-bind="attrs"
    @click="isDark = !isDark"
  />
  <ClientOnly v-else>
    <UToggle
      v-bind="attrs"
      v-model="isDark"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
      :color="color ?? ui.default?.toggle?.color"
      :off-icon="offIcon ?? ui.default?.offIcon"
      :on-icon="onIcon ?? ui.default?.onIcon"
      :ui="ui.style?.toggle"
    />
    <template #placeholder>
      <UToggle
        :id="idToggleLoading"
        v-bind="attrs"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
        :color="color ?? ui.default?.toggle?.color"
        :loading="true"
        :ui="ui.style?.toggle"
      />
    </template>
  </ClientOnly>
</template>
