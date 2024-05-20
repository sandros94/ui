<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import { type VariantProps as _VrPr, tv } from 'tailwind-variants'
import { toRefs } from '@vueuse/core'
import type { DeepPartial, Links, LinksProps, LinksGroup, LinksGroupProps, LinksGroupVariants } from '#s94-ui/types'
import { footer as theme } from '#s94-ui/themes'
import type { Avatar } from '#ui/types'
import type { divider } from '#ui/ui.config'
import _appConfig from '#build/app.config'
import { SLinksGroup, UContainer, UDivider } from '#components'

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
  linksGroupVariant?: LinksGroupVariants['variant']
  socials?: Links
  socialsClass?: any
  title?: string
  titleTo?: string
  class?: any
  // variant?: FooterVariants
  ui?: Partial<typeof footer.slots> & {
    socials?: LinksProps['ui']
    linksGroup?: LinksGroupProps['ui']
    separator?: DeepPartial<typeof divider>
  }
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
const props = defineProps<FooterProps>()
const slots = defineSlots<FooterSlots>()

const { socials: socUI, linksGroup: lGUI, separator: sepUI, ..._uiFooter } = toRefs(props.ui ?? {})
const uiFooter = reactive(_uiFooter)

const _ui = computed(() => tv({ extend: footer, slots: uiFooter })())
</script>

<template>
  <footer :class="_ui.root({ class: props.class })">
    <slot name="separator">
      <UDivider
        v-if="!hideSeparator || !hide?.separator"
        :avatar="separatorAvatar ?? separator?.avatar"
        :icon="separatorIcon ?? separator?.icon"
        :label="separatorLabel ?? separator?.label"
        :ui="socUI"
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
          <SLinks v-if="socials" :class="_ui.socialsClass()" :links="socials" :ui="socUI" />
        </slot>
      </div>

      <div v-if="slots.default && (!hideDefault || !hide?.default)">
        <slot />
      </div>

      <div v-if="(slots.right || links) && (!hideRight || !hide?.right)" :class="_ui.right()">
        <slot name="right">
          <SLinksGroup
            v-if="links"
            :links="links"
            v-bind="{
              variant: linksGroupVariant,
              ui: lGUI,
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
