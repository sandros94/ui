<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import { type VariantProps, tv } from 'tailwind-variants'
import type { Link as ULinkType } from '#ui/types'
import { links as theme } from '#s94-ui/themes'
import _appConfig from '#build/app.config'

import { UIcon, ULink } from '#components'

export interface Link extends ULinkType {
  icon?: string
  if?: () => boolean
  label?: string
}

export interface Links extends Array<Link> {}

const appConfig = _appConfig as AppConfig & { s94Ui: { links: Partial<typeof theme> } }

const _links = tv({ extend: tv(theme), ...(appConfig.s94Ui.links || {}) })

export type LinksVariants = VariantProps<typeof _links>

export interface LinksProps {
  externalIcon?: string
  links: Links | Ref<Links>
  variant?: LinksVariants['variant']
  vertical?: boolean
  class?: any
  ui?: Partial<typeof _links.slots>
}
</script>

<script setup lang="ts">
const props = defineProps<LinksProps>()

const filteredLinks = computed(() => unref(props.links).filter(link => link.if ? link.if() : true))

const ui = computed(() => tv({ extend: _links, slots: props.ui })({
  vertical: props.vertical,
  variant: props.variant,
}))
</script>

<template>
  <nav v-if="filteredLinks" :class="ui.root({ class: props.class })">
    <ULink
      v-for="(link, index) in filteredLinks"
      :key="index"
      :active-class="ui.active()"
      :class="ui.base()"
      :inactive-class="ui.inactive()"
      :target="link.target"
      :to="link.to"
    >
      <slot name="label">
        <span :class="ui.labelRoot()">
          <UIcon
            v-if="link.icon"
            :class="ui.iconClass()"
            :name="link.icon"
          />
          <span v-if="link.label" :class="ui.labelBase()">
            {{ link.label }}
          </span>
          <sup v-if="link.label && link.target === '_blank'" :class="ui.externalLinkBase()">
            <UIcon
              :class="ui.externalLinkIconClass()"
              :name="externalIcon ?? ui.externalIcon()"
            />
          </sup>
        </span>
      </slot>
    </ULink>
  </nav>
</template>
