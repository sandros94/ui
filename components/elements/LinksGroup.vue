<template>
  <nav :class="ui.wrapper" v-bind="attrs" v-if="links">
    <div :class="ui.group.base" :key="index" v-for="(linksGroup, index) of links">
      <slot :index="index" :links-group="linksGroup">
        <div :class="ui.group.name" v-if="$slots.groupName">
          <slot :group-name="linksGroup.label" name="group-name">
            {{ linksGroup.label }}
          </slot>
        </div>
        <slot :links="linksGroup.links" name="links">
          <SLinks
            :class="ui.group.links?.wrapper"
            :links="linksGroup.links"
            :ui="ui.group.links"
            v-bind="{
              variant: ui.group.links?.variant,
              vertical: ui.group.links?.vertical,
            }"
          />
        </slot>
      </slot>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type {
  LinksGroup,
  LinksGroupConfig,
  LinksGroupUi,
  LinksGroupVariant,
  Strategy,
} from '#s94-ui/types'

import SLinks from './Links.vue'

const { s94Ui: { linksGroup: sLinksGroup }, ui: { strategy } } = useAppConfig()

const configDefault: LinksGroupConfig = {
  default: {
    variant: 'default',
  },
  variant: {
    centered: {
      group: {
        base: 'p-2 w-fit text-center',
        links: {
          base: 'mx-auto',
          label: {
            base: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
          },
          variant: 'default',
          vertical: true,
        },
        name: 'pb-2 text-lg uppercase',
      },
      wrapper: 'flex flex-wrap gap-4',
    },
    default: {
      group: {
        base: 'p-2 w-fit',
        links: {
          base: '',
          label: {
            base: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
          },
          variant: 'default',
          vertical: true,
        },
        name: 'pb-2 text-lg uppercase',
      },
      wrapper: 'flex flex-wrap gap-4',
    },
    rtl: {
      group: {
        base: 'p-2 w-fit text-right',
        links: {
          base: 'ml-auto',
          label: {
            base: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
          },
          variant: 'default',
          vertical: true,
        },
        name: 'pb-2 text-lg uppercase',
      },
      wrapper: 'flex flex-wrap gap-4',
    },
  },
}

const config = mergeConfig<LinksGroupConfig>(strategy, sLinksGroup, configDefault)

const props = defineProps({
  class: {
    default: undefined,
    type: String as PropType<any>,
  },
  links: {
    default: undefined,
    type: Array as PropType<LinksGroup[]>,
  },
  ui: {
    default: () => ({}),
    type: Object as PropType<Partial<LinksGroupUi> & { strategy?: Strategy }>,
  },
  variant: {
    default: undefined,
    type: String as PropType<LinksGroupVariant>,
  },
})

const variant = props.variant ?? config.default.variant

const { attrs, ui } = useUI('s94.links-group', toRef(props, 'ui'), config.variant[variant], toRef(props, 'class'))
</script>

<style>

</style>
