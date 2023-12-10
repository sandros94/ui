<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <slot name="banner" />

    <UContainer :class="ui.container">
      <div :class="ui.base">
        <div v-if="headline || $slots.headline" :class="ui.headline">
          <slot name="headline">
            <h1>
              {{ headline }}
            </h1>
          </slot>
        </div>

        <div v-if="subhead || $slots.subhead" :class="ui.subhead">
          <slot name="subhead">
            <p>
              {{ subhead }}
            </p>
          </slot>
        </div>

        <div v-if="cta?.length || $slots.cta" :class="ui.cta">
          <slot name="cta">
            <UButton v-for="(link, index) in cta" :key="index" v-bind="link" @click="link.click" />
          </slot>
        </div>
      </div>

      <slot />
    </UContainer>

    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
import type { Button } from '#ui/types'
import type { HeroConfig as Config } from '#s94-ui/types'

const props = defineProps<{
  headline?: string
  subhead?: string
  cta?:(Button & { click?: Function })[]
  horizontal?: boolean
  variant?: 'normal' // TODO: add `overlay` variant with text over image
  ui?: Partial<Config>
  class?: any
}>()

const baseConfig: Config = {
  wrapper: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
  container: 'gap-8 sm:gap-y-16 max-w-screen-lg',
  base: '',
  headline: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl',
  subhead: 'text-lg tracking-tight text-gray-600 dark:text-gray-300',
  cta: 'mt-12 flex flex-wrap gap-x-6 gap-y-3'
}

const horizontalConfig: Partial<Config> = {
  container: 'grid md:grid-cols-2 md:items-center'
}

const verticalConfig: Partial<Config> = {
  container: 'flex flex-col',
  base: 'text-center',
  cta: 'justify-center'
}

const configMap = {
  horizontal: {
    normal: horizontalConfig
  },
  vertical: {
    normal: verticalConfig
  }
}
const direction = props.horizontal ? 'horizontal' : 'vertical'
const variant = props.variant ?? 'normal'

const config = mergeConfig<Config>('merge', configMap[direction][variant], baseConfig)

const { ui, attrs } = useUI('s94.hero', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
