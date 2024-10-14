import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-qrcode',
  ],

  alias: { '#s94-ui': resolve('./') },

  components: [
    { path: '#s94-ui/components', pathPrefix: false, prefix: 'S' },
  ],

  css: [
    '#s94-ui/assets/css/main.css',
  ],

  qrcode: {
    options: {
      whiteColor: 'var(--ui-bg)',
      blackColor: 'var(--ui-text-highlighted)',
    },
  },
})
