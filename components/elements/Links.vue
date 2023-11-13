<template>
  <nav :class="ui.wrapper" v-bind="attrs">
    <ULink
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      :target="link.target"
      :class="ui.base"
      :style="{
        paddingLeft: vertical ? (verticalPadding ?? '1rem') : '0',
      }"
      :active-class="ui.active"
      :inactive-class="ui.inactive"
    >
      <UIcon
        v-if="link.icon"
        :name="link.icon"
        :class="ui.iconClass"
      />
      <p v-if="link.label" :class="ui.label">
        {{ link.label }}
      </p>
      <sup v-if="link.label && link.target === '_blank'" class="h-fit top-0">
        <UIcon
          name="i-ph-arrow-up-right-light"
          :class="ui.externalLink"
        />
      </sup>
    </ULink>
  </nav>
</template>

<script setup lang="ts">
import { mergeConfig } from '#s94-ui/utils'
import type { Link } from '#s94-ui/types'

interface DefaultConfig {
  active: string,
  inactive: string,
  wrapper: string,
  base: string,
  label: string,
  iconClass: string,
  externalLink: string
}

const props = defineProps<{
  links: Link[],
  ui?: DefaultConfig,
  class?: any,
  variant?: 'line' | 'ghost',
  vertical?: boolean,
  verticalPadding?: string
}>()

const horizontalGhost: DefaultConfig = {
  wrapper: 'not-prose flex items-center gap-x-3',
  base: 'relative inline-flex gap-x-1 hover:underline underline-offset-[10%]',
  label: '',
  iconClass: 'm-[2%]',
  active: 'font-semibold underline underline-offset-[10%]',
  inactive: 'font-light',
  externalLink: 'aliased text-gray-400 dark:text-gray-500 -ml-1'
}

const horizontalLine: Partial<DefaultConfig> = {
  active: 'text-primary',
  inactive: 'text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white'
}

const verticalGhost: DefaultConfig = {
  wrapper: 'not-prose flex flex-col items-start gap-y-1',
  base: 'w-full group relative inline-flex gap-x-1',
  label: 'py-[2%] truncate',
  iconClass: 'm-[2%]',
  active: 'font-semibold',
  inactive: 'font-light',
  externalLink: 'aliased text-gray-400 dark:text-gray-500'
}

const verticalLine: Partial<DefaultConfig> = {
  wrapper: 'border-s border-gray-200 dark:border-gray-800',
  base: '-ml-[1px] mr-[1px] border-s',
  active: 'text-primary border-current',
  inactive: 'border-transparent hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
}

const configMap = {
  horizontal: {
    ghost: horizontalGhost,
    line: horizontalLine
  },
  vertical: {
    ghost: verticalGhost,
    line: verticalLine
  }
}

const direction = props.vertical ? 'vertical' : 'horizontal'
const variant = props.variant ?? 'line'

const config = mergeConfig<DefaultConfig>('merge', configMap[direction][variant], configMap[direction].ghost)

const { ui, attrs } = useUI('s94.links.horizontal', toRef(props, 'ui'), config, toRef(props, 'class'))
</script>
