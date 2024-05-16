<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { ExtractDeepKey, Strategy } from '#s94-ui/types'
import type { Button } from '#ui/types'
import { mergeConfig } from '#s94-ui/utils'
import { UButton } from '#components'

type UButtonProps = Pick<InstanceType<typeof UButton>['$props'], 'class' | 'ui'>

export interface HeroCta extends Button, UButtonProps {
  click?: Function
  if?: () => boolean
}

export interface HeroUi {
  base: string
  container: string
  cta: {
    button?: UButtonProps
    wrapper?: string
  }
  headline: string
  subhead: string
  img?: string
  wrapper: string
}

export interface HeroConfig {
  default: {
    variant: HeroVariant
  }
  variant: {
    horizontal: HeroUi
    vertical: HeroUi
    opening: HeroUi
  }
}

export type HeroVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'hero', 'variant']> | keyof HeroConfig['variant']

export interface HeroProps {
  class?: any
  cta?: HeroCta[]
  headline?: string
  img?: string
  imgAlt?: string
  subhead?: string
  ui?: Partial<HeroUi> & { strategy?: Strategy }
  variant?: HeroVariant
}
</script>

<script setup lang="ts">
const { s94Ui: { hero: sHero }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { hero: HeroConfig } }

const heroConfigDefault: HeroConfig = {
  default: {
    variant: 'horizontal',
  },
  variant: { // TODO: add `overlay` variant with text over image
    horizontal: {
      base: '',
      container: 'mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 md:items-center gap-8 sm:gap-y-16 max-w-screen-lg',
      cta: {
        wrapper: 'mt-12 flex flex-wrap gap-x-6 gap-y-3',
      },
      headline: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl',
      subhead: 'text-lg tracking-tight text-gray-600 dark:text-gray-300',
      wrapper: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
    },
    vertical: {
      base: 'text-center',
      container: 'mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-y-16 max-w-screen-lg',
      cta: {
        wrapper: 'justify-center mt-12 flex flex-wrap gap-x-6 gap-y-3',
      },
      headline: 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl',
      subhead: 'text-lg tracking-tight text-gray-600 dark:text-gray-300',
      wrapper: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
    },
    opening: {
      base: 'absolute h-full w-full flex flex-col justify-around text-center',
      container: 'relative h-full w-fit max-w-screen-xl mx-auto',
      cta: {
        wrapper: 'absolute inset-x-[10%] lg:inset-x-[15%] bottom-20 flex flex-wrap gap-x-4 gap-y-2',
      },
      headline: 'h-fit text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white',
      subhead: 'h-fit text-2xl lg:text-xl tracking-tight text-gray-600 dark:text-gray-300',
      img: 'inset-0 max-lg:object-cover size-full -z-30 h-full w-fit mx-auto',
      wrapper: 'not-prose mx-auto max-w-full h-svh',
    },
  },
}

const props = defineProps<HeroProps>()

const config = mergeConfig<HeroConfig>(strategy, sHero, heroConfigDefault)

const variant = props.variant ?? config.default.variant

const { attrs, ui } = useUI('s94.hero', toRef(props, 'ui'), config.variant[variant], toRef(props, 'class'))
</script>

<template>
  <div :class="ui.wrapper" v-bind="attrs">
    <slot name="banner" />

    <div :class="ui.container">
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

        <div v-if="cta?.length || $slots.cta" :class="ui.cta.wrapper">
          <slot name="cta">
            <UButton
              v-for="(link, index) in cta"
              v-bind="link"
              :key="index"
              :class="link.class ?? ui.cta.button?.class"
              :ui="link.ui ?? ui.cta.button?.ui"
              @click="link.click"
            />
          </slot>
        </div>
      </div>

      <img v-if="!$slots.default" :class="ui.img" :src="props.img" :alt="props.imgAlt">
      <slot />
    </div>

    <slot name="content" />
  </div>
</template>
