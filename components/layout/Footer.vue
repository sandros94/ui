<template>
  <footer :class="ui.wrapper" v-bind="attrs">
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
          <SLinksGroup
            :links="links"
            v-if="links"
            v-bind="{
              variant: ui.linksGroup?.variant,
              ui: ui.linksGroup?.ui,
            }"
          />
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
import type {
  FooterConfig,
  FooterUi,
  FooterVariant,
  Links,
  LinksGroup,
  Strategy,
} from '#s94-ui/types'
import type { Avatar } from '#ui/types'

import SLinksGroup from '#s94-ui/components/elements/LinksGroup.vue'
import UContainer from '#ui/components/layout/Container.vue'
import UDivider from '#ui/components/layout/Divider.vue'

const { s94Ui: { footer: sFooter }, ui: { strategy } } = useAppConfig()

const configDefault: FooterConfig = {
  default: {
    variant: 'default',
  },
  variant: {
    default: {
      center: 'flex items-center justify-center gap-3',
      container: 'py-4 mt-4 mb-14 lg:mb-20 flex flex-wrap justify-around gap-3 max-w-[90rem]',
      divider: {
        border: {
          base: 'flex border-gray-200 dark:border-gray-800',
        },
        icon: {
          base: 'w-6 h-6',
        },
        label: 'text-lg',
      },
      left: 'p-2 text-lg flex flex-col gap-3',
      legal: 'py-2 flex items-center justify-center gap-3 max-w-[90rem] text-sm',
      linksGroup: {
        variant: 'centered',
      },
      logo: '',
      right: '',
      socials: {
        strategy: 'merge',
        wrapper: 'text-2xl',
      },
      wrapper: 'w-full py-2 mb-8 bg-background',
    },
  },
}

const config = mergeConfig<FooterConfig>(strategy, sFooter, configDefault)

const props = defineProps({
  class: {
    default: undefined,
    type: String as PropType<any>,
  },
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
    type: Array as PropType<LinksGroup[]>,
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
  ui: {
    default: () => ({}),
    type: Object as PropType<Partial<FooterUi> & { strategy?: Strategy }>,
  },
  variant: {
    default: undefined,
    type: String as PropType<FooterVariant>,
  },
})

const variant = props.variant ?? config.default.variant

const { attrs, ui } = useUI('s94.footer', toRef(props, 'ui'), config.variant[variant], toRef(props, 'class'))
</script>

<style scoped>

</style>
