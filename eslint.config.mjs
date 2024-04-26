// @ts-check
import withNuxt from './playground/.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
)
