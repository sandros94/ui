import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', "@nuxt/fonts", "@nuxt/eslint"],
  alias: { '#s94-ui': resolve('./') },
  components: [
    { path: '#s94-ui/components', pathPrefix: false, prefix: 'S' },
  ],
  css: [
    '#s94-ui/assets/css/main.css',
  ],

  devtools: { enabled: true },

  ui: {
    icons: {},
    safelistColors: ['success', 'info', 'alert', 'warning'],
  },
})
