<template>
  <nav :class="ui.wrapper" v-bind="attrs">
    <ULink
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      :target="link.target"
      :class="ui.base"
      :style="{
        paddingLeft: vertical ? (padding ?? '1rem') : '0',
      }"
      :active-class="ui.active"
      :inactive-class="ui.inactive"
    >
      <p :class="ui.label">
        {{ link.label }}
      </p>
      <sup v-if="link.target === '_blank'" class="h-fit top-0">
        <UIcon
          name="i-ph-arrow-up-right-light"
          :class="ui.externalLink"
        />
      </sup>
    </ULink>
  </nav>
</template>

<script setup lang="ts">
import type { Link } from '#s94-ui/types'

interface DefaultConfig {
  active: string,
  inactive: string,
  wrapper: string,
  base: string,
  label: string,
  externalLink: string
}

const props = defineProps<{
  links: Link[],
  ui?: DefaultConfig,
  class?: any,
  vertical?: boolean,
  padding?: string
}>()

const horizontalConfig: DefaultConfig = {
  active: 'text-primary underline underline-offset-[10%]',
  inactive: '',
  wrapper: 'flex items-center gap-x-3 text-sm/6 font-semibold',
  base: 'relative inline-flex gap-x-1 hover:underline underline-offset-[10%]',
  label: '',
  externalLink: 'aliased text-gray-400 dark:text-gray-500 -ml-1'
}

const verticalConfig: DefaultConfig = {
  active: 'text-primary border-current font-semibold',
  inactive: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white',
  wrapper: 'flex flex-col items-start gap-y-1 border-s border-gray-200 dark:border-gray-800',
  base: 'w-full -ml-[1px] mr-[1px] border-s group relative inline-flex gap-x-1',
  label: 'py-[2%] truncate',
  externalLink: 'aliased text-gray-400 dark:text-gray-500'
}

const { ui, attrs } = useUI('s94.links.horizontal', toRef(props, 'ui'), (props.vertical ? verticalConfig : horizontalConfig), toRef(props, 'class'))
</script>
