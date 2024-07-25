export default defineNuxtConfig({
  extends: ['./main'],

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

  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['DM Sans'],
            mono: ['Fira Code'],
          },
        },
      },
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

  compatibilityDate: '2024-07-25',
})
