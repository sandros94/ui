<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { VariantProps, TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import type { HeadlineProps } from '#s94-ui/types'
import _appConfig from '#build/app.config'
import { computed } from '#imports'

export const theme = {
  slots: {
    root: 'max-w-breakpoint-md mx-auto px-4 my-6',
    headlineRoot: 'my-12',
    headlineSpan: '',
    section: 'px-2 lg:px-8 mt-8 text-justify',
    paragraph: 'max-w-[50ch] text-justify text-lg mx-auto my-4',
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { article: Partial<typeof theme> } }

const article = tv({ extend: tv(theme), ...(appConfig.s94Ui.article || {}) })

export type ArticleVariants = VariantProps<typeof article>

export interface ArticleProps {
  headline?: string | string[]
  value?: string | string[]
  class?: any
  ui?: Partial<typeof article.slots>
  headlineFill?: boolean
}

export interface ArticleSlots {
  headline(props: { value?: string | string[], hUi?: HeadlineProps['ui'] }): any
  default(props: { value?: string | string[] }): any
  [key: string]: (props: { value?: string, pClass?: string }) => any
}
</script>

<script setup lang="ts">
const props = defineProps<ArticleProps>()
const slots = defineSlots<ArticleSlots>()

const ui = computed(() => tv({ extend: article, slots: props.ui })())
</script>

<template>
  <div :class="ui.root({ class: props.class })">
    <slot name="headline" :value="headline" :h-ui="{ root: ui.headlineRoot(), span: ui.headlineSpan() }">
      <SHeadline
        v-if="slots.headline({ value: headline })"
        :value="headline"
        :ui="{ root: ui.headlineRoot(), span: ui.headlineSpan() }"
      />
    </slot>
    <div v-if="value || slots.default({ value })" :class="ui.section()">
      <slot :value>
        <p v-if="!Array.isArray(value)" :class="ui.paragraph()">
          {{ value }}
        </p>
        <template v-for="(v, i) of value" v-else :key="i">
          <slot :name="`paragraph-${i}`" :value="v" :p-class="ui.paragraph()">
            <p :class="ui.paragraph()">
              {{ v }}
            </p>
          </slot>
        </template>
      </slot>
    </div>
  </div>
</template>
