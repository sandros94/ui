import { createResolver } from 'nuxt/kit'
import colors from 'tailwindcss/colors'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: { '#s94-ui': resolve('./') },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxt/ui'
  ],
  components: [
    { path: '#s94-ui/components', prefix: 'S', pathPrefix: false },
  ],
  devtools: { enabled: true },

  googleFonts: {
    families: {
      'DM+Sans': true,
      'DM+Mono': true
    }
  },

  tailwindcss: {
    config: {
      content: [],
      plugins: [require('@tailwindcss/typography')],
      theme: {
        extend: {
          colors: {
            background: 'rgb(var(--ui-s94-background) / <alpha-value>)',
            foreground: 'rgb(var(--ui-s94-foreground) / <alpha-value>)',
            success: colors.green,
            info: colors.sky,
            alert: colors.yellow,
            warning: colors.red
          },
          fontFamily: {
            sans: ['DM Sans', 'DM Mono']
          }
        }
      }
    }
  },

  css: [
    '~/assets/css/main.css'
  ],
  
  $development: {
    typescript: {
      shim: false
    }
  }
})
