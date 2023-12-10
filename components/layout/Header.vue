<template>
  <header :class="ui.wrapper" v-bind="attrs">
    <UContainer :class="ui.container">
      <div :class="ui.left">
        <slot name="left">
          <NuxtLink :to="to" aria-label="Logo" :class="ui.logo">
            <slot name="logo">
              {{ title }}
            </slot>
          </NuxtLink>
        </slot>
      </div>

      <slot name="center">
        <SLinks v-if="links" :links="links" :class="ui.center" :ui="ui.links" />
      </slot>

      <div :class="ui.right">
        <slot name="right">
          <SLinks v-if="socials && disableSocials !== true" :class="disableSocials ? disableSocialsMap[disableSocials] : undefined" :links="socials" :ui="ui.socials" />
        </slot>

        <slot name="panel-button" :open="isMenuOpen">
          <UButton
            v-if="links.length || $slots.panel"
            color="gray"
            variant="ghost"
            size="xl"
            :class="ui.button.base"
            :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Menu`"
            :icon="isMenuOpen ? ui.button.icon.close : ui.button.icon.open"
            @click="isMenuOpen = !isMenuOpen"
          />
        </slot>
      </div>
    </UContainer>

    <USlideover v-model="isMenuOpen" :ui="ui.panel.slideover">
      <slot name="panel">
        <SCard :ui="ui.panel.card">
          <template #header>
            <slot name="left">
              <NuxtLink :to="to" aria-label="Logo" :class="ui.logo">
                <slot name="logo">
                  {{ title }}
                </slot>
              </NuxtLink>
            </slot>
            <UButton
              v-if="links.length || $slots.panel"
              color="gray"
              variant="ghost"
              size="xl"
              :class="ui.button.base"
              :aria-label="`${isMenuOpen ? 'Close' : 'Open'} Menu`"
              :icon="isMenuOpen ? ui.button.icon.close : ui.button.icon.open"
              @click="isMenuOpen = !isMenuOpen"
            />
          </template>
          <slot name="panel-center">
            <div :class="ui.panel.card.center">
              <SLinks v-if="links" :links="links" :class="ui.panel.card.links" :ui="ui.links" vertical />
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
import { twMerge } from 'tailwind-merge'
import type { Link, HeaderConfig as Config } from '#s94-ui/types'

const config: Config = {
  wrapper: 'w-full bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px text-xl',
  container: 'flex items-center justify-between gap-3 h-[--header-height] max-w-[90rem]',
  left: 'lg:flex-1 flex items-center gap-1.5 text-2xl',
  center: 'hidden lg:flex text-lg',
  right: 'flex items-center justify-end lg:flex-1 gap-2',
  logo: 'flex-shrink-0 font-bold text-gray-900 dark:text-white flex items-end gap-1.5 break-keep',
  button: {
    base: 'lg:hidden',
    icon: {
      open: 'i-ph-list',
      close: 'i-ph-x'
    }
  },
  panel: {
    slideover: {
      overlay: {
        background: 'bg-gray-50/75 dark:bg-gray-950/75'
      }
    },
    card: {
      header: 'w-full h-[--header-height] inline-flex items-center justify-between border-b border-gray-200 dark:border-gray-800 text-2xl',
      center: 'max-w-full w-fit h-full pt-[--header-height] m-auto text-xl flex items-center',
      links: 'text-2xl gap-y-3 -mt-[--header-height]',
      footer: 'py-8 mx-auto text-2xl'
    }
  }
}

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  to?: string
  title?: string
  links?: Link[]
  socials?: Link[]
  disableSocials?: 'mobile' | 'desktop' | boolean
  sticky?: boolean
  ui?: Partial<Config>
  class?: any
}>(), {
  to: '/',
  title: 'S94-UI',
  links: () => [],
  socials: () => [],
  disableSocials: undefined,
  ui: () => ({}),
  class: undefined
})

const disableSocialsMap = {
  mobile: 'hidden lg:flex',
  desktop: 'lg:hidden'
}

config.wrapper = twMerge(config.wrapper, props.sticky ? 'sticky top-0 z-50' : '')

const route = useRoute()
const { ui, attrs } = useUI('s94.header', toRef(props, 'ui'), config, toRef(props, 'class'), true)

const isMenuOpen = ref(false)

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
</script>
