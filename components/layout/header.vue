<script lang="ts">
import type { AppConfig } from 'nuxt/schema'
import type { VariantProps, TV } from 'tailwind-variants'
import { tv } from 'tailwind-variants'
import { toRefs } from '@vueuse/core'

import { SLinks, UButton, UContainer, USlideover } from '#components'
import _appConfig from '#build/app.config'
import type { Links, LinksVariants } from '#s94-ui/types'

export const theme = {
  slots: {
    root: 'w-full bg-background/75 backdrop-blur text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 -mb-px text-xl',
    container: 'flex items-center justify-between gap-3 h-[--header-height] max-w-[90rem]',
    left: 'lg:flex-1 flex items-center gap-1.5 text-2xl truncate',
    center: 'hidden lg:flex text-lg',
    right: 'flex items-center justify-end lg:flex-1 gap-2',
    logo: 'flex-shrink-0 font-bold flex items-end gap-1.5 break-keep',
    mobileButton: 'lg:hidden',
    slideoverBg: 'bg-background dark:bg-background',
    slideoverOverlayBg: 'bg-background/75 dark:bg-background/75',
    panelRoot: '',
    panelHeader: 'w-full h-[--header-height] inline-flex items-center justify-between border-b border-gray-200 dark:border-gray-800 text-2xl',
    panelBase: '',
    panelContent: 'max-w-full w-full h-full pt-[--header-height] m-auto text-xl items-center',
    panelLinks: 'text-2xl gap-y-3 -mt-[--header-height]',
    panelFooter: 'w-fit py-8 mx-auto text-2xl',
    socials: 'w-fit',
  },
  variants: {
    variant: {
      transparent: {
        root: 'border-0 bg-background/0 backdrop-blur-none',
      },
      faded: {
        root: 'border-0 bg-background/0 backdrop-blur-none bg-gradient-to-b from-background/75 to-transparent',
      },
    },
    sticky: {
      true: {
        root: 'sticky top-0 z-50 transition-all duration-300 ease-in-out',
      },
    },
    rtl: {
      true: {
        container: 'flex-row-reverse',
        left: 'flex-row-reverse',
        right: 'flex-row-reverse',
        panelHeader: 'flex-row-reverse',
        panelFooter: 'flex-row-reverse',
      },
    },
    hideSocials: {
      desktop: {
        socials: 'lg:hidden',
      },
      mobile: {
        socials: 'hidden lg:flex',
      },
      true: {
        socials: 'hidden',
      },
    },
  },
} satisfies Parameters<TV>[0]

const appConfig = _appConfig as AppConfig & { s94Ui: { header: Partial<typeof theme> } }

const header = tv({ extend: tv(theme), ...(appConfig.s94Ui.header || {}) })

export type HeaderVariants = VariantProps<typeof header>

export interface HeaderProps {
  hideCenter?: boolean
  hideLeft?: boolean
  hideMobileButton?: boolean
  hidePanel?: boolean
  hideRight?: boolean
  hideOnScroll?: boolean
  hideSocials?: 'desktop' | 'mobile' | boolean
  hide?: {
    center?: boolean
    left?: boolean
    mobileButton?: boolean
    panel?: boolean
    right?: boolean
    onScroll?: boolean
    socials?: 'desktop' | 'mobile' | boolean
  }
  links?: Links
  linksVariant?: LinksVariants['variant']
  mobileButtonIcon?: {
    close?: string
    open?: string
  }
  mobileButtonColor?: string
  rtl?: boolean
  socials?: Links
  socialsVariant?: LinksVariants['variant']
  sticky?: boolean
  title?: string
  titleTo?: string
  variant?: HeaderVariants['variant']
  class?: any
  ui?: Partial<typeof header.slots>
}

export interface HeaderSlots {
  center: any
  left: any
  logo: any
  mobileButton(props: { open?: boolean }): any
  panel: any
  panelContent: any
  panelHeader(props: { open?: boolean }): any
  panelFooter: any
  right: any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<HeaderProps>(), {
  sticky: false,
  hideOnScroll: false,
  mobileButtonIcon: () => ({
    close: 'i-ph-x',
    open: 'i-ph-list',
  }),
  mobileButtonColor: 'gray',
  rtl: false,
  titleTo: '/',
})
const slots = defineSlots<HeaderSlots>()

const ui = computed(() => tv({ extend: header, slots: props.ui })({
  hideSocials: props.hideSocials || props.hide?.socials,
  rtl: props.rtl,
  sticky: props.sticky,
  variant: props.variant,
}))

const route = useRoute()
const isMenuOpen = ref(false)

const navPosition = ref<string>('0')
const { isScrolling, directions } = useScroll(window)
const { top: toTop, bottom: toBottom } = toRefs(directions)

watch([() => route.fullPath, toTop, toBottom], ([newRoute], [prevRoute]) => {
  if (newRoute !== prevRoute) {
    isMenuOpen.value = false
  }
  if (props.hide?.onScroll || props.hideOnScroll) {
    if (isScrolling.value && toTop.value) {
      navPosition.value = '0'
    }
    else if (isScrolling.value && toBottom.value) {
      navPosition.value = 'calc((var(--header-height) + 2px) * -1)'
    }
  }
})
</script>

<template>
  <header :class="ui.root({ class: props.class })" :style="{ top: navPosition }">
    <UContainer :class="ui.container()">
      <div v-if="!hide?.left || !hideLeft || title || slots.left || slots.logo" :class="ui.left()">
        <slot name="left">
          <NuxtLink :class="ui.logo()" :to="titleTo" aria-label="Logo">
            <slot name="logo">
              {{ title }}
            </slot>
          </NuxtLink>
        </slot>
      </div>

      <div v-if="links || slots.center && (!hide?.center || !hideCenter)" :class="ui.center()">
        <slot name="center">
          <SLinks :links="links" :variant="linksVariant" />
        </slot>
      </div>

      <div v-if="!hide?.right || !hideRight || socials || slots.right || slots.mobileButton" :class="ui.right()">
        <slot name="right">
          <SLinks
            v-if="socials && hide?.socials !== true"
            :class="ui.socials()"
            :links="socials"
            :variant="socialsVariant"
          />
        </slot>

        <slot name="mobileButton" :open="isMenuOpen">
          <UButton
            v-if="!hide?.panel || !hidePanel || !hide?.mobileButton || !hideMobileButton"
            :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Mobile Menu`"
            :class="ui.mobileButton()"
            :icon="isMenuOpen ? mobileButtonIcon.close : mobileButtonIcon.open"
            :color="mobileButtonColor"
            size="xl"
            variant="ghost"
            @click="isMenuOpen = !isMenuOpen"
          />
        </slot>
      </div>
    </UContainer>

    <USlideover
      v-if="!hide?.panel || !hidePanel"
      v-model="isMenuOpen"
      :side="rtl ? 'left' : 'right'"
      :ui="{
        background: ui.slideoverBg(),
        overlay: {
          background: ui.slideoverOverlayBg(),
        },
      }"
    >
      <slot name="panel">
        <SCard
          :ui="{
            root: ui.panelRoot(),
            header: ui.panelHeader(),
            base: ui.panelBase(),
            footer: ui.panelFooter(),
          }"
        >
          <template #header>
            <slot name="panelHeader" :open="isMenuOpen">
              <NuxtLink :class="ui.logo()" :to="titleTo" aria-label="Logo">
                <slot name="logo">
                  {{ title }}
                </slot>
              </NuxtLink>
              <UButton
                :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Mobile Menu`"
                :class="ui.mobileButton()"
                :icon="isMenuOpen ? mobileButtonIcon.close : mobileButtonIcon.open"
                :color="mobileButtonColor"
                size="xl"
                variant="ghost"
                @click="isMenuOpen = !isMenuOpen"
              />
            </slot>
          </template>
          <div v-if="links || slots.panelContent" :class="ui.panelContent()">
            <slot name="panelContent">
              <SLinks :links="links" :variant="linksVariant" vertical />
            </slot>
          </div>
          <template #footer>
            <slot name="panelFooter">
              <SLinks
                v-if="socials && (hide?.socials !== true || hideSocials !== true)"
                :class="ui.socials()"
                :links="socials"
                :variant="socialsVariant"
              />
            </slot>
          </template>
        </SCard>
      </slot>
    </USlideover>
  </header>
</template>
