<template>
  <ul :class="ui.wrapper" v-bind="attrs">
    <li v-for="(link, index) in links" :key="index">
      <ULink
        :to="link.to"
        :class="ui.base"
        :active-class="ui.active"
        :inactive-class="ui.inactive"
        :ui="{active: 'text-primary'}"
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
</template>

<script setup lang="ts">
import type { Link } from '#s94-ui/types'

const defaultConfig = {
  active: 'text-primary underline underline-offset-[10%]',
  inactive: '',
  wrapper: 'flex items-center gap-x-4 text-sm/6 font-semibold',
  base: 'flex items-center gap-1 relative hover:underline underline-offset-[10%]',
  externalLink: 'aliased externalArrow text-gray-400 dark:text-gray-500'
}

const props = defineProps<{
  links?: Link[],
  ui?: typeof defaultConfig,
  class?: any
}>()

const { ui, attrs } = useUI('s94.links', toRef(props, 'ui'), defaultConfig, toRef(props, 'class'))
</script>

<style scoped>
.externalArrow {
  width: auto;
  height: 50%;
  aspect-ratio: 1;
  position: absolute;
  top: 10%;
  transform: translate(100%);
  right: 0%;
}
</style>
