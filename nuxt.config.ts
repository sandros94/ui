import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $development: {
    typescript: {
      shim: false,
    },
  },
  alias: { '#s94-ui': resolve('./') },
  components: [
    { path: '#s94-ui/components', pathPrefix: false, prefix: 'S' },
  ],
  css: [
    '#s94-ui/assets/css/main.css',
  ],

  devtools: { enabled: true },

  googleFonts: {
    download: true,
    families: {
      'DM+Mono': {
        ital: [300, 400, 500],
        wght: [300, 400, 500],
      },
      'DM+Sans': {
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      },
    },
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
    'nuxt-markdown-render',
  ],

  nuxtMarkdownRender: {
    options: {
      html: true,
      linkify: true,
      xhtmlOut: true,
    },
    vueRuntimeCompiler: true,
  },

  ui: {
    icons: ['ph', 'simple-icons'],
    safelistColors: ['success', 'info', 'alert', 'warning'],
  },
})
