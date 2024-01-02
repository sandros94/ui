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

        <div :class="ui.cta.wrapper" v-if="cta?.length || $slots.cta">
          <slot name="cta">
            <UButton
              :key="index"
              v-for="(link, index) in cta"
              v-bind="link"
              :ui="ui.cta.button"
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
import type {
  HeroConfig,
  HeroCta,
  HeroStyle,
  HeroUi,
  HeroVariant,
  Strategy,
} from '#s94-ui/types'

import { mergeConfig } from '#s94-ui/utils'
import UButton from '#ui/components/elements/Button.vue'
import UContainer from '#ui/components/layout/Container.vue'

const { s94Ui: { main: sHero }, ui: { strategy } } = useAppConfig()

const heroConfigDefault: HeroConfig = {
  default: {
    style: 'horizontal',
    variant: 'default',
  },
  variant: { // TODO: add `overlay` variant with text over image
    horizontal: {
      default: {
        base: '',
        container: 'grid md:grid-cols-2 md:items-center gap-8 sm:gap-y-16 max-w-screen-lg',
        cta: {
          wrapper: 'mt-12 flex flex-wrap gap-x-6 gap-y-3',
        },
        headline: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl',
        subhead: 'text-lg tracking-tight text-gray-600 dark:text-gray-300',
        wrapper: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
      },
    },
    vertical: {
      default: {
        base: 'text-center',
        container: 'flex flex-col gap-8 sm:gap-y-16 max-w-screen-lg',
        cta: {
          wrapper: 'justify-center mt-12 flex flex-wrap gap-x-6 gap-y-3',
        },
        headline: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl',
        subhead: 'text-lg tracking-tight text-gray-600 dark:text-gray-300',
        wrapper: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
      },
    },
  },
}

const props = defineProps<{
  class?: any
  cta?: HeroCta[]
  headline?: string
  style?: HeroStyle
  subhead?: string
  ui?: Partial<HeroUi> & { strategy?: Strategy }
  variant?: HeroVariant
}>()

const configDefault = mergeConfig<HeroConfig>(strategy, sHero, heroConfigDefault)

const style = props.style ?? configDefault.default.style
const variant = props.variant ?? configDefault.default.variant

const config = mergeConfig<HeroUi>('merge', configDefault.variant[style][variant], configDefault.variant[style].default)

const { attrs, ui } = useUI('s94.hero', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
