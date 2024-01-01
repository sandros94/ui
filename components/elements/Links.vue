<template>
  <nav :class="ui.wrapper" v-bind="attrs">
    <ULink
      :active-class="ui.active"
      :class="ui.base"
      :inactive-class="ui.inactive"
      :key="index"
      :style="{
        paddingLeft: vertical ? (verticalPadding ?? '1rem') : '0',
      }"
      :target="link.target"
      :to="link.to"
      v-for="(link, index) in filteredLinks"
    >
      <slot name="label">
        <span class="inline-flex max-w-full gap-x-2">
          <UIcon
            :class="ui.iconClass"
            :name="link.icon"
            v-if="link.icon"
          />
          <span :class="ui.label" v-if="link.label">
            {{ link.label }}
          </span>
          <sup class="top-0 -ml-1.5 h-fit" v-if="link.label && link.target === '_blank'">
            <UIcon
              :class="ui.externalLink"
              name="i-ph-arrow-up-right-light"
            />
          </sup>
        </span>
      </slot>
    </ULink>
  </nav>
</template>

<script setup lang="ts">
import type {
  Link,
  LinksConfig,
  LinksUi,
  LinksVariant,
  Strategy,
} from '#s94-ui/types'

import { mergeConfig } from '#s94-ui/utils'

const { s94Ui, ui: uiConfig } = useAppConfig()

const linksDefaultConfigs: LinksConfig = {
  default: {
    variant: 'line',
  },

  variant: {
    horizontal: {
      default: {
        active: 'underline underline-offset-[10%]',
        base: 'relative inline-flex gap-x-2 font-light hover:underline underline-offset-[10%] decoration-from-font',
        externalLink: 'aliased text-gray-400 dark:text-gray-500',
        iconClass: 'place-self-center',
        inactive: '',
        label: '',
        wrapper: 'not-prose flex items-center gap-x-3',
      },
      line: {
        active: 'text-primary',
        inactive: 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white',
      },
    },
    vertical: {
      default: {
        active: '',
        base: 'w-full group relative',
        externalLink: 'aliased text-gray-400 dark:text-gray-500',
        iconClass: 'place-self-center',
        inactive: '',
        label: 'max-w-full truncate',
        wrapper: 'not-prose max-w-[inherit] flex flex-col items-start gap-y-2 font-light',
      },
      line: {
        active: 'text-primary border-current',
        base: '-ml-[1px] mr-[1px] border-s',
        inactive: 'border-transparent hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white',
        wrapper: 'border-s border-gray-200 dark:border-gray-800',
      },
    },
  },
}

const props = defineProps<{
  class?: any
  links: Link[] | Ref<Link[]>
  ui?: Partial<LinksUi> & { strategy?: Strategy }
  variant?: LinksVariant
  vertical?: boolean
  verticalPadding?: string
}>()

const configDefaults = mergeConfig<typeof linksDefaultConfigs>(uiConfig.strategy, s94Ui.links, linksDefaultConfigs)

const direction = props.vertical ? 'vertical' : 'horizontal'
const variant = props.variant ?? configDefaults.default.variant

const config = mergeConfig<LinksUi>('merge', configDefaults.variant[direction][variant], configDefaults.variant[direction].default)

const { attrs, ui } = useUI('s94.links', toRef(props, 'ui'), config, toRef(props, 'class'))

const filteredLinks = computed(() => unref(props.links).filter(link => link.if ? link.if() : true))
</script>
