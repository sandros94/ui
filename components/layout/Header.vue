<template>
  <header :class="ui.wrapper" v-bind="attrs">
    <UContainer :class="ui.container">
      <div :class="ui.left" v-if="!hide.left">
        <slot name="left">
          <NuxtLink :class="ui.logo" :to="to" aria-label="Logo">
            <slot name="logo">
              {{ title }}
            </slot>
          </NuxtLink>
        </slot>
      </div>

      <slot name="center">
        <SLinks
          :class="ui.center"
          :links="links"
          :ui="ui.links"
          v-if="links && !hide.center"
        />
      </slot>

      <div :class="ui.right" v-if="!hide.right">
        <slot name="right">
          <SLinks
            :class="hide.socials ? hideSocialsMap[hide.socials] : undefined"
            :links="socials"
            :ui="ui.socials"
            v-if="socials && hide.socials !== true"
          />
        </slot>

        <slot :open="isMenuOpen" name="panel-button">
          <UButton
            :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Menu`"
            :class="ui.button.base"
            :icon="isMenuOpen ? ui.button.icon.close : ui.button.icon.open"
            @click="isMenuOpen = !isMenuOpen"
            color="gray"
            size="xl"
            v-if="!hide.panel && (links.length || $slots.panel)"
            variant="ghost"
          />
        </slot>
      </div>
    </UContainer>

    <USlideover :ui="ui.panel.slideover" v-if="!hide.panel" v-model="isMenuOpen">
      <slot name="panel">
        <SCard :ui="ui.panel.card">
          <template #header>
            <slot name="left">
              <NuxtLink :class="ui.logo" :to="to" aria-label="Logo">
                <slot name="logo">
                  {{ title }}
                </slot>
              </NuxtLink>
            </slot>
            <UButton
              :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Menu`"
              :class="ui.button.base"
              :icon="isMenuOpen ? ui.button.icon.close : ui.button.icon.open"
              @click="isMenuOpen = !isMenuOpen"
              color="gray"
              size="xl"
              v-if="links.length || $slots.panel"
              variant="ghost"
            />
          </template>
          <slot name="panel-center">
            <div :class="ui.panel.card.center">
              <SLinks
                :class="ui.panel.card.links"
                :links="links"
                :ui="ui.links"
                v-if="links"
                vertical
              />
            </div>
          </slot>
          <template #footer>
            <SLinks :links="socials" :ui="ui.socials" v-if="socials" />
          </template>
        </SCard>
      </slot>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
import type { HeaderConfig, HeaderUi, Link, Strategy } from '#s94-ui/types'

import UButton from '#ui/components/elements/Button.vue'
import UContainer from '#ui/components/layout/Container.vue'
import USlideover from '#ui/components/overlays/Slideover.vue'
import { twMerge } from 'tailwind-merge'

import SLinks from '../elements/Links.vue'

const { s94Ui: { main: sHeader }, ui: { strategy } } = useAppConfig()

const configDefault: HeaderConfig = {
  button: {
    base: 'lg:hidden',
    icon: {
      close: 'i-ph-x',
      open: 'i-ph-list',
    },
  },
  center: 'hidden lg:flex text-lg',
  container: 'flex items-center justify-between gap-3 h-[--header-height] max-w-[90rem]',
  left: 'lg:flex-1 flex items-center gap-1.5 text-2xl',
  logo: 'flex-shrink-0 font-bold text-gray-900 dark:text-white flex items-end gap-1.5 break-keep',
  panel: {
    card: {
      center: 'max-w-full w-fit h-full pt-[--header-height] m-auto text-xl flex items-center',
      footer: 'py-8 mx-auto text-2xl',
      header: 'w-full h-[--header-height] inline-flex items-center justify-between border-b border-gray-200 dark:border-gray-800 text-2xl',
      links: 'text-2xl gap-y-3 -mt-[--header-height]',
    },
    slideover: {
      overlay: {
        background: 'bg-gray-50/75 dark:bg-gray-950/75',
      },
    },
  },
  right: 'flex items-center justify-end lg:flex-1 gap-2',
  wrapper: 'w-full bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px text-xl',
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  class: {
    default: () => '',
    type: [String, Object, Array] as PropType<any>,
  },
  hide: {
    default: () => ({
      center: false,
      left: false,
      panel: false,
      right: false,
      socials: undefined,
    }),
    type: Object as PropType<{
      center?: boolean
      left?: boolean
      panel?: boolean
      right?: boolean
      socials?: 'desktop' | 'mobile' | boolean
    }>,
  },
  links: {
    default: () => [],
    type: Array as PropType<Link[]>,
  },
  socials: {
    default: () => [],
    type: Array as PropType<Link[]>,
  },
  sticky: {
    default: true,
    type: Boolean,
  },
  title: {
    default: 'S94-UI',
    type: String,
  },
  to: {
    default: '/',
    type: String,
  },
  ui: {
    default: () => ({}),
    type: Object as PropType<Partial<HeaderUi> & { strategy?: Strategy }>,
  },
})

const config = mergeConfig<HeaderConfig>(strategy, sHeader, configDefault)

const hideSocialsMap = {
  desktop: 'lg:hidden',
  mobile: 'hidden lg:flex',
}

config.wrapper = twMerge(config.wrapper, props.sticky ? 'sticky top-0 z-50' : '')

const { attrs, ui } = useUI('s94.header', toRef(props, 'ui'), config, toRef(props, 'class'), true)

const route = useRoute()
const isMenuOpen = ref(false)

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
</script>
