export default defineNuxtConfig({
  extends: [
    // ['./main', { install: true }],
    './main-v3',
  ],

  modules: [
    '@nuxt/eslint',
    'nuxt-qrcode',
  ],

  eslint: {
    config: {
      stylistic: true,
      tooling: true,
    },
  },

  css: [
    '#s94-ui/index.css',
  ],

  fonts: {
    families: [
      {
        name: 'DM Sans',
        provider: 'google',
        weights: [
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          900,
          1000,
        ],
      },
      {
        name: 'Fira Code',
        provider: 'google',
        weights: [
          300,
          400,
          500,
          600,
          700,
        ],
      },
    ],
  },

  devtools: {
    enabled: true,
    componentInspector: false,
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

  compatibilityDate: '2024-07-25',
})
