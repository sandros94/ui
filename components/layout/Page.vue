<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { Strategy } from '#s94-ui/types'

export interface PageUi {
  wrapper: string
  asideLeft: string
  asideRight: string
  container: string
  top: string
  bottom: string
}

export interface PageVar {
  asideWidth: string
}

export type PageConfig = PageUi & PageVar

export interface PageProps {
  asideWidth?: string
  class?: any
  symmetrical?: boolean
  ui?: Partial<PageUi> & { strategy?: Strategy }
}
</script>

<script setup lang="ts">
const { s94Ui: { page: sPage }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { page: PageConfig } }

const configDefault: PageUi = {
  wrapper: 'min-h-[calc(100svh-var(--header-height))] w-svw max-w-full flex max-lg:flex-col overflow-x-hidden',
  asideLeft: 'w-[var(--aside-width)] max-lg:w-full shrink-0',
  asideRight: 'w-[var(--aside-width)] max-lg:w-full shrink-0',
  container: 'w-full h-fit max-w-full min-h-full shrink flex flex-col',
  top: 'w-full px-4 py-3',
  bottom: 'w-full px-4 py-2',
}

const props = withDefaults(defineProps<PageProps>(), {
  asideWidth: '18rem',
  ui: () => ({}),
})

const config = mergeConfig<PageConfig>(strategy, sPage, configDefault)

const { attrs, ui } = useUI('s94.main', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>

<template>
  <div id="page" :class="ui.wrapper" v-bind="attrs">
    <div v-if="$slots.left || (props.symmetrical && $slots.right)" :class="ui.asideLeft" :style="`--aside-width: ${props.asideWidth};`">
      <slot name="left" />
    </div>
    <div :class="ui.container">
      <div v-if="$slots.top" :class="ui.top">
        <slot name="top" />
      </div>
      <slot />
      <div v-if="$slots.bottom" :class="ui.bottom">
        <slot name="bottom" />
      </div>
    </div>
    <div v-if="$slots.right || (props.symmetrical && $slots.left)" :class="ui.asideRight" :style="`--aside-width: ${props.asideWidth};`">
      <slot name="right" />
    </div>
  </div>
</template>
