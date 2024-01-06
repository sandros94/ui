<template>
  <nav :class="ui.wrapper" v-bind="attrs">
    <ULink
      :active-class="ui.active"
      :class="ui.base"
      :inactive-class="ui.inactive"
      :key="index"
      :target="link.target"
      :to="link.to"
      v-for="(link, index) in filteredLinks"
    >
      <slot name="label">
        <span :class="ui.label.wrapper">
          <UIcon
            :class="ui.iconClass"
            :name="link.icon"
            v-if="link.icon"
          />
          <span :class="ui.label.base" v-if="link.label">
            {{ link.label }}
          </span>
          <sup :class="ui.externalLink.base" v-if="link.label && link.target === '_blank'">
            <UIcon
              :class="ui.externalLink.iconClass"
              :name="externalIcon ?? configDefault.default.externalIcon"
            />
          </sup>
        </span>
      </slot>
    </ULink>
  </nav>
</template>

<script setup lang="ts">
import type {
  Links,
  LinksConfig,
  LinksUi,
  LinksVariant,
  Strategy,
} from '#s94-ui/types'

import { mergeConfig } from '#s94-ui/utils'
import UIcon from '#ui/components/elements/Icon.vue'
import ULink from '#ui/components/elements/Link.vue'

const { s94Ui: { links: sLinks }, ui: { strategy } } = useAppConfig()

const linksConfigDefault: LinksConfig = {
  default: {
    variant: 'line',
    externalIcon: 'i-ph-arrow-up-right-light',
  },

  variant: {
    horizontal: {
      default: {
        active: 'underline underline-offset-[10%]',
        base: 'relative inline-flex gap-x-2 font-light hover:underline underline-offset-[10%] decoration-from-font',
        externalLink: {
          base: 'static top-0 -mx-1 h-fit',
          iconClass: 'subpixel-antialiased text-gray-700 dark:text-gray-300',
        },
        iconClass: 'place-self-center',
        inactive: '',
        label: {
          wrapper: 'relative inline-flex max-w-full gap-x-1',
          base: '',
        },
        wrapper: 'not-prose flex items-center gap-x-4',
      },
      line: {
        active: 'text-primary',
        inactive: 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white',
      },
    },
    vertical: {
      default: {
        active: '',
        base: 'max-w-full group relative',
        externalLink: {
          base: 'absolute top-0 right-0 translate-x-full h-fit',
          iconClass: 'subpixel-antialiased text-gray-700 dark:text-gray-300',
        },
        iconClass: 'place-self-center',
        inactive: '',
        label: {
          wrapper: 'relative inline-flex max-w-full gap-x-2',
          base: 'max-w-full truncate',
        },
        wrapper: 'not-prose max-w-[inherit] flex flex-col items-start gap-y-2 font-light',
      },
      line: {
        active: 'text-primary border-current',
        base: 'pl-4 -ml-[1px] mr-[1px] border-s',
        inactive: 'border-transparent hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white',
        wrapper: 'border-s border-gray-200 dark:border-gray-800',
      },
    },
  },
}

const props = defineProps<{
  class?: any
  externalIcon?: string
  links: Links | Ref<Links>
  ui?: Partial<LinksUi> & { strategy?: Strategy }
  variant?: LinksVariant
  vertical?: boolean
  verticalPadding?: string
}>()

const configDefault = mergeConfig<LinksConfig>(strategy, sLinks, linksConfigDefault)

const direction = props.vertical ? 'vertical' : 'horizontal'
const variant = props.variant ?? configDefault.default.variant

const config = mergeConfig<LinksUi>('merge', configDefault.variant[direction][variant], configDefault.variant[direction].default)

const { attrs, ui } = useUI('s94.links', toRef(props, 'ui'), config, toRef(props, 'class'))

const filteredLinks = computed(() => unref(props.links).filter(link => link.if ? link.if() : true))
</script>
