<template>
  <nav :class="ui.wrapper" v-bind="attrs">
    <ULink
      v-for="(link, index) in filteredLinks"
      :key="index"
      :to="link.to"
      :target="link.target"
      :class="ui.base"
      :style="{
        paddingLeft: vertical ? (verticalPadding ?? '1rem') : '0',
      }"
      :active-class="ui.active"
      :inactive-class="ui.inactive"
    >
      <slot name="label">
        <span class="max-w-full inline-flex gap-x-2">
          <UIcon
            v-if="link.icon"
            :name="link.icon"
            :class="ui.iconClass"
          />
          <span v-if="link.label" :class="ui.label">
            {{ link.label }}
          </span>
          <sup v-if="link.label && link.target === '_blank'" class="h-fit top-0 -ml-1.5">
            <UIcon
              name="i-ph-arrow-up-right-light"
              :class="ui.externalLink"
            />
          </sup>
        </span>
      </slot>
    </ULink>
  </nav>
</template>

<script setup lang="ts">
import { mergeConfig } from '#s94-ui/utils'
import type {
  Link,
  LinksUi,
  LinksConfig,
  LinksVariant,
  Strategy
} from '#s94-ui/types'

const { s94Ui, ui: uiConfig } = useAppConfig()

const linksDefaultConfigs: LinksConfig = {
  default: {
    variant: 'line'
  },

  variant: {
    horizontal: {
      default: {
        wrapper: 'not-prose flex items-center gap-x-3',
        base: 'relative inline-flex gap-x-2 font-light hover:underline underline-offset-[10%] decoration-from-font',
        label: '',
        iconClass: 'place-self-center',
        active: 'underline underline-offset-[10%]',
        inactive: '',
        externalLink: 'aliased text-gray-400 dark:text-gray-500'
      },
      line: {
        active: 'text-primary',
        inactive: 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
      }
    },
    vertical: {
      default: {
        wrapper: 'not-prose max-w-[inherit] flex flex-col items-start gap-y-2 font-light',
        base: 'w-full group relative',
        label: 'max-w-full truncate',
        iconClass: 'place-self-center',
        active: '',
        inactive: '',
        externalLink: 'aliased text-gray-400 dark:text-gray-500'
      },
      line: {
        wrapper: 'border-s border-gray-200 dark:border-gray-800',
        base: '-ml-[1px] mr-[1px] border-s',
        active: 'text-primary border-current',
        inactive: 'border-transparent hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
      }
    }
  }
}

const props = defineProps<{
  links: Ref<Link[]> | Link[]
  ui?: Partial<LinksUi> & { strategy?: Strategy }
  class?: any
  variant?: LinksVariant
  vertical?: boolean
  verticalPadding?: string
}>()

const configDefaults = mergeConfig<typeof linksDefaultConfigs>(uiConfig.strategy, s94Ui.links, linksDefaultConfigs)

const direction = props.vertical ? 'vertical' : 'horizontal'
const variant = props.variant ?? configDefaults.default.variant

const config = mergeConfig<LinksUi>('merge', configDefaults.variant[direction][variant], configDefaults.variant[direction].default)

const { ui, attrs } = useUI('s94.links', toRef(props, 'ui'), config, toRef(props, 'class'))

const filteredLinks = computed(() => unref(props.links).filter(link => link.if ? link.if() : true))
</script>
