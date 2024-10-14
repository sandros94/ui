<script lang="ts">
import type { ButtonProps } from '#ui/components/Button.vue'
import type { SwitchProps } from '#ui/components/Switch.vue'
import { UButton, USwitch } from '#components'
import {
  ref,
  useDarkMode,
  useId,
  useNuxtApp,
} from '#imports'

export interface DarkModeProps {
  offIcon?: string
  onIcon?: string
  color?: ButtonProps['color'] | SwitchProps['color']
  switch?: boolean
  size?: ButtonProps['size'] | SwitchProps['size']
  variant?: ButtonProps['variant']
  class?: any
  ui?: {
    button?: ButtonProps['ui']
    switch?: SwitchProps['ui']
  }
}
</script>

<script setup lang="ts">
const { $colorMode: { unknown }, hook } = useNuxtApp()

const props = withDefaults(defineProps<DarkModeProps>(), {
  onIcon: 'i-heroicons-sun',
  offIcon: 'i-heroicons-moon',
  size: 'md',
})

const isDark = useDarkMode()
const isLoading = ref(true)
const idToggleLoading = useId()

hook('page:finish', () => {
  // TODO: Better handle unknown color mode
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  !unknown ? isLoading.value = false : isLoading.value = true
})
</script>

<template>
  <UButton
    v-if="!props.switch"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
    :color="props.color"
    :icon="isDark ? (props.onIcon) : (props.offIcon)"
    :loading="isLoading"
    :ui="props.ui?.button"
    :variant="props.variant"
    @click="isDark = !isDark"
  />
  <ClientOnly v-else>
    <USwitch
      v-model="isDark"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
      :color="props.color"
      :size="props.size"
      :off-icon="offIcon"
      :on-icon="onIcon"
      :ui="props.ui?.switch"
    />
    <template #placeholder>
      <USwitch
        :id="idToggleLoading"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
        :color="props.color"
        :size="props.size"
        :loading="true"
        :ui="props.ui?.switch"
      />
    </template>
  </ClientOnly>
</template>
