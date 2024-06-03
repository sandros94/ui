// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
})
  .append({
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/max-attributes-per-line': ['warn', {
        singleline: {
          max: 5,
        },
        multiline: {
          max: 1,
        },
      }],

      // Project specific overrides
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/ban-types': 'off',
    },
  })
