<template>
  <nav :class="ui.wrapper" v-bind="attrs">
    <div :class="ui.group.base" :key="index" v-for="(linksGroup, index) of links">
      <div :class="ui.group.name" v-if="linksGroup.name || $slots.groupName">
        <slot name="group-name" :group-name="linksGroup.name">
          {{ linksGroup.name }}
        </slot>
      </div>
      <slot name="links" :links="linksGroup.links">
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
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type {
  LinksGroup,
  LinksGroupConfig,
  LinksGroupUi,
  LinksGroupVariant,
  Strategy
} from '#s94-ui/types'

import SLinks from './Links.vue'

const { s94Ui: { linksGroup: sLinksGroup }, ui: { strategy } } = useAppConfig()

const configDefault: LinksGroupConfig = {
  default: {
    variant: 'default',
  },
  variant: {
    default: {
      group: {
        base: 'p-2 w-fit',
        links: {
          variant: 'default',
          vertical: true,
          base: ''
        },
        name: 'pb-1 text-lg uppercase',
      },
      wrapper: 'flex flex-wrap gap-4',
    },
    centered: {
      group: {
        base: 'p-2 w-fit text-center',
        links: {
          variant: 'default',
          vertical: true,
          base: 'mx-auto'
        },
        name: 'pb-1 text-lg uppercase',
      },
      wrapper: 'flex flex-wrap gap-4',
    },
    rtl: {
      group: {
        base: 'p-2 w-fit text-right',
        links: {
          variant: 'default',
          vertical: true,
          base: 'ml-auto'
        },
        name: 'pb-1 text-lg uppercase',
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
    required: true,
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
