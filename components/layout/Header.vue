<template>
  <header :class="ui.wrapper" v-bind="attrs">
    <UContainer :class="ui.container">
      <div v-if="!hide.left" :class="ui.left">
        <slot name="left">
          <NuxtLink :class="ui.logo" :to="titleTo" aria-label="Logo">
            <slot name="logo">
              {{ title }}
            </slot>
          </NuxtLink>
        </slot>
      </div>

      <slot name="center">
        <SLinks
          v-if="links && !hide.center"
          :class="ui.center"
          :links="links"
          :ui="ui.links"
        />
      </slot>

      <div v-if="!hide.right" :class="ui.right">
        <slot name="right">
          <SLinks
            v-if="socials && hide.socials !== true"
            :class="hide.socials ? hideSocialsMap[hide.socials] : undefined"
            :links="socials"
            :ui="ui.socials"
          />
        </slot>

        <slot :open="isMenuOpen" name="panel-button">
          <UButton
            v-if="!hide.panel"
            :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Menu`"
            :class="ui.mobileButton?.base"
            :icon="isMenuOpen ? mobileButtonIcon.close : mobileButtonIcon.open"
            color="gray"
            size="xl"
            variant="ghost"
            @click="isMenuOpen = !isMenuOpen"
          />
        </slot>
      </div>
    </UContainer>

    <USlideover
      v-if="!hide.panel"
      v-bind="{
        side: ui.panel?.slideover?.side,
        ui: ui.panel?.slideover,
      }"
      v-model="isMenuOpen"
    >
      <slot name="panel">
        <SCard :ui="ui.panel?.card">
          <template #header>
            <slot name="left">
              <NuxtLink :class="ui.logo" :to="titleTo" aria-label="Logo">
                <slot name="logo">
                  {{ title }}
                </slot>
              </NuxtLink>
            </slot>
            <UButton
              :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Menu`"
              :class="ui.mobileButton?.base"
              :icon="isMenuOpen ? mobileButtonIcon.close : mobileButtonIcon.open"
              color="gray"
              size="xl"
              variant="ghost"
              @click="isMenuOpen = !isMenuOpen"
            />
          </template>
          <slot name="panel-center">
            <div :class="ui.panel?.card?.panelCenter">
              <SLinks
                v-if="links"
                :class="ui.panel?.card?.links"
                :links="links"
                :ui="ui.links"
                vertical
              />
            </div>
          </slot>
          <template #footer>
            <SLinks v-if="socials" :links="socials" :ui="ui.socials" />
          </template>
        </SCard>
      </slot>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
import type { AppConfig } from 'nuxt/schema'
import { twMerge } from 'tailwind-merge'
import SLinks from '../elements/Links.vue'
import type {
  HeaderConfig,
  HeaderUi,
  HeaderVariant,
  Links,
  Strategy,
} from '#s94-ui/types'

import { UButton, UContainer, USlideover } from '#components'

const { s94Ui: { main: sHeader }, ui: { strategy } } = useAppConfig() as AppConfig & { s94Ui: { main: HeaderConfig } }

const headerConfigDefault: HeaderConfig = {
  default: {
    mobileButton: {
      icon: {
        close: 'i-ph-x',
        open: 'i-ph-list',
      },
    },
    variant: 'default',
  },
  variant: {
    default: {
      center: 'hidden lg:flex text-lg',
      container: 'flex items-center justify-between gap-3 h-[--header-height] max-w-[90rem]',
      left: 'lg:flex-1 flex items-center gap-1.5 text-2xl truncate',
      logo: 'flex-shrink-0 font-bold text-gray-900 dark:text-white flex items-end gap-1.5 break-keep',
      mobileButton: {
        base: 'lg:hidden',
      },
      panel: {
        card: {
          footer: 'w-full py-8 mx-auto text-2xl',
          header: 'w-full h-[--header-height] inline-flex items-center justify-between border-b border-gray-200 dark:border-gray-800 text-2xl',
          links: 'text-2xl gap-y-3 -mt-[--header-height]',
          panelCenter: 'max-w-full w-fit h-full pt-[--header-height] m-auto text-xl flex items-center',
        },
        slideover: {
          background: 'bg-background dark:bg-background',
          overlay: {
            background: 'bg-background/75 dark:bg-background/75',
          },
        },
      },
      right: 'flex items-center justify-end lg:flex-1 gap-2',
      socials: {
        wrapper: 'w-fit',
      },
      wrapper: 'w-full bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px text-xl',
    },
    rtl: {
      container: 'flex-row-reverse',
      left: 'flex-row-reverse',
      panel: {
        card: {
          header: 'flex-row-reverse',
          footer: 'inline-flex justify-center',
        },
        slideover: {
          side: 'left',
        },
      },
      right: 'flex-row-reverse',
    },
  },
}

const configDefault = mergeConfig<HeaderConfig>(strategy, sHeader, headerConfigDefault)

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
    type: Array as PropType<Links>,
  },
  socials: {
    default: () => [],
    type: Array as PropType<Links>,
  },
  sticky: {
    default: false,
    type: Boolean,
  },
  title: {
    default: 'S94-UI',
    type: String,
  },
  titleTo: {
    default: '/',
    type: String,
  },
  ui: {
    default: () => ({}),
    type: Object as PropType<Partial<HeaderUi> & { strategy?: Strategy }>,
  },
  variant: {
    default: undefined,
    type: String as PropType<HeaderVariant>,
  },
})

const hideSocialsMap = {
  desktop: 'lg:hidden',
  mobile: 'hidden lg:flex',
}

const variant = props.variant ?? configDefault.default.variant

const config = mergeConfig<HeaderUi>('merge', configDefault.variant[variant], configDefault.variant.default)
config.wrapper = twMerge(config.wrapper, props.sticky ? 'sticky top-0 z-50' : '')

const { attrs, ui } = useUI('s94.header', toRef(props, 'ui'), config, toRef(props, 'class'), true)

const mobileButtonIcon = {
  close: ui.value.mobileButton.icon?.close ?? configDefault.default.mobileButton?.icon?.close,
  open: ui.value.mobileButton.icon?.open ?? configDefault.default.mobileButton?.icon?.open,
}

const route = useRoute()
const isMenuOpen = ref(false)

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
</script>
