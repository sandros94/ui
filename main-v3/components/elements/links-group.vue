<script lang="ts">
import { toValue } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { VariantProps, TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import SLinks from './links.vue'
import type { Links, LinksVariants } from '#s94-ui/types'
import _appConfig from '#build/app.config'
import { type Ref, computed, defineSlots } from '#imports'

export const theme = {
  slots: {
    root: 'flex flex-wrap gap-4',
    base: 'p-2 w-fit',
    label: 'pb-2 text-lg uppercase',
    linksRoot: '',
    linksBase: '',
  },
  variants: {
    variant: {
      centered: {
        root: 'justify-center',
        base: 'text-center',
        linksBase: 'mx-auto',
      },
      rtl: {
        base: 'text-right',
        linksBase: 'ml-auto',
      },
    },
  },
} satisfies Parameters<TV>[0]

export interface LinksGroup {
  label?: string
  links: Links
}

const appConfig = _appConfig as AppConfig & { s94Ui: { links: Partial<typeof theme> } }

const linksGroup = tv({ extend: tv(theme), ...(appConfig.s94Ui.links || {}) })

export type LinksGroupVariants = VariantProps<typeof linksGroup>

export interface LinksGroupProps {
  links: LinksGroup[] | Ref<LinksGroup[]>
  linksVariant?: LinksVariants['variant']
  variant?: LinksGroupVariants['variant']
  class?: any
  ui?: Partial<typeof linksGroup.slots>
}

export interface LinksGroupSlots {
  label(props: { label?: string }): any
  links(props: { links?: Links }): any
  default(props: { index?: number, linksGroup?: LinksGroup }): any
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<LinksGroupProps>(), {
  linksVariant: 'default',
})
const slots = defineSlots<LinksGroupSlots>()

const ui = computed(() => tv({ extend: linksGroup, slots: props.ui })({
  variant: props.variant,
}))
</script>

<template>
  <nav v-if="links" :class="ui.root({ class: props.class })">
    <div v-for="(lG, index) of toValue(links)" :key="index" :class="ui.base()">
      <slot :index="index" :links-group="lG">
        <div v-if="lG.label || slots.label({ label: lG.label })" :class="ui.label()">
          <slot name="label" :label="lG.label">
            {{ lG.label }}
          </slot>
        </div>
        <slot name="links" :links="lG.links">
          <SLinks
            :links="lG.links"
            :ui="{
              root: ui.linksRoot(),
              base: ui.linksBase(),
            }"
            :variant="props.linksVariant"
            vertical
          />
        </slot>
      </slot>
    </div>
  </nav>
</template>
