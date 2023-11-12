<template>
  <nav class="not-prose">
    <ul :class="ui.wrapper" v-bind="attrs">
      <li v-for="(link, index) in links" :key="index">
        <ULink
          :to="link.to"
          :class="ui.base"
          :active-class="ui.active"
          :inactive-class="ui.inactive"
        >
          {{ link.label }}
          <UIcon
            v-if="link.target === '_blank'"
            name="i-ph-arrow-up-right-light"
            :class="ui.externalLink"
          />
        </ULink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { Link } from '#s94-ui/types'

const defaultConfig = {
  active: 'text-primary underline underline-offset-[10%]',
  inactive: '',
  wrapper: 'flex items-center gap-x-4 text-sm/6 font-semibold',
  base: 'flex items-center gap-1 relative hover:underline underline-offset-[10%]',
  externalLink: 'aliased linkExternalArrow text-gray-400 dark:text-gray-500'
}

const props = defineProps<{
  links?: Link[],
  ui?: typeof defaultConfig,
  class?: any
}>()

const { ui, attrs } = useUI('s94.links.horizontal', toRef(props, 'ui'), defaultConfig, toRef(props, 'class'))
</script>
