<template>
  <footer :class="ui.wrapper">
    <slot name="divider">
      <UDivider
        :avatar="dividerAvatar"
        :icon="dividerIcon"
        :label="dividerLabel"
        :ui="ui.divider"
        v-if="!hide.divider"
      />
    </slot>
    <UContainer :class="ui.container">
      <div :class="ui.left" v-if="($slots.left || $slots.logo || title || socials) && !hide.left">
        <slot name="left">
          <NuxtLink
            :class="ui.logo"
            :to="titleTo"
            aria-label="Logo"
            v-if="title || $slots.logo"
          >
            <slot name="logo">
              {{ title }}
            </slot>
          </NuxtLink>
          <SLinks :links="socials" :ui="ui.socials" v-if="socials" />
        </slot>
      </div>

      <div v-if="$slots.default && !hide.default">
        <slot />
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
    <UContainer :class="ui.legal" v-if="(legal || $slots.legal) && !hide.legal">
      <slot name="legal">
        {{ legal }}
      </slot>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import type { FooterUi, Links, Strategy } from '#s94-ui/types'
import type { Avatar } from '#ui/types'

import UContainer from '#ui/components/layout/Container.vue'
import UDivider from '#ui/components/layout/Divider.vue'

const configDefault: FooterUi = {
  center: 'flex items-center justify-center gap-3',
  container: 'py-4 mb-24 flex flex-wrap items-center justify-between gap-3 max-w-[90rem]',
  divider: {
    border: {
      base: 'flex border-gray-200 dark:border-gray-800',
    },
    icon: {
      base: 'w-6 h-6',
    },
    label: 'text-lg',
  },
  left: 'text-lg flex flex-col gap-3',
  legal: 'py-2 flex items-center justify-center gap-3 max-w-[90rem] text-sm',
  logo: '',
  right: '',
  socials: {
    strategy: 'merge',
    wrapper: 'text-2xl',
  },
  wrapper: 'w-full py-2 mb-8 bg-background/75 backdrop-blur',
}

const props = defineProps({
  dividerAvatar: {
    default: null,
    type: Object as PropType<Avatar>,
  },
  dividerIcon: {
    default: '',
    type: String,
  },
  dividerLabel: {
    default: '',
    type: String,
  },
  hide: {
    default: () => ({}),
    type: Object as PropType<{
      default?: boolean
      divider?: boolean
      left?: boolean
      legal?: boolean
      right?: boolean
    }>,
  },
  legal: {
    default: null,
    type: String,
  },
  links: {
    default: () => [],
    type: Array as PropType<Links>,
  },
  socials: {
    default: () => [],
    type: Array as PropType<Links>,
  },
  title: {
    default: null,
    type: String,
  },
  titleTo: {
    default: '/',
    type: String,
  },
})

// TODO: finish adding ui merge
const ui = configDefault
</script>

<style scoped>

</style>
