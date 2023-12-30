import { createResolver } from 'nuxt/kit'
import colors from 'tailwindcss/colors'
import typography from '@tailwindcss/typography'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: { '#s94-ui': resolve('./') },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
  ],
  components: [
    { path: '#s94-ui/components', prefix: 'S', pathPrefix: false },
  ],
  devtools: { enabled: true },

  googleFonts: {
    download: true,
    families: {
      'DM+Sans': {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      },
      'DM+Mono': {
        wght: [300, 400, 500],
        ital: [300, 400, 500],
      },
    },
  },

  tailwindcss: {
    config: {
      content: [],
      plugins: [typography],
      theme: {
        extend: {
          colors: {
            background: 'rgb(var(--ui-s94-background) / <alpha-value>)',
            foreground: 'rgb(var(--ui-s94-foreground) / <alpha-value>)',
            success: colors.green,
            info: colors.sky,
            alert: colors.yellow,
            warning: colors.red,
          },
          fontFamily: {
            sans: ['DM Sans', 'DM Mono'],
          },
        },
      },
    },
  },
  ui: {
    safelistColors: ['success', 'info', 'alert', 'warning'],
    icons: ['ph', 'simple-icons'],
  },

  css: [
    '#s94-ui/assets/css/main.css',
  ],

  $development: {
    typescript: {
      shim: false,
    },
  },
})
