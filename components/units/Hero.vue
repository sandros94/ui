<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <slot name="banner" />

    <UContainer :class="ui.container">
      <div :class="ui.base">
        <div :class="ui.headline" v-if="headline || $slots.headline">
          <slot name="headline">
            <h1>
              {{ headline }}
            </h1>
          </slot>
        </div>

        <div :class="ui.subhead" v-if="subhead || $slots.subhead">
          <slot name="subhead">
            <p>
              {{ subhead }}
            </p>
          </slot>
        </div>

        <div :class="ui.cta" v-if="cta?.length || $slots.cta">
          <slot name="cta">
            <UButton
              :key="index"
              v-for="(link, index) in cta"
              v-bind="link"
              @click="link.click"
            />
          </slot>
        </div>
      </div>

      <slot />
    </UContainer>

    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
import type { HeroConfig as Config } from '#s94-ui/types'
import type { Button } from '#ui/types'

const props = defineProps<{
  class?: any
  cta?: (Button & { click?: Function })[]
  headline?: string
  horizontal?: boolean
  subhead?: string
  ui?: Partial<Config>
  variant?: 'normal' // TODO: add `overlay` variant with text over image
}>()

const baseConfig: Config = {
  base: '',
  container: 'gap-8 sm:gap-y-16 max-w-screen-lg',
  cta: 'mt-12 flex flex-wrap gap-x-6 gap-y-3',
  headline: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl',
  subhead: 'text-lg tracking-tight text-gray-600 dark:text-gray-300',
  wrapper: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
}

const horizontalConfig: Partial<Config> = {
  container: 'grid md:grid-cols-2 md:items-center',
}

const verticalConfig: Partial<Config> = {
  base: 'text-center',
  container: 'flex flex-col',
  cta: 'justify-center',
}

const configMap = {
  horizontal: {
    normal: horizontalConfig,
  },
  vertical: {
    normal: verticalConfig,
  },
}
const direction = props.horizontal ? 'horizontal' : 'vertical'
const variant = props.variant ?? 'normal'

const config = mergeConfig<Config>('merge', configMap[direction][variant], baseConfig)

const { attrs, ui } = useUI('s94.hero', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
