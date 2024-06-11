<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { VariantProps as _VrPr, TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import type { Links, LinksGroup, LinksGroupVariants, LinksVariants } from '#s94-ui/types'
import type { Avatar } from '#ui/types'
import _appConfig from '#build/app.config'
import { SLinksGroup, UContainer, UDivider } from '#components'
import { computed, defineSlots } from '#imports'

export const theme = {
  slots: {
    root: 'w-full py-2 mb-8 bg-background',
    container: 'py-4 mt-4 mb-14 lg:mb-20 flex flex-col lg:flex-row justify-around gap-12 max-w-[90rem]',
    left: 'flex-1 p-2 text-lg flex flex-col gap-3 items-center',
    socialsClass: 'text-2xl w-fit',
    center: 'flex-initial flex items-center justify-center gap-3',
    right: 'flex-1 p-2',
    legal: 'py-2 flex items-center justify-center gap-3 max-w-[90rem] text-sm',
    logo: '',
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { footer: Partial<typeof theme> } }

const footer = tv({ extend: tv(theme), ...(appConfig.s94Ui.footer || {}) })

// TODO: Add slim variant
// type FooterVariants = VariantProps<typeof footer>

export interface FooterProps {
  separatorAvatar?: Avatar
  separatorIcon?: string
  separatorLabel?: string
  separator?: {
    avatar?: Avatar
    icon?: string
    label?: string
  }
  hideCenter?: boolean
  hideDefault?: boolean
  hideSeparator?: boolean
  hideLeft?: boolean
  hideLegal?: boolean
  hideRight?: boolean
  hide?: {
    center?: boolean
    default?: boolean
    separator?: boolean
    left?: boolean
    legal?: boolean
    right?: boolean
  }
  legal?: string
  links?: LinksGroup[]
  linksVariant?: LinksVariants['variant']
  linksGroupVariant?: LinksGroupVariants['variant']
  socials?: Links
  socialsVariant?: LinksVariants['variant']
  socialsClass?: any
  title?: string
  titleTo?: string
  class?: any
  // variant?: FooterVariants
  ui?: Partial<typeof footer.slots>
}

export interface FooterSlots {
  separator: any
  left: any
  logo: any
  legal: any
  socials: any
  right: any
  default: any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<FooterProps>(), {
  linksGroupVariant: 'centered',
})
const slots = defineSlots<FooterSlots>()

const _ui = computed(() => tv({ extend: footer, slots: props.ui })())
</script>

<template>
  <footer :class="_ui.root({ class: props.class })">
    <slot name="separator">
      <UDivider
        v-if="!hideSeparator || !hide?.separator"
        :avatar="separatorAvatar ?? separator?.avatar"
        :icon="separatorIcon ?? separator?.icon"
        :label="separatorLabel ?? separator?.label"
      />
    </slot>
    <UContainer v-if="(slots.left || slots.logo || title || socials || slots.default || slots.right || links) && (!hideCenter || !hide?.center)" :class="_ui.container()">
      <div v-if="(slots.left || slots.logo || title || socials) && (!hideLeft || !hide?.left)" :class="_ui.left()">
        <slot name="left">
          <NuxtLink
            v-if="title || slots.logo"
            :class="_ui.logo()"
            :to="titleTo"
            aria-label="Logo"
          >
            <slot name="logo">
              {{ title }}
            </slot>
          </NuxtLink>
          <SLinks v-if="socials" :class="_ui.socialsClass()" :links="socials" :variant="socialsVariant" />
        </slot>
      </div>

      <div v-if="slots.default && (!hideDefault || !hide?.default)">
        <slot />
      </div>

      <div v-if="(slots.right || links) && (!hideRight || !hide?.right)" :class="_ui.right()">
        <slot name="right">
          <SLinksGroup
            v-if="links"
            v-bind="{
              links,
              linksVariant: linksVariant,
              variant: linksGroupVariant,
            }"
          />
        </slot>
      </div>
    </UContainer>
    <UContainer v-if="(legal || slots.legal) && (!hideLegal || !hide?.legal)" :class="_ui.legal()">
      <slot name="legal">
        {{ legal }}
      </slot>
    </UContainer>
  </footer>
</template>
