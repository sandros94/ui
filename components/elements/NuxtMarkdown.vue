<template>
  <NuxtMarkdown />
</template>

<script setup lang="ts">
import type { Options as MarkdownItOptions } from 'markdown-it'

// import installed plugins
import shiki from '@shikijs/markdown-it'
import mdcPlugin from 'markdown-it-mdc'

// You could either use global components or manually import them here
// import { Alert } from '#components'

const props = defineProps({
  forceHtml: {
    default: false,
    required: false,
    type: Boolean,
  },
  options: {
    default: () => ({}),
    required: false,
    type: Object as PropType<MarkdownItOptions>,
  },
  source: {
    required: true,
    type: String,
  },
})

const { rendered: NuxtMarkdown } = useNuxtMarkdown(props.source, {
  // components: {
  //   Alert,
  forceHtml: props.forceHtml,
  // },
  plugins: [
    mdcPlugin,
    await shiki({
      themes: {
        dark: 'vitesse-dark',
        light: 'vitesse-light',
      },
    }),
  ],
})
</script>
