<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import type { HeadlineProps } from '#s94-ui/types'
import _appConfig from '#build/app.config'
import theme from '#s94-ui/themes/article'

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
