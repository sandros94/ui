<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { VariantProps, TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import _appConfig from '#build/app.config'
import type { LinkProps } from '#ui/types'
import { UIcon, ULink } from '#components'
import {
  type Ref,
  unref,
  computed,
} from '#imports'

export const theme = {
  slots: {
    root: 'not-prose flex items-center',
    active: 'text-[var(--ui-primary)]',
    inactive: '',
    base: 'relative inline-flex gap-x-2 font-light',
    externalLinkBase: 'top-0 h-fit',
    externalLinkIconClass: 'subpixel-antialiased',
    iconClass: 'place-self-center',
    labelRoot: 'relative inline-flex max-w-full',
    labelBase: '',
  },
  variants: {
    vertical: {
      false: {
        root: 'gap-x-4',
        active: 'underline underline-offset-[10%]',
        base: 'hover:underline underline-offset-[10%] decoration-from-font',
        externalLinkBase: 'static -mx-1',
        labelRoot: 'gap-x-1',
      },
      true: {
        root: 'max-w-[inherit] flex-col items-start gap-y-2 font-light',
        base: 'max-w-full group',
        externalLinkBase: 'absolute right-0 translate-x-full',
        labelRoot: 'gap-x-2',
        labelBase: 'max-w-full truncate',
      },
    },
    variant: {
      default: {},
      line: {},
      elegant: {
        root: 'gap-x-8 gap-y-5 w-fit mx-auto',
        active: 'no-underline bg-[length:100%_1px]',
        base: 'hover:no-underline font-normal border-b-0 bg-gradient-to-r bg-no-repeat transition-all duration-200 ease-in-out bg-[length:0px_1px] bg-bottom hover:bg-[length:100%_1px] from-current to-current mx-auto',
      },
    },
  },
  compoundVariants: [
    {
      vertical: true,
      variant: 'line' as const,
      class: {
        root: 'border-s border-[var(--ui-border)]',
        active: 'border-current',
        base: 'pl-4 -ml-[1px] mr-[1px] border-s',
        inactive: 'border-transparent hover:border-black dark:hover:border-white',
      },
    },
    {
      vertical: true,
      variant: 'default' as const,
      class: {
        base: 'hover:underline underline-offset-[10%] decoration-from-font',
      },
    },
  ],
  defaultVariants: {
    vertical: false,
    variant: 'line' as const,
  },
} satisfies Omit<Parameters<TV>[0], 'compoundVariants' | 'defaultVariants'> & { compoundVariants: any, defaultVariants: any }

export interface Link extends LinkProps {
  icon?: string
  if?: () => boolean
  label?: string
}

export type Links = Array<Link>

const appConfig = _appConfig as AppConfig & { s94Ui: { links: Partial<typeof theme> } }

const _links = tv({ extend: tv(theme), ...(appConfig.s94Ui.links || {}) })

export type LinksVariants = VariantProps<typeof _links>

export interface LinksProps {
  externalIcon?: string
  links?: Links | Ref<Links>
  variant?: LinksVariants['variant']
  vertical?: boolean
  class?: any
  ui?: Partial<typeof _links.slots>
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<LinksProps>(), {
  externalIcon: 'i-heroicons-arrow-up-right-20-solid',
})

const filteredLinks = computed(() => unref(props.links || []).filter(link => link.if ? link.if() : true))

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
              :name="externalIcon"
            />
          </sup>
        </span>
      </slot>
    </ULink>
  </nav>
</template>

<style scoped>
.menu-border {
  background-size: 50% 1px;
  background-image: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
  background-position: 0% 100%, 100% 0%;
  background-repeat: no-repeat, no-repeat;
}
</style>
