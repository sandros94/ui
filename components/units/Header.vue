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
          <SLinks v-if="socials" :class="disableSocials ? 'hidden lg:flex' : undefined" :links="socials" :ui="ui.socials" />
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

    <USlideover v-model="isMenuOpen" :ui="ui.slideover">
      <slot name="panel">
        <SCard :ui="ui.slideover.card">
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
            <div :class="ui.slideover.card.center">
              <SLinks v-if="links" :links="links" :class="ui.slideover.card.links" :ui="ui.links" vertical />
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
import type { Link, HeaderConfig as Config } from '#s94-ui/types'

const config: Config = {
  wrapper: 'w-full bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 text-xl',
  container: 'flex items-center justify-between gap-3 h-[--header-height]',
  left: 'lg:flex-1 flex items-center gap-1.5 text-2xl',
  center: 'hidden lg:flex text-lg',
  right: 'flex items-center justify-end lg:flex-1 gap-2',
  logo: 'flex-shrink-0 font-bold text-gray-900 dark:text-white flex items-end gap-1.5 break-keep',
  panel: {
    wrapper: 'fixed inset-0 z-50 overflow-y-auto bg-background lg:hidden',
    header: 'px-4 sm:px-6',
    body: 'px-4 sm:px-6 pt-3 pb-6'
  },
  button: {
    base: 'lg:hidden',
    icon: {
      open: 'i-ph-list',
      close: 'i-ph-x'
    }
  },
  slideover: {
    overlay: {
      background: 'bg-gray-50/75 dark:bg-gray-950/75'
    },
    card: {
      header: 'w-full h-[--header-height] inline-flex items-center justify-between border-b border-gray-200 dark:border-gray-800 text-2xl',
      center: 'w-fit h-full pt-[--header-height] m-auto text-xl flex items-center',
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
  ui?: Partial<Config>
  class?: any,
  disableSocials?: boolean
}>(), {
  to: '/',
  title: 'S94-UI',
  links: () => [],
  socials: () => [],
  ui: () => ({}),
  class: undefined
})

const route = useRoute()
const { ui, attrs } = useUI('s94.header', toRef(props, 'ui'), config, toRef(props, 'class'), true)

const isMenuOpen = ref(false)

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
</script>
