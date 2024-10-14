<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { VariantProps, TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import _appConfig from '#build/app.config'
import type { ButtonProps } from '#ui/types'

export const theme = {
  slots: {
    base: '',
    content: '',
    container: 'mx-auto',
    cta: 'flex flex-wrap gap-x-6 gap-y-3',
    headline: 'text-2xl font-bold tracking-tight',
    subhead: '',
    img: '',
  },
  variants: {
    variant: {
      horizontal: {
        base: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
        content: '',
        container: 'px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 md:items-center gap-8 sm:gap-y-16 max-w-breakpoint-lg',
        cta: 'mt-12',
        headline: 'sm:text-3xl text-gray-900 dark:text-white',
        subhead: 'text-lg text-gray-600 dark:text-gray-300',
      },
      vertical: {
        base: 'prose dark:prose-invert py-16 sm:py-24 relative mx-auto max-w-full',
        content: 'text-center',
        container: 'px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-y-16 max-w-breakpoint-lg',
        cta: 'justify-center mt-12',
        headline: 'sm:text-3xl text-gray-900 dark:text-white',
        subhead: 'text-lg tracking-tight text-gray-600 dark:text-gray-300',
      },
      opening: {
        base: 'not-prose mx-auto max-w-full h-svh',
        content: 'absolute h-full w-full flex flex-col justify-around text-center',
        container: 'relative h-full w-fit max-w-breakpoint-xl text-gray-900 dark:text-white',
        cta: 'absolute inset-x-[10%] lg:inset-x-[15%] bottom-20 gap-x-4 gap-y-2',
        headline: 'h-fit text-5xl lg:text-6xl',
        subhead: 'h-fit lg:text-xl tracking-tight',
        img: 'inset-0 max-lg:object-cover size-full -z-30 mx-auto',
      },
    },
  },
  defaultVariants: {
    variant: 'horizontal' as const,
  },
} satisfies Parameters<TV>[0]

export interface HeroCta extends ButtonProps {
  click?: ((...args: any[]) => void) | undefined
  if?: () => boolean
}

const appConfig = _appConfig as AppConfig & { s94Ui: { hero: Partial<typeof theme> } }

const _hero = tv({ extend: tv(theme), ...(appConfig.s94Ui.hero || {}) })

export type HeroVariants = VariantProps<typeof _hero>

export interface HeroProps {
  cta?: HeroCta[] | Ref<HeroCta[]>
  headline?: string
  img?: string
  imgAlt?: string
  subhead?: string
  variant?: HeroVariants['variant']
  class?: any
  ui?: Partial<typeof _hero.slots>
  uiButton?: ButtonProps['ui']
}
</script>

<script setup lang="ts">
const props = defineProps<HeroProps>()

const filteredCta = computed(() => unref(props.cta || []).filter(cta => cta.if ? cta.if() : true))

const ui = computed(() => tv({ extend: _hero, slots: props.ui })({
  variant: props.variant,
}))
</script>

<template>
  <div :class="ui.base()">
    <slot name="banner" />

    <div :class="ui.container()">
      <div :class="ui.content()">
        <div v-if="headline || $slots.headline" :class="ui.headline()">
          <slot name="headline">
            <h1>
              {{ headline }}
            </h1>
          </slot>
        </div>

        <div v-if="subhead || $slots.subhead" :class="ui.subhead()">
          <slot name="subhead">
            <p>
              {{ subhead }}
            </p>
          </slot>
        </div>

        <div v-if="filteredCta?.length || $slots.cta" :class="ui.cta()">
          <slot name="cta">
            <UButton
              v-for="(link, index) in filteredCta"
              v-bind="link"
              :key="index"
              :class="link.class"
              :ui="link.ui || props.uiButton"
              @click="link.click"
            />
          </slot>
        </div>
      </div>

      <div v-if="!$slots.default || props.img" :class="ui.img()">
        <slot>
          <img v-if="!$slots.default" class="size-full object-cover" :src="props.img" :alt="props.imgAlt">
        </slot>
      </div>
    </div>

    <slot name="content" />
  </div>
</template>
