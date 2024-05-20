export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxt/eslint'],

  eslint: {
    config: {
      stylistic: true,
    },
  },

  devtools: {
    timeline: {
      enabled: true,
      functions: {
        include: [
          // track all functions from tailwind-variants
          entry => entry.from === 'tailwind-variants',
          // track all functions from @vueuse/core
          entry => entry.from === '@vueuse/core',
        ],
        exclude: [
          'useRouter',
          'useState',
        ],
      },
    },
  },
})
