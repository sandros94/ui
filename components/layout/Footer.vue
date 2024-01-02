<template>
  <footer :class="ui.wrapper">
    <!-- TODO: add line divider with page content by using UDivider -->
    <UContainer :class="ui.container">
      <div :class="ui.left" v-if="($slots.left || $slots.logo || title) && !hide.left">
        <slot name="left">
          <NuxtLink :class="ui.logo" :to="to" aria-label="Logo">
            <slot name="logo">
              <!-- TODO: remove default title -->
              {{ title }}
            </slot>
          </NuxtLink>
          <!-- TODO: add socials below logo/title -->
        </slot>
      </div>

      <div v-if="$slots.center && !hide.center">
        <slot name="center" />
      </div>

      <div :class="ui.right" v-if="($slots.right || links) && !hide.right">
        <slot name="right">
          <!-- TODO: create SLinksGroup component -->
          Area for links
          <!-- <SLinks
            :class="ui.center"
            :links="links"
            :ui="ui.links"
            v-if="links && !hide.center"
          /> -->
        </slot>
      </div>
    </UContainer>
    <!-- TODO: add conditional hide for legal section -->
    <UContainer :class="ui.legal">
      <slot name="legal">
        <div>
          © 1994-{{ new Date().getFullYear() }}, Made by
          <NuxtLink class="underline underline-offset-2" target="_blank" to="https://github.com/sandros94">
            Sandros94
          </NuxtLink>
        </div>
      </slot>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import type { Link, Strategy } from '#s94-ui/types'

import UContainer from '#ui/components/layout/Container.vue'

const configDefault = {
  center: 'flex items-center justify-center gap-3',
  container: 'py-4 mb-24 flex items-center justify-between gap-3 max-w-[90rem]',
  left: 'text-lg',
  legal: 'py-2 flex items-center justify-between gap-3 max-w-[90rem] text-sm',
  logo: '',
  right: '',
  wrapper: 'w-full py-2 mb-8 bg-background/75 backdrop-blur border-t border-gray-200 dark:border-gray-800',
}

const props = defineProps({
  hide: {
    default: () => ({}),
    type: Object as PropType<{
      center?: boolean
      left?: boolean
      right?: boolean
    }>,
  },
  links: {
    default: () => [],
    type: Array as PropType<Link[]>,
  },
  title: {
    default: 'S94-UI',
    type: String,
  },
  to: {
    default: '/',
    type: String,
  },
})

// TODO: finish adding ui merge
const ui = configDefault
</script>

<style scoped>

</style>
