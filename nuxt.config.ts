import { createResolver } from 'nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: { '#s94-ui': resolve('./') },
  modules: ['@nuxt/ui'],
  components: [
    { path: '#s94-ui/components', prefix: 'S', pathPrefix: false },
  ],
  devtools: { enabled: true }
})
